import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { subpageStyles } from "../_styles/subpages";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Veritas Clinical Research is committed to a website that is accessible to the widest possible audience. Read our accessibility statement and how to reach us.",
};

export default function AccessibilityPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: subpageStyles }} />
      <div className="sub-shell">
        <SiteNav />

        <header className="ph">
          <div>
            <div className="crumb">Home / Accessibility</div>
            <h1>
              Accessibility <em>statement.</em>
            </h1>
          </div>
          <div className="right">
            <p>
              Veritas Clinical Research PLLC is committed to a website that is
              accessible to the widest possible audience, regardless of
              technology or ability. If anything on this site is hard for you
              to use, we want to know — and we&rsquo;ll help you another way in
              the meantime.
            </p>
          </div>
        </header>

        <section className="sub-section">
          <article className="study-article">
            <h2>Our commitment</h2>
            <p>
              We want every visitor — including people with disabilities — to
              be able to learn about our clinical trials, decide whether to
              participate, and reach our team. Website accessibility is an
              ongoing process, and we are continually working to improve the
              experience for all visitors.
            </p>

            <h2>Standards we follow</h2>
            <p>
              We strive to conform to the Web Content Accessibility Guidelines
              (WCAG) 2.1, Level AA. This website has not yet undergone a formal
              third-party accessibility evaluation; based on our own testing,
              we consider it partially conformant, meaning some parts of the
              content do not yet fully conform to the standard.
            </p>

            <h2>Measures we take</h2>
            <ul>
              <li>Semantic headings and landmarks for screen-reader navigation</li>
              <li>
                Text alternatives for meaningful images; decorative visuals and
                animations are hidden from assistive technology
              </li>
              <li>
                Form fields with visible labels, focus indicators, and text
                sized to prevent unwanted zooming on mobile devices
              </li>
              <li>
                Color contrast checked against WCAG guidelines for text and
                form controls
              </li>
              <li>
                Keyboard-only navigation and color-contrast checks as part of
                our self-evaluation of the site
              </li>
              <li>
                A responsive layout that supports small screens and text
                resizing
              </li>
            </ul>

            <h2>Known limitations</h2>
            <p>
              We describe known limitations in plain language, with an
              alternative where one exists:
            </p>
            <ul>
              <li>
                <strong>Animations:</strong> decorative motion on the home page
                does not yet respond to your device&rsquo;s reduced-motion
                preference. The animations are decorative only and never carry
                information.
              </li>
              <li>
                <strong>Navigation menu:</strong> the &ldquo;Get
                Involved&rdquo; menu in the desktop navigation opens on hover.
                All of its destinations — Patients, Medical Professionals, and
                Sponsors — are also available as regular links in the footer of
                every page, and directly in the navigation bar on mobile.
              </li>
              <li>
                <strong>Map:</strong> the map on our contact page is a visual
                embed. Our full street address appears in text beside it, and
                the map links to Google Maps for turn-by-turn directions.
              </li>
            </ul>

            <h2>Help by phone and alternative formats</h2>
            <p>
              Anything you can do on this website, we can do with you by phone
              — including answering questions about our studies and taking
              your contact details so a coordinator can follow up. We can also
              provide study information in alternative formats on request.
              Call us at <a href="tel:+15862100330">(586) 210-0330</a>,
              weekdays 9 a.m. to 5 p.m. Eastern.
            </p>

            <h2>Third-party content</h2>
            <p>
              Some content comes from services we do not control and may not
              meet the same accessibility standards: our contact form is
              processed by Formspree, the contact-page map is provided by
              Google Maps, and study listings link to ClinicalTrials.gov, an
              external government website.
            </p>

            <h2>Feedback</h2>
            <p>
              We welcome your feedback on the accessibility of this website.
              If you encounter an accessibility barrier, please call{" "}
              <a href="tel:+15862100330">(586) 210-0330</a> or write to us
              through our <Link href="/contact">contact page</Link>, and tell
              us the page and the problem you experienced. We aim to respond
              within a few business days. Please don&rsquo;t include medical
              details in written messages.
            </p>

            <h2>About this statement</h2>
            <p>
              We assessed the accessibility of this website by self-evaluation.
              This website relies on HTML, CSS, and JavaScript, and is designed
              to work with current versions of common browsers and assistive
              technologies. This statement was prepared on August 6, 2026, and
              will be reviewed as the website changes.
            </p>
          </article>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
