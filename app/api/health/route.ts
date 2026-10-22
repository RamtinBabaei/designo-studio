import { env } from 'cloudflare:workers';
export const dynamic='force-dynamic';
export async function GET(){try{if(!env.DB)throw new Error('Unavailable');await env.DB.prepare('SELECT id FROM inquiries LIMIT 1').first();return Response.json({status:'ok',database:'ready'},{headers:{'Cache-Control':'no-store'}});}catch{return Response.json({status:'unavailable',database:'unavailable'},{status:503,headers:{'Cache-Control':'no-store'}});}}
