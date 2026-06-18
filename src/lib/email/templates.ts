/**
 * Plain-string email templates. We intentionally avoid React Email's renderer
 * here to keep the runtime small — these messages are short and internal.
 * Swap in @react-email/components later if marketing-grade designs are needed.
 */

const PRIMARY = "#0f3d4a";
const ACCENT = "#c67c4e";
const BONE = "#f5f1ea";

const wrap = (title: string, body: string) => `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:${BONE};font-family:Inter,system-ui,sans-serif;color:${PRIMARY};">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BONE};padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e6dfd0;">
        <tr><td style="padding:24px 32px;border-bottom:1px solid #efe9da;">
          <div style="font-family:'Instrument Serif',Georgia,serif;font-size:24px;color:${PRIMARY};letter-spacing:-0.01em;">Veritas Clinical Research</div>
          <div style="font-size:11px;color:${ACCENT};letter-spacing:0.18em;text-transform:uppercase;margin-top:4px;">${escapeHtml(
  title
)}</div>
        </td></tr>
        <tr><td style="padding:24px 32px;font-size:14px;line-height:1.6;">${body}</td></tr>
        <tr><td style="padding:16px 32px;border-top:1px solid #efe9da;font-size:11px;color:#6b7a7e;">
          Veritas Clinical Research · This message contains confidential research correspondence.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | undefined | null): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 12px 6px 0;color:#6b7a7e;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;width:140px;">${escapeHtml(
    label
  )}</td>
    <td style="padding:6px 0;font-size:14px;color:${PRIMARY};">${escapeHtml(String(value))}</td>
  </tr>`;
}

function detailsTable(rows: Array<[string, string | undefined | null]>): string {
  return `<table width="100%" cellpadding="0" cellspacing="0">${rows
    .map(([k, v]) => row(k, v))
    .join("")}</table>`;
}

/* -------------------------- internal notifications ------------------------ */

export interface InquiryEmailData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  condition: string;
  studySlug?: string | null;
  message?: string | null;
}

export function renderInquiryNotification(data: InquiryEmailData) {
  const subject = `New patient inquiry — ${data.firstName} ${data.lastName}`;
  const body = `
    <p style="margin:0 0 16px 0;">A new patient inquiry was submitted on veritasclinical.org.</p>
    ${detailsTable([
      ["Name", `${data.firstName} ${data.lastName}`],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Condition", data.condition],
      ["Study", data.studySlug],
      ["Message", data.message],
      ["Submission ID", data.id],
    ])}
    <p style="margin:24px 0 0 0;font-size:12px;color:#6b7a7e;">
      Reply directly to this email to reach the patient.
    </p>
  `;
  return { subject, html: wrap("Patient inquiry", body) };
}

export interface PrescreenEmailData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dobYear: number;
  studySlug: string;
  condition: string;
  answers: Record<string, unknown>;
}

export function renderPrescreenNotification(data: PrescreenEmailData) {
  const subject = `Pre-screen — ${data.studySlug} — ${data.firstName} ${data.lastName}`;
  const answersHtml = Object.entries(data.answers)
    .map(
      ([k, v]) =>
        `<tr>
          <td style="padding:4px 12px 4px 0;font-size:12px;color:#6b7a7e;width:200px;vertical-align:top;">${escapeHtml(
            k
          )}</td>
          <td style="padding:4px 0;font-size:13px;color:${PRIMARY};">${escapeHtml(
          String(v ?? "")
        )}</td>
        </tr>`
    )
    .join("");
  const body = `
    <p style="margin:0 0 16px 0;">A pre-screening response was submitted for <strong>${escapeHtml(
      data.studySlug
    )}</strong>.</p>
    ${detailsTable([
      ["Name", `${data.firstName} ${data.lastName}`],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Year of birth", String(data.dobYear)],
      ["Condition", data.condition],
      ["Study", data.studySlug],
      ["Submission ID", data.id],
    ])}
    <h3 style="margin:24px 0 8px 0;font-family:'Instrument Serif',Georgia,serif;color:${PRIMARY};font-weight:400;">Pre-screen answers</h3>
    <table width="100%" cellpadding="0" cellspacing="0">${answersHtml}</table>
  `;
  return { subject, html: wrap("Pre-screening response", body) };
}

export interface ContactEmailData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  topic: string;
  message: string;
}

