'use client';
import { useState } from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { asset, type offices } from '@/lib/content';
type Office=(typeof offices)[number];
export function OfficeMap({office}:{office:Office}) {
 const [interactive,setInteractive]=useState(false);
 const url=`https://www.openstreetmap.org/export/embed.html?bbox=${office.bbox}&layer=mapnik&marker=${office.lat},${office.lng}`;
 return <div className="office-map">{interactive?<><iframe title={`Interactive map of ${office.country} studio area`} src={url} loading="lazy" referrerPolicy="no-referrer"/><button className="map-static-toggle" onClick={()=>setInteractive(false)}>Close interactive map</button></>:<><img src={asset(`locations/desktop/image-map-${office.id}.webp`)} alt={`Map showing the ${office.country} studio area`} width="350" height="326" loading="lazy"/><button className="map-activate" onClick={()=>setInteractive(true)}><MapPin size={15}/> Explore map <ArrowUpRight size={15}/></button></>}</div>;
}
