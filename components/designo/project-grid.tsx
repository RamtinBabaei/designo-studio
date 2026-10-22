'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';
import { asset, type Service, type Project } from '@/lib/content';
export function ProjectGrid({service}: {service:Service}) {
 const [selected, setSelected] = useState<Project | null>(null);
 const dialog = useRef<HTMLDialogElement>(null);
 const opener = useRef<HTMLButtonElement | null>(null);
 const openProject = (project:Project, button: HTMLButtonElement) => { opener.current=button;setSelected(project);dialog.current?.showModal(); };
 const close = () => { dialog.current?.close();opener.current?.focus(); };
 return <><section className="project-grid" aria-label={`${service.name} projects`}>{service.projects.map((project,i) => <button className="project-card" key={project.name} onClick={e => openProject(project,e.currentTarget)} aria-label={`Explore ${project.name} project`}><div className="project-image"><img src={asset(`${service.slug}/desktop/image-${project.image}.webp`)} alt={`${project.name} ${service.name.toLowerCase()} concept`} loading={i<3?'eager':'lazy'} width="350" height="320" /><span className="project-open" aria-hidden="true"><ArrowUpRight size={22} /></span></div><div className="project-copy"><h2>{project.name}</h2><p>{project.description}</p></div></button>)}</section><dialog ref={dialog} className="project-dialog" aria-labelledby="project-title" onClick={e=>{if(e.target === e.currentTarget)close();}} onClose={()=>opener.current?.focus()}>{selected && <div className="dialog-content"><button className="dialog-close" onClick={close} aria-label="Close project"><X size={22}/></button><img className="dialog-image" src={asset(`${service.slug}/desktop/image-${selected.image}.webp`)} alt={`${selected.name} design concept`} width="350" height="320"/><div className="dialog-copy"><p className="eyebrow">Selected concept · {service.name}</p><h2 id="project-title">{selected.name}</h2><p>{selected.detail}</p><div className="project-tags">{selected.tags.map(tag=><span key={tag}>{tag}</span>)}</div><Link href={`/contact?service=${service.slug}`} className="button button-peach" onClick={close}>Start a similar project <ArrowUpRight size={17}/></Link><p className="concept-note">Illustrative work from the Frontend Mentor Designo challenge.</p></div></div>}</dialog></>;
}
