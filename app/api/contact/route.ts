import { env } from 'cloudflare:workers';
import { handleContact } from '@/lib/contact/handler';
import { D1ContactRepository } from '@/lib/contact/repository';
export const dynamic='force-dynamic';
export async function POST(request:Request){return handleContact(request,{
 repository:()=>{if(!env.DB)throw new Error('Database binding unavailable');return new D1ContactRepository(env.DB);},
 hashIp:async ip=>{const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(`designo-contact-v1:${ip}`));return Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');},
 log:(code,id)=>console.info(JSON.stringify({event:code,reference:id})),
});}
