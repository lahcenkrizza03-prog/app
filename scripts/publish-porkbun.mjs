import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {randomUUID} from 'node:crypto';

// Publish the built site's tree, never the source repository root. No checkout,
// force push, source-index change, credentials or recursive deletion is needed.
const args=process.argv.slice(2),push=args.includes('--push'),refresh=args.includes('--refresh');
const remoteIndex=args.indexOf('--remote'),remote=remoteIndex>=0?args[remoteIndex+1]:'origin';
if(!remote||!/^[A-Za-z0-9_-]+$/.test(remote)||args.some((x,i)=>!['--push','--refresh','--remote'].includes(x)&&i!==remoteIndex+1))throw Error('Usage: node scripts/publish-porkbun.mjs [--push] [--refresh] [--remote github|origin]');
const root=fs.realpathSync(process.cwd()),dist=fs.realpathSync(JSON.parse(fs.readFileSync(path.join(root,'outputs/porkbun-latest.json'),'utf8')).directory),branch='porkbun';
if(!fs.existsSync(path.join(dist,'index.html'))||fs.lstatSync(dist).isSymbolicLink()||fs.realpathSync(dist)!==dist)throw Error('Build the public export first with npm run build:porkbun.');
if(!dist.startsWith(path.join(root,'outputs')+path.sep))throw Error('Static build must stay within the Upip outputs folder');
const forbidden=new Set(['.git','.openai','.agents','node_modules','design-source','scripts','docs','package.json','site.config.json','content.json']);
for(const name of fs.readdirSync(dist))if(forbidden.has(name)||name.startsWith('.env'))throw Error('Source/private material must not be in the published root: '+name);
let fileCount=0;
function inspect(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isSymbolicLink())throw Error('Do not publish linked files: '+p);if(e.isDirectory())inspect(p);else fileCount++;}}
inspect(dist);
function git(argv,options={}){const r=spawnSync('git',['-c','core.autocrlf=false',...argv],{cwd:root,encoding:'utf8',...options});if(r.error)throw r.error;if(r.status!==0)throw Error((r.stderr||r.stdout||'Git command failed').trim());return r.stdout.trim();}
const sourceCommit=git(['rev-parse','HEAD']),remoteUrl=git(['remote','get-url',remote]);
if(!/^(?:git@github\.com:|https:\/\/github\.com\/)lahcenkrizza03-prog\/app(?:\.git)?$/.test(remoteUrl))throw Error('Refusing unexpected publishing remote. Expected lahcenkrizza03-prog/app on GitHub.');
const gitDir=git(['rev-parse','--absolute-git-dir']),index=path.join(gitDir,`porkbun-${randomUUID()}.index`),env={...process.env,GIT_INDEX_FILE:index};
try{
 const workArgs=['--git-dir='+gitDir,'--work-tree='+dist];
 git([...workArgs,'read-tree','--empty'],{cwd:dist,env});
 git([...workArgs,'add','--all','--','.'],{cwd:dist,env});
 const tree=git([...workArgs,'write-tree'],{cwd:dist,env});
 const files=git(['ls-tree','--name-only',tree]).split('\n');
 if(!files.includes('index.html')||!files.includes('images')||files.includes('dist'))throw Error('Published tree must contain index.html and images directly at its root.');
 if(!push){console.log(JSON.stringify({branch,sourceCommit,tree,files:fileCount,pushed:false,rootFiles:files},null,2));}
 else{
  const existing=git(['ls-remote','--heads',remote,'refs/heads/'+branch]).split(/\s+/)[0]||null;
  if(existing)git(['fetch','--no-tags',remote,'refs/heads/'+branch]);
  const unchanged=existing&&git(['rev-parse',existing+'^{tree}'])===tree;
  let commit=existing;
  if(!unchanged||refresh){commit=git(['commit-tree',tree,...(existing?['-p',existing]:[]),'-m','Publish static website from '+sourceCommit]);git(['push',remote,commit+':refs/heads/'+branch]);}
  const verified=git(['ls-remote','--heads',remote,'refs/heads/'+branch]).split(/\s+/)[0]===commit;
  if(!verified)throw Error('Published branch could not be verified.');
  console.log(JSON.stringify({branch,sourceCommit,commit,tree,files:fileCount,pushed:!unchanged||refresh,remoteVerified:true,rootFiles:files},null,2));
 }
}finally{for(const file of [index,index+'.lock'])if(fs.existsSync(file))fs.unlinkSync(file);}
