import type { MetadataRoute } from 'next';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/'},sitemap:'https://raw-holdings-demo.heliophile-selenophile.chatgpt.site/sitemap.xml'}}
