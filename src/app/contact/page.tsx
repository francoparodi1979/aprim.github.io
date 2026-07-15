import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { subpageStyles } from "../_styles/subpages";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the Veritas Clinical Research team in Madison Heights, Michigan.",
};

export default function ContactPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: subpageStyles }} />
      <div className="sub-shell">
        <SiteNav active="contact" />

        <header className="ph ph-form">
          <div>
            <div className="crumb">Home / Contact</div>
            <h1>
              One <em>conversation</em>
              <br /> starts it all.
            </h1>
            <p className="ph-lede">
              Send us your details and a coordinator gets back to you within
              one business day — or skip the form entirely and call. A real
              person answers, no triage, no call tree.
            </p>
            <div className="ks">
              <div>
                <b>(586)</b>
                <span>210-0330</span>
              </div>
              <div>
                <b>Mon–Fri</b>
                <span>9 a.m. – 5 p.m. EST</span>
              </div>
              <div>
                <b>&lt; 24h</b>
                <span>Message reply</span>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="ph-form-card">
              <div className="ph-form-label">◈ Write to us</div>
              <ContactForm />
            </div>
          </div>
        </header>

        <section className="sub-section">
          <div className="sh">
            <div className="num">§ 01 / Reach us</div>
            <h2>
              Three direct <em>lines.</em>
            </h2>
            <div className="tag">Madison Heights, Michigan</div>
          </div>
          {/* steps-3 class (not inline style) so media queries can restack it */}
          <div className="steps-grid steps-3">
            <div className="step-card">
              <div className="big">i</div>
              <div className="t">By phone</div>
              <h4>(586) 210-0330</h4>
              <p>
                A coordinator answers — same day, every day we&apos;re open.
                If you reach voicemail, we return calls the next business day.
                Fax: (586) 210-0380.
              </p>
            </div>
            <div className="step-card">
              <div className="big">ii</div>
              <div className="t">In person</div>
              <h4>27483 Dequindre Rd. Suite 304</h4>
              <p>
                Our research suite is open by appointment at 27483 Dequindre
                Rd. Suite 304, Madison Heights, MI 48071. Park free in the
                lot; the front desk hands you off to a coordinator on arrival.
              </p>
            </div>
            <div className="step-card">
              <div className="big">iii</div>
              <div className="t">For sponsors</div>
              <h4>Site qualification</h4>
              <p>
                Our regulatory packet, capability statement, and metrics
                dashboard are available on request. One phone call — or one
                message through the form — gets you all three.
              </p>
            </div>
          </div>
        </section>

        <section className="sub-section bone">
          <div className="sh">
            <div className="num">§ 02 / Find us</div>
            <h2>
              Easy to <em>find.</em>
            </h2>
            <div className="tag">Free parking · Suite 304</div>
          </div>
          <div className="find-grid">
            <figure className="find-photo">
              <Image
                src="/building.jpg"
                alt="The Professional Building at 27483 Dequindre Rd, Madison Heights — home of Veritas Clinical Research, Suite 304"
                width={1100}
                height={734}
              />
              <figcaption>
                The Professional Building · 27483 Dequindre Rd · Suite 304
              </figcaption>
            </figure>
            {/* The iframe is display-only (pointer-events: none) so any click
                on the map opens Google Maps with directions from the visitor's
                current location. */}
            <a
              className="find-map"
              href="https://www.google.com/maps/dir/?api=1&destination=27483+Dequindre+Rd+Suite+304,+Madison+Heights,+MI+48071"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Google Maps with driving directions to 27483 Dequindre Rd Suite 304, Madison Heights, MI 48071"
            >
              <iframe
                src="https://www.google.com/maps?q=27483+Dequindre+Rd,+Madison+Heights,+MI+48071&output=embed"
                title="Map of Veritas Clinical Research, 27483 Dequindre Rd, Madison Heights, MI"
                loading="lazy"
                tabIndex={-1}
                aria-hidden
              />
              <span className="find-chip">Get directions ↗</span>
            </a>
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
            Each study page lists eligibility, visit cadence, and compensation
            — and a coordinator can tell you if you&apos;re a fit in one short
            phone call.
          </p>
          <div className="cta-row">
            <Link className="cta-pill" href="/#studies">
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
