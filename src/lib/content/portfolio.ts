/**
 * Veritas Clinical Research trial portfolio — the single source of truth for
 * the home-page grid, the sponsors table, and every trial count on the site.
 * `PORTFOLIO` is sorted at load time by how actionable each trial is for a
 * visitor (recruiting, upcoming, active, completed, terminated), so entries in
 * `TRIALS` can sit in any order and a status change re-sorts automatically.
 *
 * Statuses are kept in sync with ClinicalTrials.gov by
 * scripts/sync-trial-status.mjs (daily GitHub Action). It only moves a trial
 * forward (recruiting → active → completed/terminated); setting a trial to
 * "recruiting" is always a manual decision, because it means Veritas itself
 * is enrolling. Keep each `status:` on its own line so the script can edit it.
 *
 * Trials not yet registered carry a sponsor `protocol` number and no `nct`;
 * add the NCT once assigned and the card becomes a registry link. Only trials
 * with on-site detail pages carry an internal `href`.
 */
export type TrialStatus = "recruiting" | "upcoming" | "active" | "completed" | "terminated";

export interface Trial {
  /** ClinicalTrials.gov ID. Omit until the sponsor registers the study. */
  nct?: string;
  /** Sponsor protocol number, shown in place of the NCT while it is pending. */
  protocol?: string;
  title: string;
  phase: string;
  condition: string;
  status: TrialStatus;
  /** Internal study page for trials that accept referrals; external NCT link otherwise. */
  href?: string;
}

export const STATUS_LABEL: Record<TrialStatus, string> = {
  recruiting: "Recruiting",
  upcoming: "Not yet recruiting",
  active: "Active · not recruiting",
  completed: "Completed",
  terminated: "Terminated",
};

/** Card/row identifier: the NCT when registered, otherwise the protocol number. */
export function trialId(t: Trial): string {
  return t.nct ?? t.protocol ?? t.title;
}

const TRIALS: Trial[] = [
  {
    nct: "NCT07190209",
    title: "Lunsekimig vs. placebo in inadequately controlled eosinophilic COPD",
    phase: "Phase III",
    condition: "COPD",
    status: "recruiting",
    href: "/studies/copd-lunsekimig-301",
  },
  {
    protocol: "NAL03-302",
    title: "Nalbuphine ER for chronic cough in idiopathic pulmonary fibrosis (OCEAN-2)",
    phase: "Phase III",
    condition: "IPF",
    status: "recruiting",
  },
  {
    nct: "NCT06748053",
    title: "Dose-finding study of an anti-TSLP antibody (GSK5784283) in uncontrolled asthma",
    phase: "Phase II",
    condition: "Asthma",
    status: "active",
    href: "/studies/asthma-gsk5784283-201",
  },
  {
    nct: "NCT05748600",
    title: "Dexpramipexole in adolescents and adults with eosinophilic asthma",
    phase: "Phase III",
    condition: "Asthma",
    status: "active",
  },
  {
    nct: "NCT06208306",
    title: "Long-term safety and tolerability of itepekimab in COPD",
    phase: "Phase III",
    condition: "COPD",
    status: "completed",
  },
  {
    nct: "NCT03953300",
    title: "Benralizumab airway remodeling study in severe eosinophilic asthma",
    phase: "Phase IV",
    condition: "Asthma",
    status: "active",
  },
  {
    nct: "NCT06372496",
    title: "FF/UMEC/VI vs. non-Ellipta usual-care ICS-LABA in uncontrolled asthma",
    phase: "Phase IV",
    condition: "Asthma",
    status: "active",
  },
  {
    nct: "NCT04718389",
    title: "Depemokimab (GSK3511294) vs. mepolizumab or benralizumab in severe eosinophilic asthma",
    phase: "Phase III",
    condition: "Asthma",
    status: "completed",
  },
  {
    nct: "NCT04701983",
    title: "Efficacy, safety, and tolerability of itepekimab (SAR440340/REGN3500) in COPD",
    phase: "Phase III",
    condition: "COPD",
    status: "completed",
  },
  {
    nct: "NCT05326412",
    title: "Mechanistic study of itepekimab on airway inflammation in COPD",
    phase: "Phase II",
    condition: "COPD",
    status: "completed",
  },
  {
    nct: "NCT06335303",
    title: "BI 1819479 for improvement of lung function in idiopathic pulmonary fibrosis (IPF)",
    phase: "Phase II",
    condition: "IPF",
    status: "completed",
  },
  {
    nct: "NCT06280391",
    title: "Itepekimab (anti-IL-33 mAb) proof-of-concept in non-cystic-fibrosis bronchiectasis",
    phase: "Phase II",
    condition: "Bronchiectasis",
    status: "completed",
  },
  {
    nct: "NCT05813288",
    title: "Dexpramipexole in adolescents and adults with severe eosinophilic asthma (EXHALE-3)",
    phase: "Phase III",
    condition: "Asthma",
    status: "terminated",
  },
  {
    nct: "NCT06360094",
    title: "BI 1839100 for cough in idiopathic or progressive pulmonary fibrosis",
    phase: "Phase II",
    condition: "IPF / PPF",
    status: "terminated",
  },
];

const STATUS_ORDER: Record<TrialStatus, number> = {
  recruiting: 0,
  upcoming: 1,
  active: 2,
  completed: 3,
  terminated: 4,
};

/** All trials, most actionable first (stable within a status). */
export const PORTFOLIO: Trial[] = [...TRIALS].sort(
  (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status],
);

export const TRIAL_COUNT = PORTFOLIO.length;
export const RECRUITING_COUNT = PORTFOLIO.filter((t) => t.status === "recruiting").length;

const WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
  "Eighteen", "Nineteen", "Twenty",
];

/** "Fourteen" for 14; falls back to digits past twenty. */
export function countWord(n: number): string {
  return WORDS[n] ?? String(n);
}