export function renderContactNotification(data: ContactEmailData) {
  const subject = `Contact form — ${data.topic} — ${data.name}`;
  const body = `
    <p style="margin:0 0 16px 0;">New contact submission via veritasclinical.org.</p>
    ${detailsTable([
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Organization", data.organization],
      ["Topic", data.topic],
      ["Submission ID", data.id],
    ])}
    <h3 style="margin:24px 0 8px 0;font-family:'Instrument Serif',Georgia,serif;color:${PRIMARY};font-weight:400;">Message</h3>
    <p style="white-space:pre-wrap;margin:0;">${escapeHtml(data.message)}</p>
  `;
  return { subject, html: wrap("Contact form", body) };
}

export interface ReferralEmailData {
  id: string;
  referringName: string;
  referringEmail: string;
  referringPhone?: string | null;
  referringOrganization?: string | null;
  npi?: string | null;
  patientInitials?: string | null;
  patientCondition: string;
  studySlug?: string | null;
  notes: string;
}

export function renderReferralNotification(data: ReferralEmailData) {
  const subject = `Physician referral — ${data.referringName}${
    data.studySlug ? ` — ${data.studySlug}` : ""
  }`;
  const body = `
    <p style="margin:0 0 16px 0;">A physician submitted a patient referral.</p>
    ${detailsTable([
      ["Referring clinician", data.referringName],
      ["Email", data.referringEmail],
      ["Phone", data.referringPhone],
      ["Organization", data.referringOrganization],
      ["NPI", data.npi],
      ["Patient initials", data.patientInitials],
      ["Patient condition", data.patientCondition],
      ["Study", data.studySlug],
      ["Submission ID", data.id],
    ])}
    <h3 style="margin:24px 0 8px 0;font-family:'Instrument Serif',Georgia,serif;color:${PRIMARY};font-weight:400;">Clinical context</h3>
    <p style="white-space:pre-wrap;margin:0;">${escapeHtml(data.notes)}</p>
    <p style="margin:24px 0 0 0;font-size:12px;color:#6b7a7e;">
      Reply directly to this email to reach the referring clinician.
    </p>
  `;
  return { subject, html: wrap("Physician referral", body) };
}

/* ----------------------------- confirmations ------------------------------ */

export function renderInquiryConfirmation(data: { firstName: string }) {
  const subject = "We received your message — Veritas Clinical Research";
  const body = `
    <p style="margin:0 0 16px 0;">Hi ${escapeHtml(data.firstName)},</p>
    <p style="margin:0 0 16px 0;">Thank you for reaching out to Veritas Clinical Research. A member of our research team will be in touch within one to two business days.</p>
    <p style="margin:0 0 16px 0;">If your matter is urgent, or you have questions about an active study, please call our office at (XXX) XXX-XXXX.</p>
    <p style="margin:24px 0 0 0;">— The Veritas Clinical Research team</p>
  `;
  return { subject, html: wrap("Thank you", body) };
}

export function renderPrescreenConfirmation(data: { firstName: string; studySlug: string }) {
  const subject = "Your pre-screening was received — Veritas Clinical Research";
  const body = `
    <p style="margin:0 0 16px 0;">Hi ${escapeHtml(data.firstName)},</p>
    <p style="margin:0 0 16px 0;">We received your pre-screening for the study <strong>${escapeHtml(
      data.studySlug
    )}</strong>. A research coordinator will review your responses and reach out within two business days to discuss next steps and, if you appear to be a good fit, schedule an in-person screening visit.</p>
    <p style="margin:0 0 16px 0;">Please note that this pre-screening alone does not enroll you in the study — final eligibility is determined at the screening visit.</p>
    <p style="margin:24px 0 0 0;">— The Veritas Clinical Research team</p>
  `;
  return { subject, html: wrap("Pre-screening received", body) };
}

export function renderContactConfirmation(data: { name: string }) {
  const subject = "We received your message — Veritas Clinical Research";
  const body = `
    <p style="margin:0 0 16px 0;">Hi ${escapeHtml(data.name.split(" ")[0] || data.name)},</p>
    <p style="margin:0 0 16px 0;">Thanks for getting in touch. We'll route your message to the right person and respond within one to two business days.</p>
    <p style="margin:24px 0 0 0;">— The Veritas Clinical Research team</p>
  `;
  return { subject, html: wrap("Thanks for reaching out", body) };
}
