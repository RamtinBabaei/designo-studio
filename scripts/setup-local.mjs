import { spawnSync } from 'node:child_process';
function run(args){const result=spawnSync(process.execPath,args,{stdio:'inherit'});if(result.error)throw result.error;if(result.status!==0)process.exit(result.status??1);}
run(['scripts/run-framework.mjs','build']);run(['scripts/migrate-local.mjs']);
console.log('\nReady. Run pnpm dev, then open the local URL printed in your terminal.');
