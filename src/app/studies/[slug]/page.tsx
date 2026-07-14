import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { getAllStudies, getStudyBySlug } from "@/lib/content/studies";
import { subpageStyles } from "../../_styles/subpages";

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

  const recruiting = study.status === "recruiting";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: subpageStyles }} />
      <div className="sub-shell">
        <SiteNav active="studies" />

        <header className="ph">
          <div>
            <div className="crumb">
              <Link href="/#studies">Home / Studies</Link> /{" "}
              {study.condition.toUpperCase()}
            </div>
            {/* Official protocol titles run long — render well below the
                usual 116px display size. */}
            <h1 style={{ fontSize: 38, lineHeight: 1.2, letterSpacing: "-0.01em" }}>
              {study.title}
            </h1>
          </div>
          <div className="right">
            <p>{study.shortSummary}</p>
            <div className="ks">
              <div>
                <b>{study.phase ?? "—"}</b>
                <span>Phase</span>
              </div>
              <div>
                <b>{study.status.replace(/_/g, " ")}</b>
                <span>Status</span>
              </div>
              <div>
                <b>{study.nctId ?? "—"}</b>
                <span>ClinicalTrials.gov</span>
              </div>
            </div>
          </div>
        </header>

        <section className="sub-section">
          <article className="study-article">
            <MDXRemote source={study.body} />
          </article>
        </section>

        <section className="sub-cta">
          <div className="sub-cta-blob" aria-hidden />
          <div
            className="eyebrow"
            style={{ position: "relative", zIndex: 2, marginBottom: 28 }}
          >
            {recruiting ? "◈ This study is enrolling now" : "◈ Interested in future studies?"}
          </div>
          <h2>
            {recruiting ? (
              <>
                Think you might <em>qualify?</em>
              </>
            ) : (
              <>
                Get on <em>the list.</em>
              </>
            )}
          </h2>
          <p>
            {recruiting
              ? "A coordinator can tell you in one short phone call — or send us your details and we'll call you."
              : "This study isn't enrolling, but new trials open month to month. Leave your details and we'll reach out when something matches."}
          </p>
          <div className="cta-row">
            <Link className="cta-pill" href="/contact">
              <span>Contact a coordinator →</span>
            </Link>
            <Link className="cta-ghost" href="/#studies">
              All studies
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
