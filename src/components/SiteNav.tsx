import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/about", label: "Who We Are", key: "about" },
  { href: "/studies", label: "Active Studies", key: "studies" },
  { href: "/patients", label: "For Patients", key: "patients" },
  { href: "/physicians", label: "For Physicians", key: "physicians" },
  { href: "/contact", label: "Contact", key: "contact" },
] as const;

type NavKey = (typeof NAV_LINKS)[number]["key"] | "home";

export function SiteNav({ active }: { active?: NavKey }) {
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
        {NAV_LINKS.map((l) => (
          <li key={l.key}>
            <Link href={l.href} data-on={active === l.key ? "true" : undefined}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div className="nav-status">
          <span className="pulse-dot" aria-hidden />3 studies enrolling
        </div>
        <Link className="cta-pill" href="/patients">
          <span>See if you qualify →</span>
        </Link>
      </div>
    </nav>
  );
}
