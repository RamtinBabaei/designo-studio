import Link from 'next/link';
import { asset, offices } from '@/lib/content';
export function CountryLinks() {
 return <section className="country-links" aria-label="Visit our studios" data-reveal>{offices.map(o => <article key={o.id}><div className="illustration-circle"><img src={asset(`shared/desktop/illustration-${o.id}.svg`)} alt="" width="202" height="202" loading="lazy" /></div><h2>{o.country}</h2><Link href={`/locations#${o.id}`} className="button button-peach">See location</Link></article>)}</section>;
}
