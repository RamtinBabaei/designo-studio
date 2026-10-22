import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getService, services } from '@/lib/content';
import { ProjectGrid } from '@/components/designo/project-grid';
import { ServiceLinks } from '@/components/designo/service-links';
type Props = {params: Promise<{service:string}>};
export function generateStaticParams() {return services.map(s=>({service:s.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata> {const s=getService((await params).service);return {title:s?.name || 'Page not found',description:s?.description};}
export default async function ServicePage({params}:Props) {
 const service=getService((await params).service);if(!service)notFound();
 return <main id="main-content" className="container service-page"><section className="page-heading"><span className="eyebrow">Crafted with care. Designed to connect.</span><h1>{service.name}</h1><p>{service.description}</p></section><div className="project-intro"><span className="eyebrow">Selected work</span><span>{String(service.projects.length).padStart(2,'0')} projects · Explore the details <ArrowLabel /></span></div><ProjectGrid service={service}/><div className="section-intro more-work"><span className="eyebrow">There’s more to explore</span><span>Discover our other disciplines</span></div><ServiceLinks exclude={service.slug}/></main>;
}
function ArrowLabel(){return <span aria-hidden="true">↗</span>;}
