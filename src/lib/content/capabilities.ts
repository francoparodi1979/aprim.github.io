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
    desc: "Via partner imaging center · across the street from site",
    have: "Same-day scheduling, secure sponsor transfer",
  },
  {
    label: "Specimen",
    title: "Specimen processing & shipping",
    desc: "Central lab processing · on-site -80°C freezer · courier chain",
    have: "Sponsor-qualified for oncology-grade chain of custody",
  },
  {
    label: "Systems",
    title: "EDC · CTMS · eSource-ready",
    desc: "CTMS: Advarra Clinical Conductor · EDC: Veeva · Medidata Rave · Oracle Siebel",
    have: "Part 11 compliant, typical activation 28 days",
  },
  {
    label: "Regulatory",
    title: "Full IRB submission infrastructure",
    desc: "Central IRB workflows · 1572/FDF on file",
    have: "GCP-trained staff · sponsor-monitored",
  },
] as const;
