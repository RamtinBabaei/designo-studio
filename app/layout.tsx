import type { Metadata } from 'next';
import { Header, Footer, Motion } from '@/components/designo/site-shell';
import './globals.css';
export const metadata: Metadata = {
 title: { default: 'Designo — Thoughtful design. Lasting impact.', template: '%s | Designo' },
 description: 'Designo is a creative studio for thoughtful websites, intuitive apps, and distinctive brand identities. Explore our work and start a conversation.',
 icons: { icon: '/favicon.svg' },
 openGraph: { title: 'Designo — Thoughtful design. Lasting impact.', description: 'Web design, app design, and visual identities with purpose.', type: 'website', images: [{url:'/og-image.jpg', width:1110, height:630}] },
 robots: { index: true, follow: true },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
 return <html lang="en"><head><link rel="preload" href="/fonts/jost-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="preload" href="/fonts/jost-500.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body><a className="skip-link" href="#main-content">Skip to content</a><Header />{children}<Footer /><Motion /></body></html>;
}
