#!/usr/bin/env node
/**
 * Sync trial statuses on the site with ClinicalTrials.gov.
 *
 * Reads every `nct:` entry in src/lib/content/portfolio.ts, looks up its
 * overall status in the ClinicalTrials.gov v2 API, and updates the site's
 * `status:` when the registry shows the trial has moved FORWARD:
 *
 *   recruiting/upcoming → active → completed | terminated
 *
 * It never sets a trial to "recruiting" (or back to an earlier stage): whether
 * Veritas is enrolling is a site decision, and the global registry often still
 * says "Recruiting" after a site's enrollment has closed. Those mismatches are
 * reported but left alone.
 *
 * Study detail pages (src/content/studies/*.mdx) with a matching `nctId` get
 * their frontmatter `status:` updated too.
 *
 * Output: writes a Markdown summary to $SYNC_SUMMARY (default
 * trial-sync-summary.md) and prints `changed=true|false` for GitHub Actions.
 *
 * Testing without network: set SYNC_MOCK to a JSON file mapping
 * NCT IDs to registry statuses, e.g. {"NCT06208306": "COMPLETED"}.
 */
import { readFileSync, writeFileSync, readdirSync, appendFileSync } from "node:fs";
import { join } from "node:path";

const PORTFOLIO = "src/lib/content/portfolio.ts";
const STUDIES_DIR = "src/content/studies";
const SUMMARY = process.env.SYNC_SUMMARY || "trial-sync-summary.md";

// Registry status → site status. Statuses not listed (NOT_YET_RECRUITING,
// SUSPENDED, UNKNOWN, WITHDRAWN…) are reported but never applied.
const FROM_REGISTRY = {
  RECRUITING: "recruiting",
  ENROLLING_BY_INVITATION: "active",
  ACTIVE_NOT_RECRUITING: "active",
  COMPLETED: "completed",
  TERMINATED: "terminated",
};
const RANK = { recruiting: 0, upcoming: 1, active: 2, completed: 3, terminated: 3 };
const LABEL = {
  recruiting: "Recruiting",
  upcoming: "Not yet recruiting",
  active: "Active, not recruiting",
  completed: "Completed",
  terminated: "Terminated",
};
// MDX study pages use a narrower status vocabulary.
const MDX_STATUS = { active: "active", completed: "completed", terminated: "completed" };

const mock = process.env.SYNC_MOCK ? JSON.parse(readFileSync(process.env.SYNC_MOCK, "utf8")) : null;

async function registryStatus(nct) {
  if (mock) return mock[nct] ?? null;
  const url = `https://clinicaltrials.gov/api/v2/studies/${nct}?fields=protocolSection.statusModule.overallStatus`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { accept: "application/json" } });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json?.protocolSection?.statusModule?.overallStatus ?? null;
    } catch (err) {
      if (attempt === 3) throw new Error(`${nct}: ${err.message}`);
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
}

let src = readFileSync(PORTFOLIO, "utf8");
// Each trial object: capture its nct, title and status line.
const entryRe = /\{\s*\n\s*nct: "(NCT\d{8})",[\s\S]*?\n\s*title: "([^"]*)",[\s\S]*?\n(\s*)status: "(\w+)",/g;
const entries = [...src.matchAll(entryRe)].map((m) => ({
  nct: m[1],
  title: m[2],
  indent: m[3],
  status: m[4],
  block: m[0],
}));
if (entries.length === 0) {
  console.error("No trials with NCT numbers found — portfolio format changed?");
  process.exit(1);
}

const changes = [];
const notes = [];
for (const e of entries) {
  const reg = await registryStatus(e.nct);
  if (!reg) {
    notes.push(`- ${e.nct} (${e.title}): not found on ClinicalTrials.gov — left as ${LABEL[e.status]}.`);
    continue;
  }
  const next = FROM_REGISTRY[reg];
  if (!next) {
    notes.push(`- ${e.nct} (${e.title}): registry says ${reg} — left as ${LABEL[e.status]}.`);
    continue;
  }
  if (next === e.status) continue;
  const forward = RANK[next] > RANK[e.status] || (RANK[next] === 3 && RANK[e.status] === 3);
  if (!forward) {
    notes.push(
      `- ${e.nct} (${e.title}): registry says ${LABEL[next]}, site says ${LABEL[e.status]} — left unchanged (only moves forward automatically).`,
    );
    continue;
  }
  const updated = e.block.replace(
    new RegExp(`\\n${e.indent}status: "${e.status}",$`),
    `\n${e.indent}status: "${next}",`,
  );
  src = src.replace(e.block, updated);
  changes.push({ ...e, from: e.status, to: next });
}

if (changes.length) {
  writeFileSync(PORTFOLIO, src);
  // Keep study detail pages in step.
  for (const file of readdirSync(STUDIES_DIR).filter((f) => f.endsWith(".mdx"))) {
    const path = join(STUDIES_DIR, file);
    let mdx = readFileSync(path, "utf8");
    for (const c of changes) {
      if (!mdx.includes(`nctId: "${c.nct}"`) || !MDX_STATUS[c.to]) continue;
      mdx = mdx.replace(/^status: \w+$/m, `status: ${MDX_STATUS[c.to]}`);
    }
    writeFileSync(path, mdx);
  }
}

const lines = [];
if (changes.length) {
  lines.push("Trial statuses on veritasclinical.org were updated to match ClinicalTrials.gov:", "");
  for (const c of changes) {
    lines.push(`- **${c.title}** ([${c.nct}](https://clinicaltrials.gov/study/${c.nct})): ${LABEL[c.from]} → **${LABEL[c.to]}**`);
  }
}
if (notes.length) {
  if (lines.length) lines.push("");
  lines.push("For your review (not changed automatically):", "", ...notes);
}
writeFileSync(SUMMARY, lines.join("\n") + "\n");
console.log(lines.join("\n") || "All trial statuses match ClinicalTrials.gov.");
if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changes.length > 0}\nnotes=${notes.length > 0}\n`);
}
