import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { configureToolEnvironment } from './tool-environment.mjs';
configureToolEnvironment(process.cwd());
const config='dist/server/wrangler.json';
if(!existsSync(config))throw new Error('Run pnpm build before applying local migrations.');
const args=['--import','./scripts/sites-env.mjs','./node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config',config,'--persist-to','.wrangler/state'];
function run(extra){const result=spawnSync(process.execPath,[...args,...extra],{stdio:'inherit'});if(result.error)throw result.error;if(result.status!==0)process.exit(result.status??1);}
run(['--command','CREATE TABLE IF NOT EXISTS _designo_local_migrations (name TEXT PRIMARY KEY, hash TEXT NOT NULL);']);
// Let SQLite own migration state, so deleting the local DB also resets migration tracking.
for(const file of readdirSync('drizzle').filter(f=>f.endsWith('.sql')).sort()){
 const hash=createHash('sha256').update(readFileSync(path.join('drizzle',file))).digest('hex');
 const query=spawnSync(process.execPath,[...args,'--command',`SELECT hash FROM _designo_local_migrations WHERE name = '${file.replaceAll("'","''")}';`,'--json'],{encoding:'utf8'});
 if(query.error)throw query.error;if(query.status!==0){process.stderr.write(query.stderr);process.exit(query.status??1);}
 const result=JSON.parse(query.stdout.slice(query.stdout.indexOf('[')));const prior=result[0]?.results?.[0]?.hash;
 if(prior===hash){console.log(`Already applied: ${file}`);continue;}if(prior)throw new Error(`Applied migration changed: ${file}`);
 run(['--file',`drizzle/${file}`]);run(['--command',`INSERT INTO _designo_local_migrations (name,hash) VALUES ('${file.replaceAll("'","''")}','${hash}');`]);
}
console.log('Local database is ready.');
