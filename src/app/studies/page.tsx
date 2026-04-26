import type { Metadata } from "next";
import Link from "next/link";

import { getAllStudies } from "@/lib/content/studies";

export const metadata: Metadata = {
  title: "Active studies",
  description:
    "Active and recruiting clinical trials at APRIM — COPD, asthma, and idiopathic pulmonary fibrosis.",
};

export const revalidate = 600;

export default async function StudiesPage() {
  const studies = await getAllStudies();

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="font-display text-5xl text-teal-700">Studies</h1>
      <p className="mt-4 text-teal-700/80">
        {studies.length} {studies.length === 1 ? "study" : "studies"} in our catalog.
      </p>

      <ul className="mt-12 space-y-4">
        {studies.map((s) => (
          <li
            key={s.slug}
            className="border border-teal-100 bg-white/50 p-6 rounded-lg"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-xs uppercase tracking-[0.18em] text-clay-300">
                {s.condition}
              </span>
              <span className="text-xs text-teal-700/60">{s.status}</span>
            </div>
            <h2 className="font-display mt-2 text-2xl text-teal-700">
              <Link href={`/studies/${s.slug}`}>{s.title}</Link>
            </h2>
            <p className="mt-2 text-sm text-teal-700/80">{s.shortSummary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
