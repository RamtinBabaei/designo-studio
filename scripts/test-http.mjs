import assert from 'node:assert/strict';
const base=new URL(process.argv[2]||'http://localhost:5173');
if(!['localhost','127.0.0.1','terminal.local'].includes(base.hostname))throw new Error('This script writes sample test inquiries. Use a local development URL.');
const pages=[['/','Award-winning'],['/about','World-class talent'],['/locations','Canada'],['/contact','Your message'],['/web-design','Express'],['/app-design','Airfilter'],['/graphic-design','Boxed Water']];
for(const [path,content]of pages){const response=await fetch(new URL(path,base));assert.equal(response.status,200,path);const html=await response.text();assert.ok(html.includes(content),`${path}: page content`);assert.ok(html.includes('<title>'),`${path}: title`);assert.ok(html.includes('Skip to content'),`${path}: skip link`);console.log(`PASS ${path}`);}
assert.equal((await fetch(new URL('/missing-page',base))).status,404);
const health=await fetch(new URL('/api/health',base));assert.equal(health.status,200);console.log('PASS health + migrated database');
const payload={name:'Automated QA Example',email:'qa@example.com',phone:'',service:'web-design',message:'HTTP integration test: every part of this message should be stored.',website:'',requestId:crypto.randomUUID()};
const send=async data=>fetch(new URL('/api/contact',base),{method:'POST',headers:{'content-type':'application/json',origin:base.origin},body:JSON.stringify(data)});
const invalid=await send({...payload,email:'bad'});assert.equal(invalid.status,422);
const response=await send(payload);assert.equal(response.status,201);const first=await response.json();const retry=await send(payload);assert.equal(retry.status,200);assert.equal((await retry.json()).id,first.id);console.log('PASS contact invalid → saved → idempotent retry');
