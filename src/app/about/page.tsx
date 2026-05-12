import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { subpageStyles } from "../_styles/subpages";

export const metadata: Metadata = {
  title: "About",
  description:
    "About VERITAS — the Advanced Pulmonary Research Institute of Michigan, a small, physician-led pulmonary research institute led by Dr. Franco Parodi.",
};

const TEAM = [
  {
    cap: "DR. PARODI",
    role: "Founder · PI",
    name: "Franco Parodi, MD",
    blurb:
      "Triple board-certified in Pulmonary, Critical Care, and Internal Medicine. 40+ trials as PI.",
  },
  {
    cap: "DR. HART",
    role: "Sub-Investigator",
    name: "Meera Hart, DO",
    blurb:
      "Pulmonology. Sub-investigator on severe asthma and IPF programs. Fluent in Spanish.",
  },
  {
    cap: "R. WILKES",
    role: "Research Director",
    name: "Rebecca Wilkes, RN, CCRC",
    blurb:
      "Oversees protocol execution, regulatory submissions, and participant safety.",
  },
  {
    cap: "T. LIN",
    role: "Lead Coordinator",
    name: "Tomás Lin, CCRC",
    blurb:
      "Your first and most frequent point of contact. Runs study visits day-to-day.",
  },
  {
    cap: "J. OBI",
    role: "PFT Specialist",
    name: "Joelle Obi, RPFT",
    blurb:
      "Certified pulmonary function technologist. 12 years in respiratory research.",
  },
  {
    cap: "A. REY",
    role: "Patient Advocate",
    name: "Andrea Rey",
    blurb:
      "Helps participants navigate transportation, scheduling, and anything else we can fix.",
  },
  {
    cap: "M. SOTO",
    role: "Regulatory",
    name: "Mateo Soto",
    blurb:
      "IRB submissions, sponsor reporting, and everything the FDA needs in a tidy binder.",
  },
  {
    cap: "S. BRAND",
    role: "Operations",
    name: "Simone Brand",
    blurb:
      "Keeps the clinic running, scheduling sharp, and our coffee machine in working order.",
  },
] as const;

const HISTORY = [
  {
    year: "20",
    em: "19",
    note: "VERITAS founded in a single exam room. First COPD trial begins in November.",
  },
  {
    year: "20",
    em: "20",
    note: "Seven new trials activated. We learn to do home monitoring when visits become impossible.",
  },
  {
    year: "20",
    em: "21",
    note: "Dedicated 4,200 sq ft research suite opens in Bloomfield Hills. Dr. Hart joins as sub-I.",
  },
  {
    year: "20",
    em: "23",
    note: "500th participant enrolled. First IPF anti-fibrotic program completes Phase 2 readout.",
  },
  {
    year: "20",
    em: "26",
    note: "Three studies actively enrolling. Vaccine program expands. PMA partnership formalized.",
  },
] as const;

