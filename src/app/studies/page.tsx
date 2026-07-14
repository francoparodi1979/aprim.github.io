import type { Metadata, Route } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { getAllStudies } from "@/lib/content/studies";
import { subpageStyles } from "../_styles/subpages";

export const metadata: Metadata = {
  title: "Active studies",
  description:
    "Active and recruiting clinical trials at Veritas Clinical Research — COPD, asthma, and idiopathic pulmonary fibrosis.",
};

export const revalidate = 600;

const CONDITION_LABEL: Record<string, string> = {
  copd: "COPD",
  asthma: "Asthma",
  ipf: "IPF",
  other: "Pulmonary",
};

const STATUS_LABEL: Record<string, string> = {
  recruiting: "Enrolling",
  enrolling_by_invitation: "Invitation",
  active: "Active",
  completed: "Completed",
  paused: "Paused",
};

export default async function StudiesPage() {
  const studies = await getAllStudies();
  const enrolling = studies.filter((s) => s.status === "recruiting").length;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: subpageStyles }} />
      <div className="sub-shell">
        <SiteNav active="studies" />

        <header className="ph">
          <div>
            <div className="crumb">Home / Studies</div>
            <h1>
              Active <em>trials.</em>
            </h1>
          </div>
          <div className="right">
            <p>
              Every trial below is actively screening or enrolling. Tap any row
              for the full protocol summary, eligibility criteria, and a
              two-minute pre-screen to see if you qualify.
            </p>
            <div className="ks">
              <div>
                <b>{enrolling}</b>
                <span>Enrolling</span>
              </div>
              <div>
                <b>{studies.length}</b>
                <span>In catalog</span>
              </div>
              <div>
                <b>40+</b>
                <span>Completed</span>
              </div>
            </div>
          </div>
        </header>

        <section className="sub-section">
          <div className="sh">
            <div className="num">§ 01 / Now enrolling</div>
            <h2>
              {enrolling === 1 ? "One trial" : `${enrolling} trials`},{" "}
              <em>three therapeutic areas.</em>
            </h2>
            <div className="tag">Updated · live</div>
          </div>

          <div className="trial-table">
            <div className="tt-head">
              <div>ID</div>
              <div>Study</div>
              <div>Indication</div>
              <div>Phase</div>
              <div>Ages</div>
              <div>Status</div>
              <div>&nbsp;</div>
            </div>
            {studies.map((s) => {
              const id = s.slug.split("-").slice(-1)[0]?.toUpperCase() ?? s.slug;
              const titleParts = s.title.split("—");
              const lead = titleParts[0]?.trim() ?? s.title;
              const tail = titleParts.slice(1).join("—").trim();
              const ages = s.ageRange ? `${s.ageRange[0]}–${s.ageRange[1]}` : "Adult";
              return (
                <Link
                  key={s.slug}
                  href={`/studies/${s.slug}` as Route}
                  className="tt-row"
                >
                  <div className="id">VRT-{id}</div>
                  <div>
                    <h4>
                      {lead}
                      {tail ? (
                        <>
                          {" "}— <em>{tail}</em>
                        </>
                      ) : null}
                    </h4>
                    <div className="desc">{s.shortSummary}</div>
                  </div>
                  <div className="tt-mid">{CONDITION_LABEL[s.condition] ?? s.condition}</div>
                  <div className="tt-mid">
                    <span className="ph">{s.phase ?? "Phase"}</span>
                  </div>
                  <div className="mono tt-mid" style={{ fontSize: 12 }}>
                    {ages}
                  </div>
                  <div className="tt-mid">
                    <span
                      className={
                        s.status === "recruiting" ? "status open" : "status"
                      }
                    >
                      {STATUS_LABEL[s.status] ?? s.status}
                    </span>
                  </div>
                  <div className="arr tt-mid">See →</div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="sub-section bone">
          <div className="sh">
            <div className="num">§ 02 / What to expect</div>
            <h2>
              The <em>first</em> conversation.
            </h2>
            <div className="tag">10–15 minutes · phone</div>
          </div>
          <div className="about-intro">
            <div>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--color-ink-2)" }}>
                If a study feels like a possible fit, the next step is a short
                phone call with one of our coordinators. You describe your
                breathing and current medications. We describe the study.
                Either side can decide it&apos;s not the right time, no
                pressure either way.
              </p>
              <p style={{ marginTop: 18, fontSize: 18, lineHeight: 1.7, color: "var(--color-ink-2)" }}>
                If we both want to keep going, we&apos;ll schedule a screening
                visit at our Bloomfield Hills office — full pulmonary function
                testing, chart review with Dr. Parodi, and a plain-English
                walkthrough of the protocol. You only sign consent after
                you&apos;ve had time to ask everything you want.
              </p>
            </div>
            <div>
              <Link className="cta-pill" href="/patients">
                <span>See the full participant journey →</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="sub-cta">
          <div className="sub-cta-blob" aria-hidden />
          <div className="eyebrow" style={{ position: "relative", zIndex: 2, marginBottom: 28 }}>
            ◈ Don&apos;t see one that fits?
          </div>
          <h2>
            We&apos;ll keep your info <em>on file.</em>
          </h2>
          <p>
            Studies open and close month to month. With your permission, we
            keep your details ready and reach out the moment something matches.
          </p>
          <div className="cta-row">
            <Link className="cta-pill" href="/contact">
              <span>Get on the list →</span>
            </Link>
            <Link className="cta-ghost" href="/about">
              About Veritas Clinical Research
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
