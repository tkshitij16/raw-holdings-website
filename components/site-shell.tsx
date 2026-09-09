import Link from 'next/link';
import { site } from '@/src/content/site';
import { navigation } from '@/src/content/navigation';

function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <img
      className={inverse ? 'brand-logo brand-logo-inverse' : 'brand-logo'}
      src="/media/brand/raw-holdings-logo.svg"
      alt="RAW Holdings LLC"
    />
  );
}

export function Header() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="shell header-grid">
        <Link className="brand" href="/" aria-label="RAW Holdings home">
          <BrandLogo />
        </Link>
        <nav aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="nav-secondary" href="/capability-statement">
            Capability Statement
          </Link>
        </nav>
        <Link className="button button-small" href="/contact">
          Discuss a Project <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <div className="brand inverse">
            <BrandLogo inverse />
          </div>
          <p>{site.location}</p>
          <p>{site.phone}</p>
        </div>
        <div>
          <p className="meta">NAVIGATION</p>
          {[...navigation, { href: '/contact', label: 'Contact' }].map(
            (item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ),
          )}
        </div>
        <div>
          <p className="meta">DOCUMENTS</p>
          <Link href="/capability-statement">Capability Statement</Link>
          <Link href="/accessibility">Accessibility</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
        <div>
          <p className="meta">PROCUREMENT</p>
          <p>MBE / WBE · City of Chicago</p>
          <p>CAGE 9MBN1</p>
          <p>UEI GHWSVQK72EL2</p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 RAW Holdings LLC</span>
        <span>{site.tagline}</span>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
