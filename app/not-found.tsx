import Link from 'next/link'; import { PageShell } from '@/components/site-shell';
export default function NotFound(){return <PageShell><main id="main" className="not-found"><div className="shell"><p className="meta">404 / NOT FOUND</p><h1>This route is outside the project map.</h1><Link className="button dark" href="/">Return Home ↗</Link></div></main></PageShell>}
