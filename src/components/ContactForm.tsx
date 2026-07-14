"use client";

import { useEffect, useRef, useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrengwkd";

type FormStatus = "idle" | "submitting" | "success" | "error";

/**
 * Contact form backed by Formspree — no first-party backend. Submits via
 * fetch for an inline confirmation; the plain `action`/`method` attributes
 * remain so the form still works if JavaScript is unavailable (Formspree
 * then shows its own hosted thank-you page).
 */
export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const doneHeadingRef = useRef<HTMLHeadingElement>(null);

  // The form unmounts on success, which silently drops keyboard focus and
  // leaves screen readers unaware anything happened. Moving focus to the
  // confirmation heading announces it and restores a sane tab position.
  useEffect(() => {
    if (status === "success") doneHeadingRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
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
          <a href="tel:+15869801296">(586) 980-1296</a>.
        </p>
      </div>
    );
  }

  return (
    <form
      className="cform"
      action={FORMSPREE_ENDPOINT}
      method="POST"
      onSubmit={handleSubmit}
    >
      {/* Formspree metadata */}
      <input
        type="hidden"
        name="_subject"
        value="New inquiry — veritasclinical.org"
      />
      {/* Honeypot: hidden from humans; bots that fill it are dropped. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />

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
          Something went wrong sending your message. Please try again, or email
          us directly at{" "}
          <a href="mailto:info@veritasclinical.org">info@veritasclinical.org</a>.
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
