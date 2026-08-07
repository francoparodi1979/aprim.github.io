import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { subpageStyles } from "../_styles/subpages";

export const metadata: Metadata = {
  title: "Messaging Privacy Policy",
  description:
    "How Veritas Clinical Research PLLC collects and uses information when you opt in to receive SMS messages.",
};

export default function PrivacyPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: subpageStyles }} />
      <div className="sub-shell">
        <SiteNav />

        <header className="ph">
          <div>
            <div className="crumb">Home / Privacy</div>
            <h1>
              Messaging <em>privacy</em> policy.
            </h1>
          </div>
          <div className="right">
            <p>
              Effective date: July 24, 2026. This policy explains how Veritas
              Clinical Research PLLC collects and uses information about you
              when you opt in to receive SMS messages from us.
            </p>
          </div>
        </header>

        <section className="sub-section">
          <article className="study-article">
            <p>
              Veritas Clinical Research PLLC (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; &ldquo;our&rdquo;) respects your privacy and is
              committed to protecting your personal information. This Privacy
              Policy explains how Veritas Clinical Research PLLC collects and
              uses information about you when you opt in to receive SMS
              messages from us.
            </p>

            <h2>Information we collect</h2>
            <p>When you opt in to receive SMS messages, we collect:</p>
            <ul>
              <li>Your phone number</li>
              <li>Consent to send SMS messages</li>
              <li>Your email address</li>
              <li>Your basic contact information</li>
              <li>Your messaging history</li>
              <li>
                Information related to your clinical trial interest, screening,
                or study participation
              </li>
            </ul>

            <h2>How we collect your information</h2>
            <p>
              We may collect your information directly from you, such as when
              you complete a form or contact us, or automatically, such as when
              you interact with our website.
            </p>

            <h2>How we use your information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Send you the SMS messages you&rsquo;ve opted in to receive</li>
              <li>
                Provide updates, promotions, or other relevant content based on
                your preferences
              </li>
              <li>Operate our business</li>
              <li>
                Send appointment reminders, study visit notifications, and
                other trial-related communications
              </li>
            </ul>

            <h2>Choices and controls</h2>
            <p>
              You can opt out of receiving SMS messages at any time by replying
              STOP to any message we send you. You can review our{" "}
              <Link href="/terms">Terms and Conditions</Link> for additional
              information about the opt-out process.
            </p>

            <h2>To whom we disclose your information</h2>
            <p>
              We may disclose your information to our affiliated companies; to
              third-party service providers, business advisors, or consultants
              who provide services to us; in connection with a merger,
              acquisition, reorganization, restructuring, financing transaction
              or sale of assets; as required by law or administrative order; to
              assert claims or rights or to defend against claims; and to our
              clinical trial sponsors, contract research organizations (CROs),
              and applicable regulatory or oversight bodies as required for the
              conduct of clinical research studies.
            </p>
            <p>
              We do not share your personal information, phone number, or SMS
              consent opt-in data with third parties or affiliates for
              marketing or promotional purposes.
            </p>

            <h2>Contact for messaging program questions</h2>
            <p>
              If you have questions about this messaging program or our privacy
              practices, please contact us by using the HELP instruction
              available through the messaging program.
            </p>

            <h2>How consumer data is handled</h2>
            <ul>
              <li>
                Consumer data, including phone numbers and SMS opt-in data,
                will not be transferred, shared, or disclosed to external
                organizations for their independent use.
              </li>
              <li>
                Such data may be provided only to strictly necessary service
                providers acting on the company&rsquo;s behalf.
              </li>
              <li>
                These service providers must operate under confidentiality and
                security obligations.
              </li>
            </ul>

            <h2>Protection of information</h2>
            <p>
              We take steps to protect your information against unauthorized
              use or disclosure.
            </p>

            <h2>Updates</h2>
            <p>
              We may periodically update this privacy policy. If we make
              material changes that have a substantive and adverse impact on
              your privacy, we will provide notice on this website prior to the
              change becoming effective. We encourage you to periodically
              review this page for the latest information about our privacy
              practices.
            </p>

            <h2>How to contact us</h2>
            <p>
              You can reach us by texting the word HELP for support to{" "}
              <a href="tel:+15862100330">(586) 210-0330</a>. You may also
              contact us directly at{" "}
              <a href="mailto:franco.parodi@veritasclinical.org">
                franco.parodi@veritasclinical.org
              </a>
              .
            </p>
          </article>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
