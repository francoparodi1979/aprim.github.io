import Image from "next/image";
import Link from "next/link";

type NavKey = "home" | "about" | "contact" | "patients" | "physicians" | "studies";

export function SiteNav({ active }: { active?: NavKey }) {
  const dropdownActive = active === "patients" || active === "physicians";
  return (
    <nav className="site-nav">
      <Link href="/" className="brand" aria-label="VERITAS Clinical Research Institute — home">
        <Image
          src="/veritas-logo.png"
          alt="Veritas Clinical Research Institute"
          width={598}
          height={485}
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
        <li className="nav-dropdown">
          <span className="nav-dropdown-trigger" data-on={dropdownActive ? "true" : undefined}>
            Get Involved
          </span>
          <ul className="nav-dropdown-menu">
            <li>
              <Link href="/patients">Patients</Link>
            </li>
            <li>
              <Link href="/physicians">Medical Professionals</Link>
            </li>
            <li>
              <Link href="/contact">Sponsors</Link>
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
