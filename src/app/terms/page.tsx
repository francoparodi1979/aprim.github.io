import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { subpageStyles } from "../_styles/subpages";

export const metadata: Metadata = {
  title: "SMS Terms and Conditions",
  description:
    "Terms and Conditions for the Veritas Clinical Research PLLC SMS messaging service.",
};

export default function TermsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: subpageStyles }} />
      <div className="sub-shell">
        <SiteNav />

        <header className="ph">
          <div>
            <div className="crumb">Home / Terms</div>
            <h1>
              SMS terms &amp; <em>conditions.</em>
            </h1>
          </div>
          <div className="right">
            <p>
              Effective date: July 24, 2026. By opting in to receive SMS
              messages from Veritas Clinical Research PLLC (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; &ldquo;our&rdquo;), you agree to these Terms
              and Conditions.
            </p>
          </div>
        </header>

        <section className="sub-section">
          <article className="study-article">
            <h2>SMS messaging service</h2>
            <p>
              By providing your phone number, you agree to receive SMS text
              messages from Veritas Clinical Research PLLC for conversational
              messages related to your inquiries and ongoing two-way
              communication.
            </p>
            <ul>
              <li>
                <strong>Message purpose:</strong> conversational messages
                related to your inquiries and ongoing two-way communication.
              </li>
              <li>
                <strong>Message frequency:</strong> message frequency may vary.
                On average, 1&ndash;2 messages per month.
              </li>
              <li>
                <strong>Rates:</strong> message and data rates may apply.
              </li>
            </ul>
            <p>
              If you do not wish to receive SMS text messages, please do not
              provide your phone number.
            </p>

            <h2>Message frequency</h2>
            <p>
              You will get more than one message from us unless you opt out,
              and while messaging frequency varies, you will likely receive
              1&ndash;2 messages per month. Veritas Clinical Research PLLC
              reserves the right to alter the frequency of messages at any time
              to increase or decrease the total number of messages. Veritas
              Clinical Research PLLC and carriers are not liable for delays or
              undelivered messages.
            </p>

            <h2>Message and data rates</h2>
            <p>
              Message and data rates may apply based on your mobile
              carrier&rsquo;s terms.
            </p>

            <h2>Privacy policy</h2>
            <p>
              Your information will be handled in accordance with our{" "}
              <Link href="/privacy">Messaging Privacy Policy</Link>.
            </p>

            <h2>Cancellation / opt-out instructions</h2>
            <p>
              You can opt out of receiving SMS messages at any time by replying
              STOP to any message we send you. After you opt out of text
              messaging, you will receive one additional message confirming
              your request has been processed.
            </p>

            <h2>Help / customer support</h2>
            <p>
              Text the word HELP for support. You may also contact us directly
              at{" "}
              <a href="mailto:franco.parodi@veritasclinical.org">
                franco.parodi@veritasclinical.org
              </a>{" "}
              or <a href="tel:+15862100330">(586) 210-0330</a>.
            </p>

            <h2>Liability</h2>
            <p>
              We are not responsible for any charges, errors, or delays in SMS
              delivery or undelivered messages caused by your carrier or
              third-party service providers.
            </p>
          </article>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
