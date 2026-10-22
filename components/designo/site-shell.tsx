'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [{ href: '/about', label: 'Our company' }, { href: '/locations', label: 'Locations' }, { href: '/contact', label: 'Contact' }];
export function Logo({ light = false }: { light?: boolean }) {
  return <Link href="/" aria-label="Designo home" className={`logo ${light ? 'logo-light' : ''}`}><span className="logo-symbol" aria-hidden="true" /><span>DESIGNO</span></Link>;
}
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return <><header className="site-header container"><Logo /><button ref={toggle} type="button" className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X size={27} /> : <Menu size={27} />}</button><nav id="main-navigation" aria-label="Main navigation" className={`main-navigation ${open ? 'is-open' : ''}`}>{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</Link>)}</nav></header>{open && <button className="menu-backdrop" aria-label="Close navigation" onClick={() => setOpen(false)} />}</>;
}
export function Footer() {
  const path = usePathname();
  return <footer className={`site-footer ${path === '/contact' ? 'without-cta' : ''}`}>
    {path !== '/contact' && <div className="contact-banner container"><div><h2>Let’s talk about<br />your project</h2><p>Have an idea in mind? Let’s bring it to life.<br className="desktop-break" /> Great things begin with a conversation.</p></div><Link className="button button-white" href="/contact">Get in touch <ArrowUpRight size={17} /></Link></div>}
    <div className="footer-inner container"><div className="footer-top"><Logo light /><nav aria-label="Footer navigation">{links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav></div><div className="footer-bottom"><div><strong>Designo Central Office</strong><p>3886 Wellington Street<br />Toronto, Ontario M9C 3J5</p></div><div><strong>Contact Us (Central Office)</strong><p><a href="tel:+12538638967">P: +1 253-863-8967</a><br /><a href="mailto:contact@designo.co">M: contact@designo.co</a></p></div><a className="creator-link" href="https://github.com/RamtinBabaei" target="_blank" rel="noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/></svg> Built by Ramtin Babaei <ArrowUpRight size={15} /></a></div><div className="footer-credit"><span>Designo · A fictional creative studio</span><span>Portfolio project · Design by <a href="https://www.frontendmentor.io/challenges/designo-multipage-website-G48K6rfUT" target="_blank" rel="noreferrer">Frontend Mentor</a></span></div></div>
  </footer>;
}
export function Motion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
  return null;
}