const CAPABILITIES = [
  {
    label: "Pulmonary testing",
    title: "Full PFT laboratory",
    desc: "Spirometry · lung volumes · DLCO · 6-minute walk · FeNO",
    have: "Calibrated daily, NBRC-certified technologist",
  },
  {
    label: "Imaging",
    title: "HRCT + chest radiography",
    desc: "Via partner imaging center · 1.2 mi from site",
    have: "Same-day scheduling, secure sponsor transfer",
  },
  {
    label: "Specimen",
    title: "IATA-certified specimen handling",
    desc: "Central lab processing · on-site -80°C freezer · courier chain",
    have: "Sponsor-qualified for oncology-grade chain of custody",
  },
  {
    label: "Systems",
    title: "EDC · CTMS · eSource-ready",
    desc: "Veeva · Medidata Rave · Oracle Siebel — compatible",
    have: "Part 11 compliant, typical activation 28 days",
  },
  {
    label: "Regulatory",
    title: "Full IRB submission infrastructure",
    desc: "Central + local IRB workflows · 1572/FDF on file",
    have: "Zero critical findings last 3 audits",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: subpageStyles }} />
      <div className="sub-shell">
        <SiteNav active="about" />

        <header className="ph">
          <div>
            <div className="crumb">Home / About</div>
            <h1>
              Pioneering the Future of Medicine, One <em>Trial</em> at a Time
            </h1>
          </div>
          <div className="right">
            <p>
              At Veritas Clinical Research Institute, we believe that the future
              of medicine is built on a foundation of truth. Our name — veritas,
              the Latin word for truth — reflects our unwavering commitment to
              honest, rigorous, and ethically grounded clinical research. We
              conduct Phase I–IV clinical trials across a broad spectrum of
              therapeutic areas, partnering with sponsors, physicians, and
              patients to advance treatments that genuinely improve human health.
              Every study we undertake is guided by scientific integrity,
              transparency, and the highest standards of patient safety. At
              Veritas, good science and good ethics are never in conflict — they
              are one and the same.
            </p>
            <div className="ks">
              <div>
                <b>2019</b>
                <span>Founded</span>
              </div>
              <div>
                <b>40+</b>
                <span>Trials as PI</span>
              </div>
              <div>
                <b>98%</b>
                <span>Phase 3 retention</span>
              </div>
            </div>
          </div>
        </header>

        <section className="sub-section">
          <div className="about-intro">
            <div className="left">
              <div className="eyebrow">§ Mission</div>
              <h2>
                Veritas Clinical Research Institute exists because somewhere along
                the way, medicine stopped asking the hard questions{" "}
                <em>honestly</em> — and we intend to change that.
              </h2>
            </div>
            <div>
              <p className="first">
                We exist because the future of medicine is only as strong as the
                research behind it. Clinical trials are the bridge between
                scientific discovery and real patient care — and that bridge must
                be built on truth. Veritas Clinical Research Institute was founded
                to ensure that bridge never crumbles. We conduct rigorous, ethical,
                and transparent clinical trials so that the treatments reaching
                patients tomorrow are ones the world can genuinely trust today.
              </p>
              <p>
                Clinical trial participants are the heartbeat of every study we
                run. We honor their contribution with radical transparency,
                genuine informed consent, and a level of care that goes well
                beyond protocol requirements.
              </p>
              <p>
                Veritas is different because we actually mean it — the honesty,
                the ethics, the commitment to truth. It&apos;s not a tagline.
                It&apos;s how we operate, every single day.
              </p>
            </div>
          </div>
        </section>

        <section className="sub-section bone">
          <div className="sh">
            <div className="num">§ 01 / Team</div>
            <h2>
              The <em>people</em> who answer the phone.
            </h2>
            <div className="tag">8 FTE · Bloomfield Hills, MI</div>
          </div>
          <div className="team-grid">
            {TEAM.map((m) => (
              <div className="member" key={m.name}>
                <div className="portrait" data-cap={m.cap} />
                <div className="role">{m.role}</div>
                <h4>{m.name}</h4>
                <p>{m.blurb}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sub-section">
          <div className="sh">
            <div className="num">§ 02 / History</div>
            <h2>
              Seven years, <em>five moments.</em>
            </h2>
            <div className="tag">Updated · 2026</div>
          </div>
          <div className="about-timeline">
            {HISTORY.map((h) => (
              <div className="yr" key={h.year + h.em}>
                <span className="n">
                  {h.year}
                  <em>{h.em}</em>
                </span>
                <p>{h.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sub-section bone">
          <div className="sh">
            <div className="num">§ 03 / Capabilities</div>
            <h2>
              What we have <em>on-site.</em>
            </h2>
            <div className="tag">4,200 sq ft · Bloomfield Hills</div>
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

        <section className="sub-cta">
          <div className="sub-cta-blob" aria-hidden />
          <div className="eyebrow" style={{ position: "relative", zIndex: 2, marginBottom: 28 }}>
            ◈ Work with us
          </div>
          <h2>
            Let&apos;s start a <em>conversation.</em>
          </h2>
          <p>
            Whether you&apos;re a volunteer, a sponsor, or a referring
            physician, the same number reaches a real person at VERITAS. No call
            tree, no triage queue.
          </p>
          <div className="cta-row">
            <Link className="cta-pill" href="/patients">
              <span>See if you qualify →</span>
            </Link>
            <Link className="cta-ghost" href="/contact">
              Talk to a coordinator
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
