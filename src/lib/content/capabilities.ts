/**
 * Site capabilities — shared by the About page (capabilities table) and the
 * Sponsors page. One list, no copy drift.
 */
export const CAPABILITIES = [
  {
    label: "Pulmonary testing",
    title: "Full PFT laboratory",
    desc: "Spirometry · lung volumes · DLCO · 6-minute walk · FeNO",
    have: "Calibrated daily, NBRC-certified technologist",
  },
  {
    label: "Imaging",
    title: "HRCT + chest radiography",
    desc: "Via partner imaging center · 1.2 mi from site",
    have: "Same-day scheduling, secure sponsor transfer",
  },
  {
    label: "Specimen",
    title: "IATA-certified specimen handling",
    desc: "Central lab processing · on-site -80°C freezer · courier chain",
    have: "Sponsor-qualified for oncology-grade chain of custody",
  },
  {
    label: "Systems",
    title: "EDC · CTMS · eSource-ready",
    desc: "Veeva · Medidata Rave · Oracle Siebel — compatible",
    have: "Part 11 compliant, typical activation 28 days",
  },
  {
    label: "Regulatory",
    title: "Full IRB submission infrastructure",
    desc: "Central + local IRB workflows · 1572/FDF on file",
    have: "Zero critical findings last 3 audits",
  },
] as const;
