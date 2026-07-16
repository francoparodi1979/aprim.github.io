import type { Metadata, Route } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { CAPABILITIES } from "@/lib/content/capabilities";
import { PORTFOLIO, STATUS_LABEL } from "@/lib/content/portfolio";
import { subpageStyles } from "../_styles/subpages";

export const metadata: Metadata = {
  title: "For sponsors",
  description:
    "Site qualification for sponsors and CROs — 13 trials as a PI site across asthma, COPD, IPF, and bronchiectasis. Phase II–IV. Madison Heights, Michigan.",
};

export default function SponsorsPage() {
  const recruiting = PORTFOLIO.filter((t) => t.status === "recruiting").length;
  const active = PORTFOLIO.filter((t) => t.status === "active").length;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: subpageStyles }} />
      <div className="sub-shell">
        <SiteNav active="sponsors" />

        <header className="ph">
          <div>
            <div className="crumb">Home / Sponsors</div>
            <h1>
              Your protocol,
              <br /> run <em>right.</em>
            </h1>
          </div>
          <div className="right">
            <p>
              Veritas Clinical Research is a physician-led pulmonary site in
              Madison Heights, Michigan — a single PI, a dedicated coordinator
              team, and a portfolio that spans asthma, COPD, IPF, and
              bronchiectasis from Phase II to Phase IV.
            </p>
            <div className="ks">
              <div>
                <b>13</b>
                <span>Trials as PI site</span>
              </div>
              <div>
                <b>4</b>
                <span>Therapeutic areas</span>
              </div>
              <div>
                <b>II–IV</b>
                <span>Phase experience</span>
              </div>
            </div>
          </div>
        </header>

        <section className="sub-section">
          <div className="sh">
            <div className="num">§ 01 / Track record</div>
            <h2>
              Every trial. <em>On the record.</em>
            </h2>
            <div className="tag">
              {recruiting} recruiting · {active} active · verifiable on
              ClinicalTrials.gov
            </div>
          </div>
          <div className="sp-table">
            <div className="sp-head">
              <div>NCT</div>
              <div>Study</div>
              <div>Phase / Indication</div>
              <div>Status</div>
            </div>
            {PORTFOLIO.map((t) => {
              const inner = (
                <>
                  <div className="id">{t.nct}</div>
                  <h4>{t.title}</h4>
                  <div className="mid">
                    {t.phase} · {t.condition}
                  </div>
                  <div className="st" data-status={t.status}>
                    <span className="dot" />
                    {STATUS_LABEL[t.status]}
                  </div>
                </>
              );
              return t.href ? (
                <Link key={t.nct} href={t.href as Route} className="sp-row">
                  {inner}
                </Link>
              ) : (
                <a
                  key={t.nct}
                  href={`https://clinicaltrials.gov/study/${t.nct}`}
                  className="sp-row"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              );
            })}
          </div>
        </section>

        <section className="sub-section bone">
          <div className="sh">
            <div className="num">§ 02 / Capabilities</div>
            <h2>
              Built for <em>pulmonary</em> protocols.
            </h2>
            <div className="tag">4,200 sq ft · Madison Heights, MI</div>
          </div>
          <div className="cap-table">
            {CAPABILITIES.map((c) => (
              <div className="cap-row" key={c.label}>
                <div className="lbl">{c.label}</div>
                <div>
                  <h5>{c.title}</h5>
                  <p>{c.desc}</p>
                </div>
                <div className="have">{c.have}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="sub-section ink">
          <div className="sh">
            <div className="num">§ 03 / Working with us</div>
            <h2>
              What sponsors <em>get.</em>
            </h2>
            <div className="tag">PI-led · GCP · FDA-inspected</div>
          </div>
          <div className="safety-grid">
            <div className="safety-card">
              <div className="n">◈ Feasibility</div>
              <h4>The PI on every feasibility call</h4>
              <p>
                Dr. Parodi reviews every protocol personally — enrollment
                projections come from the physician who will actually screen
                the patients, not from a business development deck.
              </p>
            </div>
            <div className="safety-card">
              <div className="n">◈ Coordination</div>
              <h4>One coordinator, start to finish</h4>
              <p>
                A single named coordinator owns your study — monitoring
                visits, queries, and IRB traffic move through one person who
                knows the protocol cold.
              </p>
            </div>
            <div className="safety-card">
              <div className="n">◈ Transparency</div>
              <h4>Metrics you can audit</h4>
              <p>
                Screening, enrollment, and retention numbers reported as they
                are — the same radical transparency we promise participants
                applies to sponsors.
              </p>
            </div>
          </div>
        </section>

        <section className="sub-cta">
          <div className="sub-cta-blob" aria-hidden />
          <div
            className="eyebrow"
            style={{ position: "relative", zIndex: 2, marginBottom: 28 }}
          >
            ◈ Site qualification
          </div>
          <h2>
            One request gets you <em>everything.</em>
          </h2>
          <p>
            Regulatory packet, capability statement, and metrics dashboard —
            request all three through the contact form, or call us at
            (586) 210-0330.
          </p>
          <div className="cta-row">
            <Link className="cta-pill" href="/contact">
              <span>Request the packet →</span>
            </Link>
            <Link className="cta-ghost" href="/about">
              Meet the founder
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
