import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { STUDY_STATUS_LABEL, getAllStudies, getStudyBySlug } from "@/lib/content/studies";
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
  const upcoming = study.status === "upcoming";
  const closed = study.status === "completed" || study.status === "terminated";

  // schema.org MedicalStudyStatus values.
  const jsonLdStatus = recruiting
    ? "Recruiting"
    : upcoming
      ? "NotYetRecruiting"
      : study.status === "completed"
        ? "Completed"
        : study.status === "terminated"
          ? "Terminated"
          : study.status === "paused"
            ? "Suspended"
            : "ActiveNotRecruiting";

  // Structured data so search engines understand this page describes a
  // clinical study at our Madison Heights site.
  const studyJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalStudy",
    name: study.title,
    description: study.shortSummary,
    status: jsonLdStatus,
    ...(study.nctId ? { identifier: study.nctId } : {}),
    ...(study.sponsor ? { sponsor: { "@type": "Organization", name: study.sponsor } } : {}),
    healthCondition: { "@type": "MedicalCondition", name: study.condition.toUpperCase() },
    studyLocation: {
      "@type": "AdministrativeArea",
      name: "Madison Heights, Michigan, US",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(studyJsonLd) }}
      />
      <style dangerouslySetInnerHTML={{ __html: subpageStyles }} />
      <div className="sub-shell">
        <SiteNav active="studies" />

        <header className="ph">
          <div>
            <div className="crumb">
              <Link href="/#studies">Home / Studies</Link> /{" "}
              {study.condition.toUpperCase()}
            </div>
            {/* Official protocol titles run long — .study-title renders well
                below the usual 116px display size (and shrinks on mobile). */}
            <h1 className="study-title">{study.title}</h1>
          </div>
          <div className="right">
            <p>{study.shortSummary}</p>
            <div className="ks">
              <div>
                <b>{study.phase ?? "—"}</b>
                <span>Phase</span>
              </div>
              <div>
                <b>{STUDY_STATUS_LABEL[study.status]}</b>
                <span>Status</span>
              </div>
              <div>
                <b>
                  {study.nctId ? (
                    <a
                      href={`https://clinicaltrials.gov/study/${study.nctId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {study.nctId} ↗
                    </a>
                  ) : (
                    "—"
                  )}
                </b>
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
            {recruiting
              ? "◈ This study is enrolling now"
              : upcoming
                ? "◈ Enrollment opening soon"
                : "◈ Interested in future studies?"}
          </div>
          <h2>
            {recruiting ? (
              <>
                Think you might <em>qualify?</em>
              </>
            ) : upcoming ? (
              <>
                Want to hear <em>first?</em>
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
              : upcoming
                ? "This study hasn't started enrolling at our site yet. Leave your details and a coordinator will reach out once it opens."
                : closed
                  ? "This study has ended at our site, but new trials open month to month. Leave your details and we'll reach out when something matches."
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
