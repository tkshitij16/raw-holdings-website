import type { MetadataRoute } from 'next';
export default function sitemap():MetadataRoute.Sitemap{const base='https://raw-holdings-demo.heliophile-selenophile.chatgpt.site';return ['','/capabilities','/past-performance','/about','/contact','/capability-statement','/accessibility','/privacy'].map(path=>({url:base+path,lastModified:new Date()}))}
