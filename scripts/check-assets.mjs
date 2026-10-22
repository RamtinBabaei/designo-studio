import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
const root=path.resolve('public/assets');let rasterBytes=0;let rasterCount=0;
function visit(directory){for(const name of readdirSync(directory)){const file=path.join(directory,name);if(statSync(file).isDirectory())visit(file);else if(name.endsWith('.webp')){const bytes=statSync(file).size;rasterBytes+=bytes;rasterCount++;if(bytes>150000)throw new Error(`Image exceeds 150kB: ${file}`);}}}
visit(root);
for(const file of ['public/fonts/jost-400.woff2','public/fonts/jost-500.woff2','public/fonts/jost-600.woff2','public/favicon.svg','public/og-image.jpg']){if(!existsSync(file)||statSync(file).size===0)throw new Error(`Missing asset: ${file}`);}
const expected=['home/desktop/image-hero-phone','home/desktop/image-web-design-large','home/desktop/image-app-design','home/desktop/image-graphic-design',...['express','transfer','photon','builder','blogr','camp'].map(n=>`web-design/desktop/image-${n}`),...['airfilter','eyecam','faceit','todo','loopstudios'].map(n=>`app-design/desktop/image-${n}`),...['change','boxed-water','science'].map(n=>`graphic-design/desktop/image-${n}`),...['desktop','tablet','mobile'].flatMap(d=>['about-hero','world-class-talent','real-deal'].map(n=>`about/${d}/image-${n}`)),...['canada','australia','united-kingdom'].map(n=>`locations/desktop/image-map-${n}`)];
for(const name of expected)if(!existsSync(path.join(root,`${name}.webp`)))throw new Error(`Missing image: ${name}`);
for(const name of ['passionate','resourceful','friendly'])if(!existsSync(path.join(root,`home/desktop/illustration-${name}.svg`)))throw new Error(`Missing illustration: ${name}`);
for(const name of ['canada','australia','united-kingdom'])if(!existsSync(path.join(root,`shared/desktop/illustration-${name}.svg`)))throw new Error(`Missing country: ${name}`);
const css=readFileSync('app/globals.css','utf8');if(!css.includes('prefers-reduced-motion'))throw new Error('Reduced motion styles missing.');
console.log(`Verified ${expected.length} referenced raster images and all illustrations/fonts. ${rasterCount} WebP assets: ${rasterBytes} bytes. Per-image budget: 150 kB.`);
