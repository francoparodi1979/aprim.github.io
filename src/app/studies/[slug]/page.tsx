import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { getAllStudies, getStudyBySlug } from "@/lib/content/studies";

export const revalidate = 600;
export const dynamicParams = false;

export async function generateStaticParams() {
  const studies = await getAllStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getStudyBySlug(slug);
  if (!study) return { title: "Study not found" };
  return {
    title: study.title,
    description: study.shortSummary,
  };
}

export default async function StudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getStudyBySlug(slug);
  if (!study) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.2em] text-clay-300">
        {study.condition} · {study.status.replace(/_/g, " ")}
      </p>
      <h1 className="font-display mt-4 text-4xl text-teal-700">{study.title}</h1>
      <p className="mt-4 text-teal-700/80">{study.shortSummary}</p>

      <article className="prose prose-teal mt-12 text-teal-700">
        <MDXRemote source={study.body} />
      </article>
    </main>
  );
}
