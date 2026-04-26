import { env } from "@/lib/env";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

interface Limiter {
  check(key: string, opts: { limit: number; windowSec: number }): Promise<RateLimitResult>;
}

/* ------------------------------------------------------------------------ */
/* In-memory limiter — fine for a single dev process. NOT distributed.       */
/* ------------------------------------------------------------------------ */
class MemoryLimiter implements Limiter {
  private buckets = new Map<string, { count: number; resetAt: number }>();

  async check(key: string, { limit, windowSec }: { limit: number; windowSec: number }) {
    const now = Date.now();
    const bucket = this.buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      const resetAt = now + windowSec * 1000;
      this.buckets.set(key, { count: 1, resetAt });
      return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
    }
    if (bucket.count >= limit) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
      };
    }
    bucket.count += 1;
    return {
      allowed: true,
      remaining: limit - bucket.count,
      retryAfterSeconds: 0,
    };
  }
}

/* ------------------------------------------------------------------------ */
/* Upstash limiter — fixed window via INCR + EXPIRE through REST.            */
/* ------------------------------------------------------------------------ */
class UpstashLimiter implements Limiter {
  constructor(private url: string, private token: string) {}

  private async pipeline(commands: unknown[][]) {
    const res = await fetch(`${this.url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
    });
    if (!res.ok) throw new Error(`Upstash error: ${res.status}`);
    return (await res.json()) as Array<{ result: number }>;
  }

  async check(key: string, { limit, windowSec }: { limit: number; windowSec: number }) {
    const namespaced = `aprim:rl:${key}`;
    const [incr, ttl] = await this.pipeline([
      ["INCR", namespaced],
      ["EXPIRE", namespaced, windowSec, "NX"],
    ]);
    const count = incr.result;
    if (count > limit) {
      const ttlSec = ttl.result > 0 ? ttl.result : windowSec;
      return { allowed: false, remaining: 0, retryAfterSeconds: ttlSec };
    }
    return {
      allowed: true,
      remaining: Math.max(0, limit - count),
      retryAfterSeconds: 0,
    };
  }
}

const limiter: Limiter =
  env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
    ? new UpstashLimiter(env.UPSTASH_REDIS_REST_URL, env.UPSTASH_REDIS_REST_TOKEN)
    : new MemoryLimiter();

/**
 * Default form policy: 5 submissions per 10 minutes per (IP × form). Tight
 * enough to deter abuse, loose enough that a real user retrying after a typo
 * never hits it.
 */
export async function rateLimitForm(
  key: string,
  opts: { limit?: number; windowSec?: number } = {}
): Promise<RateLimitResult> {
  const limit = opts.limit ?? 5;
  const windowSec = opts.windowSec ?? 600;
  return limiter.check(key, { limit, windowSec });
}
