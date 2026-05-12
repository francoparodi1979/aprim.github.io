import Link from "next/link";

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
            VERITAS · Madison Heights, Michigan
            <br />
            27483 Dequindre Rd. Suite 304, Madison Heights, MI 48071
            <br />
            (586) 980-1296 · info@aprimresearch.com
          </div>
        </div>
        <div>
          <h5>Research</h5>
          <ul>
            <li>
              <Link href="/studies">Active studies</Link>
            </li>
            <li>
              <Link href="/about">Methodology</Link>
            </li>
            <li>
              <Link href="/about">Publications</Link>
            </li>
            <li>
              <Link href="/about">Data governance</Link>
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
              <Link href="/contact">For sponsors</Link>
            </li>
            <li>
              <Link href="/patients#faq">FAQ</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li>
              <a href="tel:+15869801296">(586) 980-1296</a>
            </li>
            <li>
              <a href="mailto:info@aprimresearch.com">info@aprimresearch.com</a>
            </li>
            <li>
              <Link href="/contact">Visit us</Link>
            </li>
            <li>
              <Link href="/contact">Careers</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="f-bottom">
        <div>© 2026 VERITAS PLLC · GCP · FDA-inspected</div>
        <div>Privacy · Terms · Accessibility</div>
      </div>
    </footer>
  );
}
