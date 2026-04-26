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
      <Link href="/" className="brand" aria-label="APRIM home">
        <div className="logo-mark">
          <svg viewBox="0 0 40 40" fill="none">
            <circle
              className="breath-ring"
              cx="20"
              cy="20"
              r="18"
              stroke="#0a2e38"
              strokeWidth="1"
            />
            <circle
              className="breath-ring"
              cx="20"
              cy="20"
              r="10"
              stroke="#d07a45"
              strokeWidth="1.2"
              style={{ animationDelay: "0.8s" }}
            />
            <circle cx="20" cy="20" r="3" fill="#d07a45" />
          </svg>
        </div>
        <div className="brand-text">
          APRIM
          <span>Pulmonary Research · Michigan</span>
        </div>
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
