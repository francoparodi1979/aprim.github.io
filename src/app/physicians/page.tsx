import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { subpageStyles } from "../_styles/subpages";

export const metadata: Metadata = {
  title: "For physicians",
  description:
    "Refer a patient or partner with APRIM on pulmonary clinical research.",
};

export default function PhysiciansPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: subpageStyles }} />
      <div className="sub-shell">
        <SiteNav active="physicians" />

        <header className="ph">
          <div>
            <div className="crumb">Home / For Physicians</div>
            <h1>
              Refer with <em>confidence.</em>
            </h1>
          </div>
          <div className="right">
            <p>
              APRIM works alongside referring pulmonologists and primary care
              physicians, not around them. Every visit summary goes back to
              your office. Every protocol decision loops you in. Your patient
              stays your patient — we just open another door.
            </p>
            <div className="ks">
              <div>
                <b>24h</b>
                <span>Referral acknowledged</span>
              </div>
              <div>
                <b>Every visit</b>
                <span>Summary back to you</span>
              </div>
              <div>
                <b>0</b>
                <span>Cost to your practice</span>
              </div>
            </div>
          </div>
        </header>

        <section className="sub-section">
          <div className="sh">
            <div className="num">§ 01 / How referrals work</div>
            <h2>
              Three steps, <em>nothing</em> more.
            </h2>
            <div className="tag">Or call (586) 980-1296</div>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="big">i</div>
              <div className="t">You</div>
              <h4>Send a name &amp; number.</h4>
              <p>
                Email the patient&apos;s name, phone, and the indication.
                That&apos;s the entire referral. We&apos;ll close the loop on
                the rest.
              </p>
            </div>
            <div className="step-card">
              <div className="big">ii</div>
              <div className="t">We</div>
              <h4>Reach out within 24 hours.</h4>
              <p>
                A coordinator calls your patient, walks through what fits,
                schedules screening if it&apos;s the right move. You get an
                acknowledgement email same day.
              </p>
            </div>
            <div className="step-card">
              <div className="big">iii</div>
              <div className="t">Together</div>
              <h4>Stay in the loop.</h4>
              <p>
                Visit summaries, lab results, and protocol notes flow back to
                your EMR. If anything changes — meds, status, exit — you hear
                it from us first.
              </p>
            </div>
            <div className="step-card">
              <div className="big">iv</div>
              <div className="t">Always</div>
              <h4>Their care, uninterrupted.</h4>
              <p>
                We don&apos;t prescribe outside of protocol. We don&apos;t
                replace your care plan. The patient&apos;s relationship with
                you stays exactly where it was.
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
            ◈ Send a referral
          </div>
          <h2>
            One <em>email</em> is enough.
          </h2>
          <p>
            <a
              href="mailto:referrals@aprim.org"
              style={{ color: "var(--color-clay)" }}
            >
              referrals@aprim.org
            </a>{" "}
            — name, phone, indication. We take it from there.
          </p>
          <div className="cta-row">
            <Link className="cta-pill" href="/contact">
              <span>Talk to a coordinator →</span>
            </Link>
            <Link className="cta-ghost" href="/studies">
              See current studies
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
