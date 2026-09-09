import type { Metadata } from 'next';
import { Geist,Geist_Mono } from 'next/font/google';
import './globals.css';
const geistSans=Geist({variable:'--font-geist-sans',subsets:['latin']});
const geistMono=Geist_Mono({variable:'--font-geist-mono',subsets:['latin']});
const origin='https://raw-holdings-demo.heliophile-selenophile.chatgpt.site';
export const metadata:Metadata={metadataBase:new URL(origin),title:{default:'RAW Holdings | Public-Sector Infrastructure Support',template:'%s | RAW Holdings'},description:'Chicago-based infrastructure support for public-sector projects, facilities and project teams.',alternates:{canonical:'/'},openGraph:{title:'RAW Holdings | Public-Sector Infrastructure Support',description:'Vendor coordination, compliance oversight, site operations and project administration for public-sector projects.',type:'website',url:'/',images:[{url:'/og.png',width:1200,height:630,alt:'RAW Holdings — Public-Sector Infrastructure Support'}]},twitter:{card:'summary_large_image',title:'RAW Holdings | Public-Sector Infrastructure Support',description:'Chicago-based infrastructure support for public-sector projects.',images:['/og.png']}};
const organization={ '@context':'https://schema.org','@type':'Organization',name:'RAW Holdings LLC',url:origin,telephone:'+1-779-888-1227',address:{'@type':'PostalAddress',addressLocality:'Chicago',addressRegion:'IL',addressCountry:'US'},areaServed:['Chicago','Midwest'],description:'Infrastructure support for public-sector projects.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization)}}/>{children}</body></html>}
