import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import { HeroParticles } from "@/components/HeroParticles";
import { LungAnatomy } from "@/components/LungAnatomy";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { homePageStyles } from "./_styles/home";

export default function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: homePageStyles }} />
      <SiteNav active="home" />

      {/* ========== HERO ========== */}
      <section className="hero">
        <div className="hero-bg" aria-hidden>
          <div className="orb a" />
          <div className="orb b" />
          <div className="orb c" />
          <HeroParticles />
        </div>

        <div className="hero-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 32 }}>
              ◈ Madison Heights, MI · 2023
            </div>
            <h1 className="kinetic">
              <span className="line">
                <span className="word">Where</span>
              </span>
              <span className="line">
                <span className="word">
                  <em>Science</em>
                </span>
              </span>
              <span className="line">
                <span className="word">Meets <em>Hope.</em></span>
              </span>
            </h1>
            <p className="lede">
              Veritas Clinical Research exists for one reason: to get it
              right. We conduct clinical trials with an uncompromising dedication to
              honest science and ethical principles — because the future of medicine
              depends on research the world can trust. No shortcuts. No spin. Just
              rigorous, transparent, patient-centered research that moves medicine
              forward.
            </p>
            <div className="hero-actions">
              <Link className="cta-pill" href="/studies">
                <span>Find a study →</span>
              </Link>
              <Link className="cta-ghost" href="/about">
                Meet Dr. Parodi
              </Link>
            </div>
          </div>

          {/* REALISTIC BREATHING LUNGS */}
          <div className="hero-visual">
            <div className="lung-stage">
              <div className="lung-aura" aria-hidden />
              <div className="lung-diaphragm" aria-hidden />

              <div className="lung-rise">
                <div className="lung-expand">
                  <LungAnatomy />
                </div>
              </div>

              <div className="breath-mist" aria-hidden>
                <span style={{ ["--x" as string]: "18%", ["--d" as string]: "6.5s", ["--del" as string]: "0s" }} />
                <span style={{ ["--x" as string]: "32%", ["--d" as string]: "7.5s", ["--del" as string]: "1.2s" }} />
                <span style={{ ["--x" as string]: "48%", ["--d" as string]: "6s", ["--del" as string]: "2.4s" }} />
                <span style={{ ["--x" as string]: "62%", ["--d" as string]: "8s", ["--del" as string]: "0.8s" }} />
                <span style={{ ["--x" as string]: "78%", ["--d" as string]: "7s", ["--del" as string]: "3.5s" }} />
              </div>

              <svg className="lung-ecg" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden>
                <path
                  d="M 0,30 L 80,30 L 96,30 L 104,12 L 116,48 L 124,18 L 132,30 L 200,30 L 216,30 L 224,12 L 236,48 L 244,18 L 252,30 L 320,30 L 336,30 L 344,12 L 356,48 L 364,18 L 372,30 L 400,30"
                  fill="none"
                  stroke="#d07a45"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="hero-readout">
          <div className="readout-item">
            <span className="k">Years of service</span>
            <span className="v">
              <em>since 2002</em>
            </span>
          </div>
        </div>
      </section>

      {/* ========== TICKER ========== */}
      <div className="ticker" aria-hidden>
        <div className="ticker-track">
          {[...Array(2)].map((_, n) => (
            <span key={n} style={{ display: "contents" }}>
              <span className="ticker-item">
                <span className="mono">◈</span>Internal Medicine
              </span>
              <span className="ticker-item">
                <span className="mono">◈</span>Pulmonary Diseases
              </span>
              <span className="ticker-item">
                <span className="mono">◈</span>Sleep Medicine
              </span>
              <span className="ticker-item">
                <span className="mono">◈</span>Cardiology
              </span>
              <span className="ticker-item">
                <span className="mono">◈</span>Neurology
              </span>
              <span className="ticker-item">
                <span className="mono">◈</span>Oncology
              </span>
              <span className="ticker-item">
                <span className="mono">◈</span>ENT
              </span>
              <span className="ticker-item">
                <span className="mono">◈</span>Endocrinology
              </span>
              <span className="ticker-item">
                <span className="mono">◈</span>Nephrology
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ========== METRICS ========== */}
      <section className="metrics">
        <div className="metrics-head">
          <h2>
            More than <em>20 years</em> in breaths and evidence.
          </h2>
        </div>
      </section>

      {/* ========== WAVEFORM ========== */}
      <section className="waveform">
        <div className="waveform-inner">
          <div>
            <div className="eyebrow" style={{ color: "var(--color-clay-soft)", marginBottom: 24 }}>
              ◈ Our method
            </div>
            <h2>
              A rhythm of <em>rigor</em> — measured across five years of follow-up.
            </h2>
            <p>
              Every protocol we run anchors on the same three disciplines: deep
              phenotyping at baseline, standardized spirometry on every visit,
              and longitudinal follow-up that lasts years after the last dose.
              The chart shows mean FEV₁ across a Veritas Clinical Research cohort vs. standard-of-care comparators.
            </p>
            <Link className="link" href="/about">
              See our published methodology →
            </Link>
          </div>
          <div className="wave-stage">
            <svg className="wave-svg" viewBox="0 0 600 340" preserveAspectRatio="none">
              <defs>
                <linearGradient id="wgrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#d07a45" stopOpacity="0" />
                  <stop offset=".1" stopColor="#d07a45" stopOpacity="1" />
                  <stop offset=".9" stopColor="#d07a45" stopOpacity="1" />
                  <stop offset="1" stopColor="#d07a45" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g stroke="rgba(242,237,227,0.08)" strokeWidth="1">
                <line x1="0" y1="85" x2="600" y2="85" />
                <line x1="0" y1="170" x2="600" y2="170" />
                <line x1="0" y1="255" x2="600" y2="255" />
                <line x1="150" y1="0" x2="150" y2="340" />
                <line x1="300" y1="0" x2="300" y2="340" />
                <line x1="450" y1="0" x2="450" y2="340" />
              </g>
              <path
                className="wave-path ghost"
                d="M0,200 Q 40,185 80,192 T 160,210 T 240,225 T 320,240 T 400,255 T 480,270 T 600,285"
              />
              <g>
                <path
                  className="wave-path"
                  stroke="url(#wgrad)"
                  strokeWidth="2"
                  d="M0,200 Q 40,150 80,160 T 160,145 T 240,130 T 320,120 T 400,110 T 480,100 T 600,90"
                >
                  <animate
                    attributeName="d"
                    dur="6s"
                    repeatCount="indefinite"
                    values="M0,200 Q 40,150 80,160 T 160,145 T 240,130 T 320,120 T 400,110 T 480,100 T 600,90;
                            M0,200 Q 40,165 80,145 T 160,155 T 240,120 T 320,135 T 400,100 T 480,115 T 600,95;
                            M0,200 Q 40,150 80,160 T 160,145 T 240,130 T 320,120 T 400,110 T 480,100 T 600,90"
                  />
                </path>
              </g>
              <g>
                <circle r="5" fill="#d07a45">
                  <animateMotion
                    dur="8s"
                    repeatCount="indefinite"
                    path="M0,200 Q 40,150 80,160 T 160,145 T 240,130 T 320,120 T 400,110 T 480,100 T 600,90"
                  />
                </circle>
                <circle r="12" fill="none" stroke="#d07a45" strokeWidth="1" opacity=".4">
                  <animateMotion
                    dur="8s"
                    repeatCount="indefinite"
                    path="M0,200 Q 40,150 80,160 T 160,145 T 240,130 T 320,120 T 400,110 T 480,100 T 600,90"
                  />
                  <animate attributeName="r" dur="1.6s" repeatCount="indefinite" values="8;18;8" />
                  <animate attributeName="opacity" dur="1.6s" repeatCount="indefinite" values=".5;0;.5" />
                </circle>
              </g>
            </svg>
            <div className="wave-labels" aria-hidden>
              <span className="wave-label" style={{ top: 8, left: 12 }}>
                FEV₁ predicted %
              </span>
              <span className="wave-label" style={{ top: 88, right: 12 }}>
                80
              </span>
              <span className="wave-label" style={{ top: 173, right: 12 }}>
                65
              </span>
              <span className="wave-label" style={{ top: 258, right: 12 }}>
                50
              </span>
              <span className="wave-label" style={{ bottom: 8, left: 12 }}>
                T₀
              </span>
              <span className="wave-label" style={{ bottom: 8, left: "25%" }}>
                Year 1
              </span>
              <span className="wave-label" style={{ bottom: 8, left: "50%" }}>
                Year 3
              </span>
              <span className="wave-label" style={{ bottom: 8, right: 80 }}>
                Year 5
              </span>
            </div>
          </div>
        </div>
        <div className="wave-strip">
          <span>
            N · <b>412 volunteers</b>
          </span>
          <span>
            Mean Δ FEV₁ · <b>+0.14 L</b>
          </span>
          <span>
            Exacerbations · <b>−42%</b>
          </span>
          <span>
            Published · <b>AJRCCM · 2024</b>
          </span>
          <span>
            P-value · <b>&lt; 0.001</b>
          </span>
        </div>
      </section>

      {/* ========== STUDIES ========== */}
      <section className="home-studies">
        <div className="studies-head">
          <h2>
            Three studies are <em>enrolling now</em>.
          </h2>
          <div className="meta">
            Every study below accepts direct volunteer referrals. Screening is
            free; travel is reimbursed; your own pulmonologist stays in the loop.
          </div>
        </div>
        <div className="studies-grid">
          <StudyCard
            chipText="Phase 3 · Enrolling"
            title="AURORA-1"
            titleEm="moderate-to-severe COPD"
            body="Once-daily inhaled therapy testing whether a titrated dose slows FEV₁ decline in adults over 24 weeks."
            sparkPath="M0,40 C40,35 60,20 100,22 C140,24 170,12 200,10"
            sparkArea="M0,60 L0,40 C40,35 60,20 100,22 C140,24 170,12 200,10 L200,60 Z"
            sparkX={100}
            sparkY={22}
            duration="24 weeks"
            visits="7 total"
            comp="Up to $1,200"
            ages="40–80 yrs"
            href="/studies/copd-aurora-001"
          />
          <StudyCard
            chipText="Phase 2 · Enrolling"
            title="HELIX-3"
            titleEm="IPF"
            body="Novel anti-fibrotic, oral, once-daily. Primary endpoint: change in FVC at 26 weeks. Small cohort, close follow-up."
            sparkPath="M0,12 Q50,22 100,18 T 200,28"
            sparkArea="M0,60 L0,12 Q50,22 100,18 T 200,28 L200,60 Z"
            sparkX={100}
            sparkY={18}
            duration="26 weeks"
            visits="9 total"
            comp="Up to $1,800"
            ages="50–85 yrs"
            href="/studies/ipf-helix-003"
          />
          <StudyCard
            chipText="Phase 3 · Enrolling"
            title="MERIDIAN-2"
            titleEm="severe asthma"
            body="Biologic against placebo + standard ICS for type-2 high asthma. Focus: exacerbation rate, oral-steroid dependence, quality of life."
            sparkPath="M0,45 Q40,15 80,25 T 160,10 T 200,18"
            sparkArea="M0,60 L0,45 Q40,15 80,25 T 160,10 T 200,18 L200,60 Z"
            sparkX={80}
            sparkY={25}
            duration="52 weeks"
            visits="12 total"
            comp="Up to $2,400"
            ages="18–75 yrs"
            href="/studies/asthma-meridian-002"
          />
        </div>
      </section>

      {/* ========== DOCTOR ========== */}
      <section className="doctor">
        <div className="doctor-grid">
          <div className="doc-portrait">
            <Image
              src="/dr-parodi.jpg"
              alt="Dr. Franco Parodi, Principal Investigator at Veritas Clinical Research"
              fill
              sizes="(max-width: 1440px) 40vw, 580px"
              className="doc-portrait-img"
              priority={false}
            />
            <div className="ring" />
            <div className="ring b" />
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 28 }}>
              ◈ Principal investigator
            </div>
            <h2>
              Dr. Franco <em>Parodi</em>
            </h2>
            <div className="credentials">
              <div>
                <b>Education</b>Universidad de San Martin de Porres, Lima, Peru · Henry Ford Hospital, Detroit — Internal Medicine Residency &amp; Fellowship in Pulmonary Diseases and Critical Care Medicine
              </div>
              <div>
                <b>Memberships</b>Fellow of the American Academy of Chest Physicians · Member of the Association of Clinical Research Professionals
              </div>
              <div>
                <b>Appointments</b>Associate Professor of Medicine, Michigan State University College of Osteopathic Medicine · Associate Program Director, Fellowship in Pulmonary &amp; Critical Care Medicine, Henry Ford Warren Hospital, MI
              </div>
            </div>
            <q>
              At Veritas Clinical Research, our work begins and ends with people. We are a clinical research site dedicated to advancing the future of medicine through carefully conducted clinical trials — driven not by shortcuts, but by a genuine commitment to truth and ethical responsibility. We believe every participant in our studies deserves transparency, respect, and care, and that every sponsor deserves research they can trust. By holding ourselves to the highest standards of scientific and moral integrity, we help bring tomorrow&apos;s most promising therapies safely and confidently into the world.
            </q>
            <div className="sig">
              <div>
                <div className="name">Franco Parodi MD</div>
                <div className="role">Founder and PI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== JOURNEY ========== */}
      <section className="journey">
        <div className="journey-head">
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            ◈ What being a volunteer feels like
          </div>
          <h2>
            Four careful <em>steps</em>.
          </h2>
          <p>
            We don&apos;t believe in mystery. Here is exactly what happens from
            the first phone call to the last follow-up visit — with the option
            to stop at any step, no questions asked.
          </p>
        </div>
        <div className="timeline">
          <div className="node">
            <div className="dot">i</div>
            <h4>Conversation, not commitment</h4>
            <p>
              A 20-minute call with a Veritas Clinical Research coordinator. We describe the trial,
              you describe your story, and we check whether there&apos;s a
              mutual fit.
            </p>
            <div className="dur">Day 01</div>
          </div>
          <div className="node">
            <div className="dot">ii</div>
            <h4>Screening visit</h4>
            <p>
              Spirometry, bloodwork, medication review. You leave with a full
              copy of your pulmonary workup — whether you enroll or not.
            </p>
            <div className="dur">Week 01</div>
          </div>
          <div className="node">
            <div className="dot">iii</div>
            <h4>Treatment phase</h4>
            <p>
              Regular visits on a predictable cadence. Our coordinator is one
              text away, every weekday.
            </p>
            <div className="dur">Weeks 02–48</div>
          </div>
          <div className="node">
            <div className="dot">iv</div>
            <h4>Long-term follow-up</h4>
            <p>
              Optional annual visits up to five years, so the science — and
              your health — keeps moving forward together.
            </p>
            <div className="dur">Years 1–5</div>
          </div>
        </div>
      </section>

      {/* ========== QUOTE BAND ========== */}
      <section className="quote-band">
        <q>
          I came in thinking I was <em>donating my lungs to science</em>. I left
          with a team who called me on Christmas Eve to check how I was breathing.
        </q>
        <div className="who">
          <div className="avatar" />
          <div className="name">
            <strong>Marta R., 68</strong>
            <span>Volunteer · IPF cohort, 2022–2024</span>
          </div>
        </div>
      </section>

      {/* ========== BIG CTA ========== */}
      <section className="bigcta">
        <div className="bigcta-blob" aria-hidden />
        <div className="eyebrow" style={{ position: "relative", zIndex: 2, marginBottom: 32 }}>
          ◈ Start here
        </div>
        <h2>
          Let&apos;s <em>breathe</em> forward.
        </h2>
        <p>
          Whether you&apos;re a pulmonologist with a patient to refer, a
          sponsor evaluating sites, or a volunteer considering a trial — a
          single conversation starts the whole thing.
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
    </>
  );
}

