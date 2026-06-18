import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { subpageStyles } from "../_styles/subpages";

export const metadata: Metadata = {
  title: "For patients",
  description:
    "What it actually feels like to volunteer for a clinical trial at Veritas Clinical Research — every step from first call to closeout, plus the questions we hear every week.",
};

const STEPS = [
  {
    big: "i",
    t: "Day 1 · Call",
    title: "A short, no-pressure conversation.",
    body: "10–15 minutes with a coordinator. You describe your breathing, current meds, and history. We flag anything that might fit — and we say so plainly if nothing does.",
  },
  {
    big: "ii",
    t: "Week 1–2 · Screening",
    title: "A 90-minute clinic visit.",
    body: "Full pulmonary function testing on-site, a chart review with Dr. Parodi, and a plain-English walkthrough of the protocol. You sign consent only when ready.",
  },
  {
    big: "iii",
    t: "Months 1–12 · Study",
    title: "Scheduled visits, covered costs.",
    body: "Typically monthly. Medication, labs, and imaging are covered by the sponsor. Compensation per protocol. You can withdraw at any point, for any reason.",
  },
  {
    big: "iv",
    t: "Month 12+ · Closeout",
    title: "A warm handoff, not a drop-off.",
    body: "Final safety visit, written summary of what the study learned, and — where eligible — a path to open-label access to the therapy that was tested.",
  },
] as const;

const SAFETY = [
  {
    n: "01 · Independence",
    title: "An independent review board watches over every study.",
    body: "No trial at Veritas Clinical Research runs without ongoing oversight from an IRB that has no financial stake in the outcome. If they pause a study, we pause it the same day.",
  },
  {
    n: "02 · Transparency",
    title: "Your data is yours, always.",
    body: "Lab results, imaging, pulmonary function scores — all of it. We send copies to your primary doctor and your pulmonologist on request. No black box.",
  },
  {
    n: "03 · Exit",
    title: "You can leave any study, any day.",
    body: "No questions, no guilt, no administrative delay. A short form, and your standard care continues uninterrupted. We stay friendly either way.",
  },
] as const;

const FAQ = [
  {
    q: "Is it",
    qEm: "safe?",
    a: "Every study is reviewed by an independent IRB and continuously monitored. No first-in-human dosing happens at Veritas Clinical Research — only Phase 2+ programs with established safety data. You can withdraw at any time, for any reason.",
  },
  {
    q: "What's the",
    qEm: "cost?",
    a: "Zero. All study-related visits, medications, labs, and imaging are covered by the sponsor. Most studies also compensate participants for time and travel — typically $40–$150 per visit.",
  },
  {
    q: "Do I keep my",
    qEm: "own doctor?",
    a: "Yes. Veritas Clinical Research works alongside your primary care physician and pulmonologist. We send visit summaries to whoever you designate and coordinate directly on anything that changes.",
  },
  {
    q: "What if I",
    qEm: "don't qualify?",
    a: "We tell you clearly and quickly. With your permission, we keep your information on file for a future study that might be a better fit.",
  },
  {
    q: "Will I get the",
    qEm: "real drug?",
    a: "It depends on the study design. Some are placebo-controlled; others are open-label. We walk through exactly what each protocol involves during your screening visit — before you sign anything.",
  },
  {
    q: "Can I",
    qEm: "quit?",
    a: "Anytime. No questions, no penalty, no impact on your care. A short form, and your standard treatment resumes uninterrupted.",
  },
] as const;

export default function PatientsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: subpageStyles }} />
      <div className="sub-shell">
        <SiteNav active="patients" />

        <header className="ph">
          <div>
            <div className="crumb">Home / For Patients</div>
            <h1>
              Participation,
              <br /> <em>demystified.</em>
            </h1>
          </div>
          <div className="right">
            <p>
              Four steps, one clear timeline, no gotchas. Below is what
              actually happens from the first phone call to the day a study
              closes — plus the answers to the questions we get every week.
            </p>
            <div className="ks">
              <div>
                <b>Free</b>
                <span>To screen</span>
              </div>
              <div>
                <b>$40–$150</b>
                <span>Per visit, typical</span>
              </div>
              <div>
                <b>24h</b>
                <span>Coordinator reply</span>
              </div>
            </div>
          </div>
        </header>

        <section className="sub-section">
          <div className="sh">
            <div className="num">§ 01 / Steps</div>
            <h2>
              The <em>four</em> stages.
            </h2>
            <div className="tag">From inquiry to closeout</div>
          </div>
          <div className="steps-grid">
            {STEPS.map((s) => (
              <div className="step-card" key={s.big}>
                <div className="big">{s.big}</div>
                <div className="t">{s.t}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sub-section ink">
          <div className="sh">
            <div className="num" style={{ color: "var(--color-clay-soft)" }}>
              § 02 / Safety
            </div>
            <h2>
              Three <em>promises</em> on visit one.
            </h2>
            <div className="tag" style={{ color: "rgba(242,237,227,0.55)" }}>
              IRB-monitored · 2024 audit clean
            </div>
          </div>
          <div className="safety-grid">
            {SAFETY.map((s) => (
              <div className="safety-card" key={s.n}>
                <div className="n">{s.n}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sub-section bone" id="faq">
          <div className="sh">
            <div className="num">§ 03 / FAQ</div>
            <h2>
              Questions we hear <em>every week.</em>
            </h2>
            <div className="tag">Plain English · no acronyms</div>
          </div>
          <div className="faq-list">
            {FAQ.map((f, i) => (
              <div className="faq-row" key={f.qEm}>
                <div className="n">{String(i + 1).padStart(2, "0")}</div>
                <h4>
                  {f.q} <em>{f.qEm}</em>
                </h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sub-cta">
          <div className="sub-cta-blob" aria-hidden />
          <div className="eyebrow" style={{ position: "relative", zIndex: 2, marginBottom: 28 }}>
            ◈ Ready when you are
          </div>
          <h2>
            Start with a <em>conversation.</em>
          </h2>
          <p>
            Twenty minutes on the phone. No commitment, no consent forms, no
            paperwork. You leave knowing whether anything fits — and we leave
            knowing how to help.
          </p>
          <div className="cta-row">
            <Link className="cta-pill" href="/contact">
              <span>Call a coordinator →</span>
            </Link>
            <Link className="cta-ghost" href="/studies">
              See the studies
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
