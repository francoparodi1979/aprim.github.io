/**
 * Page-scoped CSS for the home page (motion.html port).
 * Inlined via <style> on the page. Globals/animations live in globals.css.
 */
export const homePageStyles = `
/* ===== HERO ===== */
.hero {
  position: relative;
  padding: 100px 64px 120px;
  overflow: hidden;
  min-height: 860px;
}
.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}
.orb.a {
  width: 780px;
  height: 780px;
  top: -220px;
  right: -180px;
  background: radial-gradient(circle, rgba(208,122,69,0.35), transparent 70%);
  animation: orb-shift 16s ease-in-out infinite;
}
.orb.b {
  width: 620px;
  height: 620px;
  bottom: -280px;
  left: -120px;
  background: radial-gradient(circle, rgba(127,160,147,0.4), transparent 70%);
  animation: orb-shift 20s ease-in-out infinite reverse;
}
.orb.c {
  width: 400px;
  height: 400px;
  top: 40%;
  left: 35%;
  background: radial-gradient(circle, rgba(232,154,109,0.3), transparent 70%);
  animation: orb-shift 24s ease-in-out infinite;
}
.particles { position: absolute; inset: 0; overflow: hidden; }
.particle {
  position: absolute;
  bottom: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-clay);
  opacity: 0;
  animation: float-up linear infinite;
}
.hero-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 64px;
  align-items: center;
}
.kinetic {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 108px;
  line-height: 0.92;
  letter-spacing: -0.03em;
  color: var(--color-ink);
  margin: 0;
}
.kinetic .line { display: block; overflow: hidden; padding: 4px 0; }
.kinetic .word { display: inline-block; animation: slide-in-word 0.9s cubic-bezier(0.16,0.84,0.44,1) both; }
.kinetic .line:nth-child(1) .word { animation-delay: 0.1s; }
.kinetic .line:nth-child(2) .word { animation-delay: 0.25s; }
.kinetic .line:nth-child(3) .word { animation-delay: 0.4s; }
.kinetic em {
  font-style: italic;
  color: var(--color-clay);
  position: relative;
}
.kinetic em::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 6px;
  height: 2px;
  background: var(--color-clay);
  transform: scaleX(0);
  transform-origin: left;
  animation: expand 1.4s cubic-bezier(0.77,0,0.18,1) 0.9s forwards;
}
.hero .lede {
  font-size: 19px;
  line-height: 1.65;
  color: var(--color-ink-2);
  margin-top: 36px;
  max-width: 520px;
  opacity: 0;
  animation: slide-in-word 1s 0.8s both;
}
.hero-actions {
  display: flex;
  gap: 14px;
  margin-top: 44px;
  opacity: 0;
  animation: slide-in-word 1s 1s both;
}

/* breathing lung visual */
.hero-visual {
  position: relative;
  aspect-ratio: 1 / 1.05;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lung-stage { position: relative; width: 100%; height: 100%; }
.lung-aura {
  position: absolute;
  left: 50%;
  top: 48%;
  width: 78%;
  aspect-ratio: 1 / 1;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(208,122,69,0.55) 0%, rgba(208,122,69,0.18) 38%, transparent 68%);
  filter: blur(40px);
  animation: lung-aura 5.2s cubic-bezier(0.42,0,0.58,1) infinite;
  pointer-events: none;
  z-index: 0;
}
.lung-diaphragm {
  position: absolute;
  left: 50%;
  bottom: 9%;
  width: 62%;
  height: 14px;
  transform: translateX(-50%) scaleY(1);
  transform-origin: center top;
  background: radial-gradient(ellipse at center, rgba(40,18,12,0.55) 0%, transparent 70%);
  filter: blur(8px);
  animation: lung-diaphragm 5.2s cubic-bezier(0.42,0,0.58,1) infinite;
  pointer-events: none;
  z-index: 1;
}
.lung-rise {
  position: absolute;
  inset: 0;
  animation: lung-rise 5.2s cubic-bezier(0.42,0,0.58,1) infinite;
  transform-origin: center top;
  z-index: 2;
}
.lung-expand {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: lung-expand 5.2s cubic-bezier(0.42,0,0.58,1) infinite;
  transform-origin: center 55%;
}
.lung-img {
  width: 96%;
  height: auto;
  filter:
    drop-shadow(0 18px 28px rgba(120,40,30,0.28))
    drop-shadow(0 4px 8px rgba(80,20,16,0.25));
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}
.breath-mist {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  overflow: hidden;
}
.breath-mist span {
  position: absolute;
  left: var(--x);
  top: 18%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,240,225,0.7) 0%, rgba(255,220,200,0) 70%);
  animation: breath-mist-rise var(--d) ease-out var(--del, 0s) infinite;
  filter: blur(2px);
}
.lung-ecg {
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: 4%;
  width: 84%;
  height: 38px;
  z-index: 3;
  opacity: 0.9;
}
.lung-ecg path {
  stroke-dasharray: 6 4;
  animation: dash-flow 8s linear infinite;
}
.breath-meta {
  position: absolute;
  left: 50%;
  top: 11px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-family: var(--font-mono);
  z-index: 4;
  text-align: center;
}
.breath-meta-k {
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}
.breath-meta-v {
  display: flex;
  align-items: baseline;
  gap: 6px;
  color: var(--color-ink);
}
.breath-meta-v b {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 34px;
  line-height: 1;
  animation: bpm-flicker 5.2s ease-in-out infinite;
}
.breath-meta-v em {
  font-style: normal;
  font-size: 10px;
  color: var(--muted);
  letter-spacing: 0.06em;
}

/* hero stats readout */
.hero-readout {
  position: absolute;
  left: 64px;
  bottom: 40px;
  display: flex;
  gap: 40px;
  z-index: 3;
}
.readout-item { display: flex; flex-direction: column; gap: 4px; }
.readout-item .k {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}
.readout-item .v {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 400;
  line-height: 1;
}
.readout-item .v em {
  font-style: italic;
  color: var(--color-clay);
}

/* ===== TICKER ===== */
.ticker {
  background: var(--color-ink);
  color: var(--color-cream);
  padding: 22px 0;
  overflow: hidden;
  white-space: nowrap;
  border-top: 1px solid rgba(242,237,227,0.1);
  border-bottom: 1px solid rgba(242,237,227,0.1);
}
.ticker-track {
  display: inline-flex;
  animation: ticker 48s linear infinite;
  gap: 48px;
  padding-right: 48px;
}
.ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 300;
  font-style: italic;
}
.ticker-item::before {
  content: "◈";
  color: var(--color-clay);
  font-style: normal;
  font-size: 14px;
}
.ticker-item .mono {
  font-family: var(--font-mono);
  font-style: normal;
  font-size: 12px;
  color: var(--color-clay-soft);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 10px;
  border: 1px solid rgba(208,122,69,0.4);
  border-radius: 100px;
}

/* ===== METRICS ===== */
.metrics {
  padding: 100px 64px;
  background: var(--color-bone);
  position: relative;
  overflow: hidden;
}
.metrics-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 64px;
  gap: 60px;
}
.metrics-head h2 {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 56px;
  line-height: 1;
  letter-spacing: -0.02em;
  max-width: 620px;
  margin: 0;
}
.metrics-head h2 em { font-style: italic; color: var(--color-clay); }
.metrics-head .meta {
  text-align: right;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.6;
}
.metrics-head .meta .live {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-sage);
  margin-bottom: 8px;
}
.metrics-head .meta .live::before {
  content: "";
  width: 6px;
  height: 6px;
  background: var(--color-sage);
  border-radius: 50%;
  animation: breathe 1.2s ease-in-out infinite;
}
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  background: var(--rule);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.metric {
  background: var(--color-bone);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  overflow: hidden;
}
.metric .num {
  font-family: var(--font-display);
  font-size: 88px;
  font-weight: 300;
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: var(--color-ink);
}
.metric .num em { font-style: italic; color: var(--color-clay); }
.metric .lbl { font-size: 14px; color: var(--color-ink-2); line-height: 1.5; }
.metric .lbl strong {
  font-weight: 600;
  color: var(--color-ink);
  display: block;
  margin-bottom: 4px;
}
.metric .sparkline {
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 80px;
  height: 28px;
  opacity: 0.55;
}
.metric .sparkline path {
  fill: none;
  stroke: var(--color-clay);
  stroke-width: 1.2;
  stroke-dasharray: 180;
  stroke-dashoffset: 180;
  animation: draw-spark 3s ease-out forwards;
}

/* ===== WAVEFORM ===== */
.waveform {
  padding: 0;
  background: var(--color-ink);
  color: var(--color-cream);
  overflow: hidden;
  position: relative;
}
.waveform-inner {
  padding: 100px 64px 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.waveform h2 {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 68px;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0;
}
.waveform h2 em { font-style: italic; color: var(--color-clay-soft); }
.waveform p {
  font-size: 17px;
  line-height: 1.7;
  color: rgba(242,237,227,0.75);
  margin-top: 28px;
  max-width: 460px;
}
.waveform .link {
  margin-top: 36px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--color-clay-soft);
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid var(--color-clay-soft);
  padding-bottom: 4px;
}
.wave-stage { height: 340px; position: relative; }
.wave-svg { width: 100%; height: 100%; display: block; }
.wave-path { fill: none; stroke: var(--color-clay); stroke-width: 1.6; }
.wave-path.ghost { stroke: rgba(232,154,109,0.28); stroke-width: 1; }
.wave-labels { position: absolute; inset: 0; pointer-events: none; }
.wave-label {
  position: absolute;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(242,237,227,0.5);
}
.wave-strip {
  background: rgba(255,255,255,0.03);
  padding: 24px 64px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(242,237,227,0.08);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(242,237,227,0.55);
}
.wave-strip span b {
  color: var(--color-clay-soft);
  font-weight: 500;
  margin-left: 8px;
}

/* ===== STUDIES ===== */
.home-studies {
  padding: 140px 64px;
  background: var(--color-cream);
  position: relative;
  overflow: hidden;
}
.studies-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 80px;
  gap: 80px;
}
.studies-head h2 {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 72px;
  line-height: 0.98;
  letter-spacing: -0.02em;
  max-width: 760px;
  margin: 0;
}
.studies-head h2 em { font-style: italic; color: var(--color-clay); }
.studies-head .meta {
  text-align: right;
  font-size: 14px;
  color: var(--color-ink-2);
  max-width: 300px;
  line-height: 1.6;
}
.studies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.study {
  background: var(--color-bone);
  border-radius: 18px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 460px;
  position: relative;
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.16,0.84,0.44,1), box-shadow 0.5s;
  cursor: pointer;
  color: inherit;
}
.study:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 60px rgba(10,46,56,0.14);
}
.study::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-clay), var(--color-clay-soft), var(--color-sage));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.77,0,0.18,1);
}
.study:hover::before { transform: scaleX(1); }
.study .chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--color-clay);
  background: rgba(208,122,69,0.1);
  padding: 6px 10px;
  border-radius: 100px;
  width: fit-content;
}
.study .chip .live {
  width: 6px;
  height: 6px;
  background: var(--color-clay);
  border-radius: 50%;
  animation: breathe 1.5s ease-in-out infinite;
}
.study h3 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 0;
}
.study h3 em { font-style: italic; }
.study p { font-size: 14px; line-height: 1.6; color: var(--color-ink-2); margin: 0; }
.study .viz { height: 80px; margin: 8px 0; position: relative; }
.study .viz svg { width: 100%; height: 100%; }
.study .meta {
  margin-top: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding-top: 18px;
  border-top: 1px solid var(--rule);
}
.study .meta span {
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: var(--font-mono);
}
.study .meta span b {
  display: block;
  color: var(--color-ink);
  font-family: var(--font-display);
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
  font-size: 16px;
  margin-top: 4px;
}

/* ===== DOCTOR ===== */
.doctor {
  padding: 140px 64px;
  background: var(--color-bone);
  position: relative;
  overflow: hidden;
}
.doctor-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 90px;
  align-items: center;
  position: relative;
  z-index: 2;
}
.doc-portrait {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: 240px 240px 14px 14px;
  overflow: hidden;
  background: linear-gradient(160deg, var(--color-ink) 0%, var(--color-ink-2) 100%);
}
.doc-portrait::before {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(45deg, transparent 0 18px, rgba(208,122,69,0.08) 18px 19px);
  animation: wave-move 14s linear infinite;
}
.doc-portrait::after {
  content: "DR. FRANCO PARODI";
  position: absolute;
  bottom: 28px;
  left: 28px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--color-cream);
  background: rgba(10,46,56,0.55);
  padding: 8px 14px;
  border-radius: 4px;
  backdrop-filter: blur(6px);
}
.doc-portrait .ring {
  position: absolute;
  inset: -40px;
  border: 1px solid var(--color-clay);
  border-radius: 260px 260px 40px 40px;
  opacity: 0.35;
  animation: breathe-slow 6s ease-in-out infinite;
}
.doc-portrait .ring.b { inset: -80px; animation-delay: 1s; opacity: 0.18; }

.doctor h2 {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 76px;
  line-height: 0.98;
  letter-spacing: -0.025em;
  margin: 0 0 32px;
}
.doctor h2 em { font-style: italic; color: var(--color-clay); }
.doctor .credentials {
  display: flex;
  gap: 40px;
  margin-bottom: 36px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--rule);
}
.doctor .credentials div { font-size: 13px; line-height: 1.5; color: var(--color-ink-2); }
.doctor .credentials div b {
  display: block;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-clay);
  margin-bottom: 6px;
  font-weight: 500;
}
.doctor q {
  display: block;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  font-size: 30px;
  line-height: 1.3;
  color: var(--color-ink);
  quotes: none;
}
.doctor q::before, .doctor q::after { content: ""; }
.doctor .sig {
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.doctor .sig .name {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 32px;
}
.doctor .sig .role {
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-family: var(--font-mono);
}

/* ===== JOURNEY ===== */
.journey {
  padding: 140px 64px;
  background: var(--color-cream);
  position: relative;
  overflow: hidden;
}
.journey-head { text-align: center; max-width: 780px; margin: 0 auto 90px; }
.journey h2 {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 68px;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0;
}
.journey h2 em { font-style: italic; color: var(--color-clay); }
.journey-head p {
  font-size: 18px;
  color: var(--color-ink-2);
  margin-top: 24px;
  line-height: 1.65;
}
.timeline {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  position: relative;
}
.timeline::before {
  content: "";
  position: absolute;
  top: 44px;
  left: 6%;
  right: 6%;
  height: 1px;
  background: var(--rule);
}
.timeline::after {
  content: "";
  position: absolute;
  top: 44px;
  left: 6%;
  width: 0;
  height: 1px;
  background: var(--color-clay);
  animation: timeline-fill 3s ease-out 1s forwards;
}
.node { position: relative; text-align: left; }
.node .dot {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: var(--color-cream);
  border: 1px solid var(--color-ink);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 36px;
  color: var(--color-clay);
  margin-bottom: 28px;
  position: relative;
  transition: transform 0.4s;
}
.node:hover .dot { transform: scale(1.08); }
.node .dot::after {
  content: "";
  position: absolute;
  inset: -8px;
  border: 1px solid var(--color-clay);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s;
}
.node:hover .dot::after { opacity: 0.4; animation: pulse-ring 1.6s ease-out infinite; }
.node h4 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 24px;
  line-height: 1.15;
  margin: 0 0 12px;
  letter-spacing: -0.01em;
}
.node p { font-size: 14px; line-height: 1.6; color: var(--color-ink-2); margin: 0; }
.node .dur {
  margin-top: 14px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-clay);
}

/* ===== QUOTE BAND ===== */
.quote-band {
  padding: 140px 64px;
  background: var(--color-ink);
  color: var(--color-cream);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.quote-band::before {
  content: "";
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 900px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(208,122,69,0.2), transparent 60%);
  animation: breathe-slow 8s ease-in-out infinite;
}
.quote-band q {
  position: relative;
  font-family: var(--font-display);
  font-weight: 300;
  font-style: italic;
  font-size: 64px;
  line-height: 1.18;
  letter-spacing: -0.02em;
  quotes: none;
  display: block;
  max-width: 1120px;
  margin: 0 auto;
}
.quote-band q em { font-style: normal; color: var(--color-clay-soft); }
.quote-band .who {
  margin-top: 60px;
  display: inline-flex;
  align-items: center;
  gap: 20px;
  position: relative;
}
.quote-band .avatar {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--color-clay);
  animation: wobble 7s ease-in-out infinite;
}
.quote-band .name { text-align: left; }
.quote-band .name strong { font-size: 15px; font-weight: 500; display: block; }
.quote-band .name span {
  font-size: 11px;
  color: rgba(242,237,227,0.6);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-top: 4px;
  display: block;
  font-family: var(--font-mono);
}

/* ===== BIG CTA ===== */
.bigcta {
  padding: 140px 64px 160px;
  background: var(--color-bone);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.bigcta-blob {
  position: absolute;
  width: 800px;
  height: 800px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(208,122,69,0.18), transparent 70%);
  filter: blur(40px);
  animation: breathe-slow 7s ease-in-out infinite;
  pointer-events: none;
}
.bigcta h2 {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 156px;
  line-height: 0.92;
  letter-spacing: -0.03em;
  position: relative;
  z-index: 2;
  margin: 0;
}
.bigcta h2 em {
  font-style: italic;
  color: var(--color-clay);
  position: relative;
  display: inline-block;
}
.bigcta h2 em::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 14px;
  height: 3px;
  background: var(--color-clay);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1s cubic-bezier(0.77,0,0.18,1);
}
.bigcta:hover h2 em::after { transform: scaleX(1); }
.bigcta p {
  font-size: 19px;
  color: var(--color-ink-2);
  margin: 36px auto 48px;
  max-width: 580px;
  line-height: 1.65;
  position: relative;
  z-index: 2;
}
.bigcta .cta-row {
  display: inline-flex;
  gap: 14px;
  position: relative;
  z-index: 2;
}
`;
