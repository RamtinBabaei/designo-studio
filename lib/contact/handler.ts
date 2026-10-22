import { validateContact, type ContactFields } from './validation.ts';
export interface ContactRepository { findByRequestId(id:string):Promise<{id:string}|null>; create(data:ContactFields,ipHash:string):Promise<{id:string}|null>; }
export interface ContactDependencies {repository:()=>ContactRepository;hashIp:(ip:string)=>Promise<string>;log?:(code:string,id:string)=>void;}
const json=(data:unknown,status=200,extra:Record<string,string>={})=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...extra}});
export async function handleContact(request:Request,deps:ContactDependencies):Promise<Response>{
 const url=new URL(request.url),origin=request.headers.get('origin');
 if(origin && origin!==url.origin)return json({error:'This request could not be verified.'},403);
 if(request.headers.get('sec-fetch-site')==='cross-site')return json({error:'This request could not be verified.'},403);
 if(!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))return json({error:'Use application/json.'},415);
 if(Number(request.headers.get('content-length') || 0)>12000)return json({error:'Your message is too long.'},413);
 let body:unknown;
 try{
  // Count bytes while reading, including requests without Content-Length.
  const reader=request.body?.getReader();if(!reader)return json({error:'Please complete the form.'},400);
  const chunks:Uint8Array[]=[];let size=0;
  while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>12000){await reader.cancel();return json({error:'Your message is too long.'},413);}chunks.push(value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}body=JSON.parse(new TextDecoder().decode(bytes));
 }catch{return json({error:'Please send a valid form.'},400);}
 if(body && typeof body==='object' && 'website' in body && (body as {website:unknown}).website)return json({error:'This submission could not be accepted.'},400);
 const validation=validateContact(body);
 if(!validation.ok)return json({error:'Please check the highlighted fields.',errors:validation.errors},422);
 try{
  const repository=deps.repository();
  const existing=await repository.findByRequestId(validation.data.requestId);
  if(existing)return json({ok:true,id:existing.id,stored:true},200);
  const ipHash=await deps.hashIp(request.headers.get('cf-connecting-ip')||'local-preview');
  const result=await repository.create(validation.data,ipHash);
  if(!result){const duplicate=await repository.findByRequestId(validation.data.requestId);if(duplicate)return json({ok:true,id:duplicate.id,stored:true});return json({error:'You’ve sent a few messages recently. Please try again in 15 minutes.'},429,{'Retry-After':'900'});}
  deps.log?.('contact.stored',result.id);
  return json({ok:true,id:result.id,stored:true},201);
 }catch{deps.log?.('contact.unavailable',crypto.randomUUID());return json({error:'Your message wasn’t saved. Please try again shortly. Your draft is still here.'},503,{'Retry-After':'30'});}
}
