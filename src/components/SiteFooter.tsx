import Link from "next/link";

const GOOGLE_REVIEWS_URL = "https://g.page/r/CXp1KrT1sxXjEAI/review";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61595187548086";
const LINKEDIN_URL = "https://www.linkedin.com/company/veritas-clinical-research/";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="f-grid">
        <div>
          <div className="f-brand">
            Where every <em>breath</em> becomes evidence.
          </div>
          <div
            className="mono"
            style={{
              marginTop: 28,
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(242,237,227,0.55)",
            }}
          >
            Veritas Clinical Research · Madison Heights, Michigan
            <br />
            27483 Dequindre Rd. Suite 304, Madison Heights, MI 48071
            <br />
            (586) 210-0330 · fax (586) 210-0380
          </div>
        </div>
        <div>
          <h5>Research</h5>
          <ul>
            <li>
              <Link href="/#studies">Active studies</Link>
            </li>
            <li>
              <Link href="/sponsors">Site capabilities</Link>
            </li>
            <li>
              <Link href="/about">Our team</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5>Visit us</h5>
          <ul>
            <li>
              <Link href="/patients">For patients</Link>
            </li>
            <li>
              <Link href="/physicians">For pulmonologists</Link>
            </li>
            <li>
              <Link href="/sponsors">For sponsors</Link>
            </li>
            <li>
              <Link href="/patients#faq">FAQ</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li className="f-num">
              <a href="tel:+15862100330">Phone: (586) 210-0330</a>
            </li>
            <li className="f-num">
              <span>Fax: (586) 210-0380</span>
            </li>
            <li>
              <Link href="/contact">Leave us a message</Link>
            </li>
            <li>
              <Link href="/contact">Visit us</Link>
            </li>
            <li>
              <Link href="/contact">Careers</Link>
            </li>
            <li className="f-social">
              <a
                className="f-google"
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Review Veritas Clinical Research on Google"
                title="Review us on Google"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.17 3.57-8.81z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.1A12 12 0 0 0 12 24z" />
                  <path fill="#FBBC05" d="M5.27 14.29A7.2 7.2 0 0 1 4.9 12c0-.8.14-1.57.37-2.29v-3.1H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4-3.1z" />
                  <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.1C6.22 6.88 8.87 4.77 12 4.77z" />
                </svg>
              </a>
              <a
                className="f-facebook"
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Veritas Clinical Research on Facebook"
                title="Follow us on Facebook"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path fill="#ffffff" d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.03.28-1.73 1.76-1.73z" />
                </svg>
              </a>
              <a
                className="f-linkedin"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Veritas Clinical Research on LinkedIn"
                title="Follow us on LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path fill="#ffffff" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3V9.75zM9.5 9.75h3.83v1.54h.05c.53-1.01 1.84-2.07 3.79-2.07 4.05 0 4.8 2.66 4.8 6.13V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.91 1.3-1.91 2.63V21h-4V9.75z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="f-bottom">
        <div>© 2026 Veritas Clinical Research PLLC · GCP</div>
        <div>
          <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link>{" "}
          · <Link href="/accessibility">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
