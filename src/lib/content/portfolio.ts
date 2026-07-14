/**
 * Veritas Clinical Research trial portfolio (13 studies as PI site) — the
 * single source of truth for the home-page grid and the sponsors page.
 * Ordered by how actionable each trial is for a visitor: recruiting first,
 * then active, completed, terminated. Only the two trials with on-site detail
 * pages carry an internal `href`; the rest deep-link to ClinicalTrials.gov.
 */
export type TrialStatus = "recruiting" | "active" | "completed" | "terminated";

export interface Trial {
  nct: string;
  title: string;
  phase: string;
  condition: string;
  status: TrialStatus;
  /** Internal study page for trials that accept referrals; external NCT link otherwise. */
  href?: string;
}

export const STATUS_LABEL: Record<TrialStatus, string> = {
  recruiting: "Recruiting",
  active: "Active · not recruiting",
  completed: "Completed",
  terminated: "Terminated",
};

export const PORTFOLIO: Trial[] = [
  {
    nct: "NCT07190209",
    title: "Lunsekimig vs. placebo in inadequately controlled eosinophilic COPD",
    phase: "Phase III",
    condition: "COPD",
    status: "recruiting",
    href: "/studies/copd-lunsekimig-301",
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
    status: "active",
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
