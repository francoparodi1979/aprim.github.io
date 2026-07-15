import Image from "next/image";
import Link from "next/link";

type NavKey =
  | "home"
  | "about"
  | "contact"
  | "patients"
  | "physicians"
  | "sponsors"
  | "studies";

export function SiteNav({ active }: { active?: NavKey }) {
  const dropdownActive =
    active === "patients" || active === "physicians" || active === "sponsors";
  return (
    <nav className="site-nav">
      <Link href="/" className="brand" aria-label="Veritas Clinical Research — home">
        <Image
          src="/veritas-logo.png"
          alt="Veritas Clinical Research"
          width={744}
          height={606}
          className="brand-logo"
          priority
        />
      </Link>

      <ul>
        <li>
          <Link href="/about" data-on={active === "about" ? "true" : undefined}>
            Who We Are
          </Link>
        </li>
        {/* Touch devices get direct links (hover dropdowns don't work there);
            desktop keeps the dropdown. CSS toggles the two via media query. */}
        <li className="mobile-only">
          <Link href="/patients" data-on={active === "patients" ? "true" : undefined}>
            Patients
          </Link>
        </li>
        <li className="mobile-only">
          <Link href="/physicians" data-on={active === "physicians" ? "true" : undefined}>
            Physicians
          </Link>
        </li>
        <li className="mobile-only">
          <Link href="/sponsors" data-on={active === "sponsors" ? "true" : undefined}>
            Sponsors
          </Link>
        </li>
        <li className="nav-dropdown desktop-only">
          <span className="nav-dropdown-trigger" data-on={dropdownActive ? "true" : undefined}>
            Get Involved
          </span>
          <ul className="nav-dropdown-menu">
            <li>
              <Link href="/patients">
                <b>Patients</b>
                <span>Join a study</span>
              </Link>
            </li>
            <li>
              <Link href="/physicians">
                <b>Medical Professionals</b>
                <span>Refer a patient</span>
              </Link>
            </li>
            <li>
              <Link href="/sponsors">
                <b>Sponsors</b>
                <span>Partner with our site</span>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/contact" data-on={active === "contact" ? "true" : undefined}>
            Contact Us
          </Link>
        </li>
      </ul>

      <Link className="cta-pill" href="/patients">
        <span>See if you qualify →</span>
      </Link>
    </nav>
  );
}