function StudyCard({
  chipText,
  title,
  titleEm,
  body,
  sparkPath,
  sparkArea,
  sparkX,
  sparkY,
  duration,
  visits,
  comp,
  ages,
  href,
}: {
  chipText: string;
  title: string;
  titleEm: string;
  body: string;
  sparkPath: string;
  sparkArea: string;
  sparkX: number;
  sparkY: number;
  duration: string;
  visits: string;
  comp: string;
  ages: string;
  href: string;
}) {
  return (
    <Link href={href as Route} className="study">
      <div className="chip">
        <span className="live" />
        {chipText}
      </div>
      <h3>
        {title} — <em>{titleEm}</em>
      </h3>
      <div className="viz">
        <svg viewBox="0 0 200 60">
          <path fill="none" stroke="#d07a45" strokeWidth="1.2" strokeDasharray="4 3" d={sparkPath} />
          <path fill="rgba(208,122,69,0.1)" d={sparkArea} />
          <circle cx={sparkX} cy={sparkY} r="3" fill="#d07a45">
            <animate attributeName="r" values="2;5;2" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <p>{body}</p>
      <div className="meta">
        <span>
          Duration<b>{duration}</b>
        </span>
        <span>
          Visits<b>{visits}</b>
        </span>
        <span>
          Compensation<b>{comp}</b>
        </span>
        <span>
          Eligibility<b>{ages}</b>
        </span>
      </div>
    </Link>
  );
}
