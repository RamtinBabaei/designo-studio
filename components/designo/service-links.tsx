import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { asset, services, type ServiceSlug } from '@/lib/content';
export function ServiceLinks({ exclude, home = false }: { exclude?: ServiceSlug; home?: boolean }) {
 return <section id="our-work" aria-label="Explore our design services" className={`service-links ${home ? 'service-links-home' : ''}`} data-reveal>{services.filter(s => s.slug !== exclude).map(service => <Link className={`service-tile tile-${service.slug}`} href={`/${service.slug}`} key={service.slug}><img src={asset(service.tile)} alt="" loading="lazy" width="541" height={home && service.slug === 'web-design' ? '640' : '308'} /><span className="tile-content"><h2>{service.name}</h2><span className="eyebrow">View projects <ArrowRight size={18} /></span></span></Link>)}</section>;
}
