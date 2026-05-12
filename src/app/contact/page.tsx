import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { subpageStyles } from "../_styles/subpages";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the VERITAS research team in Bloomfield Hills, Michigan.",
};

export default function ContactPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: subpageStyles }} />
      <div className="sub-shell">
        <SiteNav active="contact" />

        <header className="ph">
          <div>
            <div className="crumb">Home / Contact</div>
            <h1>
              One <em>conversation</em>
              <br /> starts it all.
            </h1>
          </div>
          <div className="right">
            <p>
              The phone number below goes to a real person on our coordinator
              team — no triage, no call tree. We answer weekdays 9 a.m. to 5
              p.m. Eastern, and reply to email within one business day.
            </p>
            <div className="ks">
              <div>
                <b>(586)</b>
                <span>980-1296</span>
              </div>
              <div>
                <b>Mon–Fri</b>
                <span>9 a.m. – 5 p.m. EST</span>
              </div>
              <div>
                <b>&lt; 24h</b>
                <span>Email reply</span>
              </div>
            </div>
          </div>
        </header>

        <section className="sub-section">
          <div className="sh">
            <div className="num">§ 01 / Reach us</div>
            <h2>
              Three direct <em>lines.</em>
            </h2>
            <div className="tag">Bloomfield Hills, Michigan</div>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="big">i</div>
              <div className="t">By phone</div>
              <h4>(586) 980-1296</h4>
              <p>
                A coordinator answers — same day, every day we&apos;re open.
                If you reach voicemail, we return calls the next business day.
              </p>
            </div>
            <div className="step-card">
              <div className="big">ii</div>
              <div className="t">By email</div>
              <h4>info@aprimresearch.com</h4>
              <p>
                Reach the whole coordinator team at once. Best for non-urgent
                questions, study inquiries, or sponsor introductions.
              </p>
            </div>
            <div className="step-card">
              <div className="big">iii</div>
              <div className="t">In person</div>
              <h4>27483 Dequindre Rd. Suite 304</h4>
              <p>
                Our research suite is open by appointment at 27483 Dequindre
                Rd. Suite 304, Madison Heights, MI 48071. Park free in the
                lot; the front desk hands you off to a coordinator on arrival.
              </p>
            </div>
            <div className="step-card">
              <div className="big">iv</div>
              <div className="t">For sponsors</div>
              <h4>Site qualification</h4>
              <p>
                Our regulatory packet, capability statement, and metrics dashboard
                are available on request. One email gets you all three.
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
            ◈ Or browse the studies
          </div>
          <h2>
            See what&apos;s <em>open</em> right now.
          </h2>
          <p>
            Each study page lists eligibility, visit cadence, and compensation.
            A two-minute pre-screen tells you if you&apos;re a fit before any
            phone call.
          </p>
          <div className="cta-row">
            <Link className="cta-pill" href="/studies">
              <span>See active studies →</span>
            </Link>
            <Link className="cta-ghost" href="/patients">
              For patients
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
