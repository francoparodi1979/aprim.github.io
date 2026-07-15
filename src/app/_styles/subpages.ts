/**
 * Shared subpage styles (About / Studies / Patients) — Motion direction.
 * Inlined per-page via <style>. Globals/animations live in globals.css.
 */
export const subpageStyles = `
.sub-shell { background: var(--color-cream); }

/* page header */
.ph {
  padding: 100px 64px 70px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 80px;
  align-items: end;
  border-bottom: 1px solid var(--rule);
  position: relative;
  overflow: hidden;
}
.ph::before {
  content: "";
  position: absolute;
  top: -200px;
  right: -120px;
  width: 540px;
  height: 540px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(208,122,69,0.18), transparent 70%);
  filter: blur(60px);
  animation: breathe-slow 8s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}
.ph > * { position: relative; z-index: 1; }
.ph .crumb {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--muted);
  text-transform: uppercase;
  margin-bottom: 24px;
}
.ph h1 {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 116px;
  line-height: 0.9;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--color-ink);
}
.ph h1 em { font-style: italic; color: var(--color-clay); }
/* Direct child only — the contact page nests a form card (with its own
   typography) inside .right, which must not inherit this intro size. */
.ph .right > p {
  font-size: 18px;
  line-height: 1.65;
  color: var(--color-ink-2);
  max-width: 480px;
}
.ph .ks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 32px;
}
.ph .ks b {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 40px;
  letter-spacing: -0.02em;
  display: block;
  line-height: 1;
}
.ph .ks span {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--muted);
  text-transform: uppercase;
  margin-top: 8px;
  display: block;
}

/* generic section */
.sub-section { padding: 120px 64px; position: relative; }
.sub-section.bone { background: var(--color-bone); }
.sub-section.ink { background: var(--color-ink); color: var(--color-cream); }
.sub-section.ink h2 { color: var(--color-cream); }
.sub-section.ink h2 em { color: var(--color-clay-soft); }

.sh {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 40px;
  align-items: end;
  margin-bottom: 56px;
}
.sh .num {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-clay);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.sh .tag {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--muted);
  text-transform: uppercase;
  align-self: center;
  text-align: right;
}
.sub-section h2 {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 60px;
  letter-spacing: -0.02em;
  line-height: 0.98;
  color: var(--color-ink);
  margin: 0;
}
.sub-section h2 em { font-style: italic; color: var(--color-clay); }

/* about-intro */
.about-intro { display: grid; grid-template-columns: 1fr 1.3fr; gap: 96px; }
.about-intro .left h2 { margin-top: 16px; }
.about-intro p {
  font-size: 18px;
  line-height: 1.75;
  color: var(--color-ink-2);
  margin-bottom: 20px;
}
.about-intro p.first::first-letter {
  font-family: var(--font-display);
  font-size: 80px;
  float: left;
  line-height: 0.85;
  margin: 10px 14px 0 -4px;
  color: var(--color-clay);
  font-weight: 300;
}

/* team grid */
.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--rule);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  margin-top: 16px;
}
.member {
  background: var(--color-bone);
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 360px;
}
.member .portrait {
  aspect-ratio: 1 / 1;
  background:
    repeating-linear-gradient(135deg, var(--color-ink-2) 0 2px, var(--color-ink) 2px 22px);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}
.member .portrait::after {
  content: attr(data-cap);
  position: absolute;
  bottom: 8px;
  left: 8px;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  color: var(--color-cream);
  background: rgba(10,46,56,0.6);
  padding: 4px 8px;
  border-radius: 3px;
}
.member .role {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--color-clay);
  text-transform: uppercase;
}
.member h4 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 22px;
  line-height: 1.1;
  letter-spacing: -0.005em;
  margin: 0;
}
.member p {
  font-size: 13px;
  line-height: 1.55;
  color: var(--color-ink-2);
  margin: 0;
}

/* timeline (about history) */
.about-timeline {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 32px;
  margin-top: 56px;
}
.yr {
  border-top: 1px solid var(--color-ink);
  padding-top: 20px;
}
.yr .n {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 44px;
  letter-spacing: -0.02em;
  display: block;
  line-height: 1;
}
.yr .n em { font-style: italic; color: var(--color-clay); }
.yr p {
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-ink-2);
  margin-top: 14px;
}

/* capabilities (about) */
.cap-table {
  border: 1px solid var(--rule);
  background: rgba(255,255,255,0.4);
  border-radius: 8px;
  overflow: hidden;
}
.cap-row {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  padding: 24px 28px;
  border-bottom: 1px solid var(--rule);
  gap: 32px;
  align-items: start;
}
.cap-row:last-child { border-bottom: none; }
.cap-row .lbl {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--muted);
  text-transform: uppercase;
}
.cap-row h5 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 20px;
  margin: 0 0 6px;
}
.cap-row p {
  font-size: 14px;
  color: var(--color-ink-2);
  line-height: 1.55;
  margin: 0;
}
.cap-row .have {
  color: #2d7d5c;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.55;
}
.cap-row .have::before { content: "✓ "; }

/* Studies — full table */
.trial-table {
  border: 1px solid var(--rule);
  background: rgba(255,255,255,0.5);
  border-radius: 8px;
  overflow: hidden;
}
.tt-head {
  display: grid;
  grid-template-columns: 90px 1fr 130px 90px 100px 120px 80px;
  gap: 12px;
  padding: 18px 24px;
  border-bottom: 1px solid var(--rule);
  background: var(--color-bone);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}
.tt-row {
  display: grid;
  grid-template-columns: 90px 1fr 130px 90px 100px 120px 80px;
  padding: 26px 24px;
  border-bottom: 1px solid var(--rule);
  align-items: start;
  gap: 12px;
  color: inherit;
  transition: background 0.3s;
  min-height: 100%;
}
.tt-row > .id { padding-top: 2px; }
.tt-row .tt-mid { align-self: center; }
.tt-row:last-child { border-bottom: none; }
.tt-row:hover { background: rgba(208,122,69,0.05); }
.tt-row .id {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--muted);
}
.tt-row h4 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 22px;
  line-height: 1.15;
  margin: 0 0 6px;
}
.tt-row h4 em { font-style: italic; color: var(--color-clay); }
.tt-row .desc {
  font-size: 13px;
  color: var(--color-ink-2);
  line-height: 1.55;
}
.tt-row .ph {
  font-family: var(--font-mono);
  font-size: 11px;
  background: var(--color-bone);
  padding: 4px 10px;
  display: inline-block;
  border-radius: 3px;
}
.tt-row .status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.tt-row .status.open { color: #2d7d5c; }
.tt-row .status.open::before {
  content: "";
  width: 8px;
  height: 8px;
  background: #2d7d5c;
  border-radius: 50%;
  animation: breathe 1.5s ease-in-out infinite;
}
.tt-row .arr {
  color: var(--color-clay);
  font-family: var(--font-mono);
  font-size: 13px;
  text-align: right;
  font-weight: 500;
}

/* Sponsors — portfolio table */
.sp-table {
  border: 1px solid var(--rule);
  background: rgba(255,255,255,0.5);
  border-radius: 8px;
  overflow: hidden;
}
.sp-head {
  display: grid;
  grid-template-columns: 150px 1fr 190px 190px;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--rule);
  background: var(--color-bone);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}
.sp-row {
  display: grid;
  grid-template-columns: 150px 1fr 190px 190px;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--rule);
  align-items: center;
  color: inherit;
  transition: background 0.3s;
}
.sp-row:last-child { border-bottom: none; }
.sp-row:hover { background: rgba(208,122,69,0.05); }
.sp-row .id {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--muted);
}
.sp-row h4 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 19px;
  line-height: 1.25;
  letter-spacing: -0.005em;
  margin: 0;
}
.sp-row .mid {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-ink-2);
}
.sp-row .st {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}
.sp-row .st .dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(10,46,56,0.3); flex-shrink: 0; }
.sp-row .st[data-status="recruiting"] { color: var(--color-clay); }
.sp-row .st[data-status="recruiting"] .dot { background: var(--color-clay); animation: breathe 1.5s ease-in-out infinite; }
.sp-row .st[data-status="active"] { color: var(--color-sage); }
.sp-row .st[data-status="active"] .dot { background: var(--color-sage); }
.sp-row .st[data-status="terminated"] { opacity: 0.7; }

/* Patient steps */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--rule);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  margin-top: 16px;
}
.step-card {
  background: var(--color-cream);
  padding: 36px 32px;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.step-card .big {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  font-size: 56px;
  color: var(--color-clay);
  line-height: 1;
}
.step-card .t {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--muted);
  text-transform: uppercase;
  margin-top: 4px;
}
.step-card h4 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 22px;
  line-height: 1.15;
  margin: 4px 0 6px;
}
.step-card p {
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-ink-2);
  margin: 0;
}

/* Safety promises (dark) */
.safety-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 56px;
}
.safety-card {
  padding: 32px;
  background: rgba(250,246,238,0.06);
  border: 1px solid rgba(242,237,227,0.12);
  border-radius: 16px;
}
.safety-card .n {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--color-clay-soft);
  text-transform: uppercase;
  margin-bottom: 18px;
}
.safety-card h4 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 26px;
  line-height: 1.15;
  margin: 0 0 14px;
}
.safety-card p {
  font-size: 15px;
  line-height: 1.65;
  color: rgba(242,237,227,0.78);
  margin: 0;
}

/* FAQ rows */
.faq-list { border-top: 1px solid var(--rule); margin-top: 32px; }
.faq-row {
  padding: 32px 0;
  border-bottom: 1px solid var(--rule);
  display: grid;
  grid-template-columns: 60px 1fr 1.4fr;
  gap: 40px;
  align-items: start;
}
.faq-row .n {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-clay);
  letter-spacing: 0.14em;
}
.faq-row h4 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 26px;
  line-height: 1.15;
  margin: 0;
}
.faq-row h4 em { font-style: italic; }
.faq-row p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-ink-2);
  margin: 0;
}

/* Study detail article (MDX body) */
.study-article { max-width: 720px; }
.study-article h2 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 34px;
  letter-spacing: -0.01em;
  line-height: 1.1;
  margin: 48px 0 18px;
}
.study-article h2:first-child { margin-top: 0; }
.study-article p {
  font-size: 17px;
  line-height: 1.75;
  color: var(--color-ink-2);
  margin: 0 0 18px;
}
.study-article ul {
  margin: 0 0 18px;
  padding-left: 22px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.study-article li {
  font-size: 17px;
  line-height: 1.6;
  color: var(--color-ink-2);
}
.study-article li::marker { color: var(--color-clay); }

/* Contact page header variant — form lives above the fold in the right column */
.ph.ph-form {
  align-items: start;
  padding: 56px 64px 72px;
}
.ph-form h1 { font-size: 92px; }
.ph-form .ph-lede {
  font-size: 16px;
  line-height: 1.65;
  color: var(--color-ink-2);
  max-width: 440px;
  margin-top: 28px;
}
.ph-form .ks { margin-top: 36px; }
.ph-form-card {
  background: var(--color-bone);
  border: 1px solid var(--rule);
  border-radius: 18px;
  padding: 28px;
  box-shadow: 0 18px 44px rgba(10,46,56,0.08);
}
.ph-form-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-clay);
  font-weight: 500;
  margin-bottom: 18px;
}
.ph-form-card .cform { gap: 16px; max-width: none; }
.ph-form-card .cform-field textarea { min-height: 92px; }

/* Contact — find us (building photo + clickable map) */
.find-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: stretch;
}
.find-photo {
  margin: 0;
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  background: var(--color-ink);
}
.find-photo img {
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: cover;
  display: block;
}
.find-photo figcaption {
  position: absolute;
  left: 16px;
  bottom: 16px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-cream);
  background: rgba(10,46,56,0.62);
  padding: 10px 14px;
  border-radius: 8px;
  backdrop-filter: blur(6px);
}
.find-map {
  position: relative;
  display: block;
  min-height: 420px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid var(--rule);
  transition: transform 0.4s cubic-bezier(0.16,0.84,0.44,1), box-shadow 0.4s;
}
.find-map:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 48px rgba(10,46,56,0.14);
}
/* Display-only: clicks fall through to the wrapping directions link */
.find-map iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  pointer-events: none;
}
.find-chip {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 2;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: var(--color-ink);
  color: var(--color-cream);
  padding: 9px 14px;
  border-radius: 100px;
  transition: background 0.25s;
}
.find-map:hover .find-chip { background: var(--color-clay); }

/* Contact form (Formspree) */
.cform {
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.cform-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
}
.cform-field { display: flex; flex-direction: column; gap: 8px; }
.cform-field span {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  /* Darker than --muted: 10px type needs >= 4.5:1 contrast (WCAG AA). */
  color: rgba(10,46,56,0.75);
}
.cform-field input,
.cform-field textarea {
  font-family: var(--font-sans);
  font-size: 15px;
  color: var(--color-ink);
  background: rgba(255,255,255,0.55);
  /* Stronger than --rule: field boundaries need >= 3:1 (WCAG 1.4.11). */
  border: 1px solid rgba(10,46,56,0.55);
  border-radius: 10px;
  padding: 14px 16px;
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
  resize: vertical;
}
.cform-field input::placeholder,
.cform-field textarea::placeholder { color: rgba(10,46,56,0.35); }
.cform-field input:focus,
.cform-field textarea:focus {
  border-color: var(--color-clay);
  box-shadow: 0 0 0 3px rgba(208,122,69,0.15);
  background: #fff;
}
.cform-note {
  font-size: 13px;
  line-height: 1.6;
  color: rgba(10,46,56,0.75);
  margin: 0;
  max-width: 560px;
}
.cform-error {
  font-size: 14px;
  line-height: 1.6;
  color: #a13a2a;
  background: rgba(161,58,42,0.08);
  border: 1px solid rgba(161,58,42,0.25);
  border-radius: 10px;
  padding: 12px 16px;
  margin: 0;
}
.cform-error a { text-decoration: underline; }
.cform-submit {
  align-self: flex-start;
  border: none;
  cursor: pointer;
}
.cform-submit:disabled { opacity: 0.6; cursor: wait; }
.cform-done {
  max-width: 560px;
  /* Same fill as the inputs — distinct from the bone card/section behind it. */
  background: rgba(255,255,255,0.55);
  border: 1px solid var(--rule);
  border-radius: 16px;
  padding: 40px;
}
.cform-done h4:focus { outline: none; }
.cform-done .big {
  font-size: 22px;
  color: var(--color-clay);
  margin-bottom: 14px;
}
.cform-done h4 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 28px;
  margin: 0 0 10px;
}
.cform-done p { font-size: 15px; line-height: 1.65; color: var(--color-ink-2); margin: 0; }
.cform-done a { color: var(--color-clay); font-weight: 500; }

/* page divider strip */
.page-divider {
  padding: 24px 64px;
  background: var(--color-ink);
  color: var(--color-cream);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
}

/* CTA strip at bottom of subpages */
.sub-cta {
  padding: 110px 64px 130px;
  background: var(--color-bone);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.sub-cta-blob {
  position: absolute;
  width: 700px;
  height: 700px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(208,122,69,0.16), transparent 70%);
  filter: blur(40px);
  animation: breathe-slow 8s ease-in-out infinite;
  pointer-events: none;
}
.sub-cta h2 {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 92px;
  line-height: 0.95;
  letter-spacing: -0.025em;
  position: relative;
  z-index: 2;
  margin: 0;
}
.sub-cta h2 em { font-style: italic; color: var(--color-clay); }
.sub-cta p {
  font-size: 18px;
  color: var(--color-ink-2);
  margin: 28px auto 40px;
  max-width: 560px;
  line-height: 1.65;
  position: relative;
  z-index: 2;
}
.sub-cta .cta-row {
  display: inline-flex;
  gap: 14px;
  position: relative;
  z-index: 2;
}
`;
