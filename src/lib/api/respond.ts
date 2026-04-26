import { NextResponse } from "next/server";
import type { ZodIssue } from "zod";

export type ApiSuccess<T> = { ok: true; data: T };
export type ApiError = { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json<ApiSuccess<T>>({ ok: true, data }, init);
}

export function fail(error: string, status = 400, fieldErrors?: Record<string, string[]>) {
  return NextResponse.json<ApiError>(
    { ok: false, error, ...(fieldErrors ? { fieldErrors } : {}) },
    { status }
  );
}

export function fromZodIssues(issues: ZodIssue[]) {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of issues) {
    const path = issue.path.join(".") || "_";
    (fieldErrors[path] ??= []).push(issue.message);
  }
  return fail("Validation failed", 422, fieldErrors);
}

export function tooManyRequests(retryAfterSeconds: number) {
  return NextResponse.json<ApiError>(
    { ok: false, error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    }
  );
}
