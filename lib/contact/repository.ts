import type { ContactRepository } from './handler';
import type { ContactFields } from './validation';
export class D1ContactRepository implements ContactRepository {
 private readonly db:D1Database;
 constructor(db:D1Database){this.db=db;}
 async findByRequestId(requestId:string){return this.db.prepare('SELECT id FROM inquiries WHERE request_id = ?').bind(requestId).first<{id:string}>();}
 async create(data:ContactFields,ipHash:string){
  const id=crypto.randomUUID(),now=Date.now();
  // One atomic write handles both duplicate requests and concurrent rate limits.
  const result=await this.db.prepare(`INSERT INTO inquiries (id,request_id,name,email,phone,service,message,ip_hash,created_at)
    SELECT ?,?,?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM inquiries WHERE ip_hash=? AND created_at>?) < 5
    ON CONFLICT(request_id) DO NOTHING`).bind(id,data.requestId,data.name,data.email,data.phone||null,data.service,data.message,ipHash,now,ipHash,now-15*60*1000).run();
  return result.meta.changes ? {id}:null;
 }
}
