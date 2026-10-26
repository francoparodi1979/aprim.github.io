"use client";

import { useEffect, useRef, useState } from "react";

// FormSubmit delivers each submission by email to the Veritas "contact@"
// shared mailbox in Microsoft 365. The address is assembled at runtime and
// the form has no static `action`, so it never appears in the page HTML —
// most form-spam bots parse the HTML and post straight to the action URL.
// (Stored reversed so the minifier can't fold it back into a plain string.)
const FORM_AJAX_ENDPOINT = () =>
  "https://formsubmit.co/ajax/" +
  "gro.lacinilcsatirev@tcatnoc".split("").reverse().join("");

// Spam filtering (no backend, so it is layered):
//  1. Two honeypots: FormSubmit's `_honey` plus a plausible-looking
//     `website` field that bots tend to fill.
//  2. Submissions sent faster than MIN_FILL_MS after the form appears are
//     treated as bots (humans need a few seconds to type).
//  3. Phone numbers in the 555-01xx range (reserved for fiction) are dropped.
//  4. FormSubmit's server-side `_blacklist` rejects known spam phrases even
//     if a bot posts to the endpoint directly.
// Blocked submissions show the normal success message so bots learn nothing.
const MIN_FILL_MS = 4000;
const FAKE_PHONE = /555[\s.\-]*01\d\d/;
const BLACKLIST =
  "I would like more information. Please contact me by email, 555-01";

// Plain-text confirmation FormSubmit emails to the person who submitted.
const AUTORESPONSE =
  "Thank you for contacting Veritas Clinical Research. We received your " +
  "message, and a study coordinator will contact you within one business day. " +
  "If your question is time-sensitive, please call us at (586) 210-0330, " +
  "weekdays 9 a.m. to 5 p.m. ET. Please do not send medical details such as " +
  "diagnoses, medications, or test results by email; we will go over those " +
  "with you by phone. Veritas Clinical Research, Madison Heights and Warren, " +
  "Michigan. veritasclinical.org";

type FormStatus = "idle" | "submitting" | "success" | "error";

/**
 * Contact form backed by FormSubmit — no first-party backend. Submits via
 * fetch for an inline confirmation; the plain `action`/`method` attributes
 * remain so the form still works if JavaScript is unavailable (FormSubmit
 * then shows its own hosted thank-you page).
 */
export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const doneHeadingRef = useRef<HTMLHeadingElement>(null);
  const shownAtRef = useRef<number>(0);

  useEffect(() => {
    shownAtRef.current = Date.now();
  }, []);

  // The form unmounts on success, which silently drops keyboard focus and
  // leaves screen readers unaware anything happened. Moving focus to the
  // confirmation heading announces it and restores a sane tab position.
  useEffect(() => {
    if (status === "success") doneHeadingRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const looksLikeBot =
      String(data.get("website") ?? "").trim() !== "" ||
      String(data.get("_honey") ?? "").trim() !== "" ||
      Date.now() - shownAtRef.current < MIN_FILL_MS ||
      FAKE_PHONE.test(String(data.get("phone") ?? ""));
    if (looksLikeBot) {
      form.reset();
      setStatus("success");
      return;
    }
    data.delete("website");

    setStatus("submitting");
    try {
      const res = await fetch(FORM_AJAX_ENDPOINT(), {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="cform-done" role="status">
        <div className="big" aria-hidden>
          ◈
        </div>
        <h4 ref={doneHeadingRef} tabIndex={-1}>
          Message received.
        </h4>
        <p>
          Thank you — a coordinator will get back to you within one business
          day. If it&apos;s time-sensitive, call us at{" "}
          <a href="tel:+15862100330">(586) 210-0330</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="cform" onSubmit={handleSubmit}>
      <noscript>
        <p className="cform-error">
          This form needs JavaScript. Please call us at (586) 210-0330 instead.
        </p>
      </noscript>
      {/* FormSubmit metadata */}
      <input
        type="hidden"
        name="_subject"
        value="New inquiry — veritasclinical.org"
      />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      {/* Automatic confirmation emailed to the visitor's address (the "email" field). */}
      <input type="hidden" name="_autoresponse" value={AUTORESPONSE} />
      {/* Server-side spam phrases — FormSubmit discards matching submissions. */}
      <input type="hidden" name="_blacklist" value={BLACKLIST} />
      {/* Honeypot: hidden from humans; bots that fill it are dropped. */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />
      {/* Second honeypot with an ordinary-looking name; never sent on. */}
      <label
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="cform-row">
        <label className="cform-field">
          <span>Full name *</span>
          <input
            type="text"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Jane Doe"
          />
        </label>
        <label className="cform-field">
          <span>Email *</span>
          <input
            type="email"
            name="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="jane@example.com"
          />
        </label>
      </div>

      <label className="cform-field">
        <span>Phone *</span>
        <input
          type="tel"
          name="phone"
          required
          maxLength={30}
          autoComplete="tel"
          placeholder="(555) 555-5555"
        />
      </label>

      <label className="cform-field">
        <span>Message (optional)</span>
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Questions, availability, which study you're interested in, or how you heard about us."
        />
      </label>

      <p className="cform-note">
        Please don&apos;t include medical details here — diagnoses, medications,
        or test results. Those belong in a phone conversation with a
        coordinator, not a web form.
      </p>

      {status === "error" && (
        <p className="cform-error" role="alert">
          Something went wrong sending your message. Please try again, or call
          us at <a href="tel:+15862100330">(586) 210-0330</a>.
        </p>
      )}

      <button
        className="cta-pill cform-submit"
        type="submit"
        disabled={status === "submitting"}
      >
        <span>{status === "submitting" ? "Sending…" : "Send message →"}</span>
      </button>
    </form>
  );
}
