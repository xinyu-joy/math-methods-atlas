import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
async function walk(dir){const list=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())list.push(...await walk(p));else list.push(p)}return list}
const files=await walk(root),htmlFiles=files.filter(f=>f.endsWith('.html'));
assert.equal(htmlFiles.length,104,'Expected all generated pages');
const atlas=JSON.parse(await fs.readFile(path.join(root,'downloads/atlas.json'),'utf8'));
assert.equal(atlas.subjects.length,63);assert.equal(atlas.methods.length,30);
assert.equal(new Set(atlas.methods.map(m=>m.id)).size,30);
assert.equal(atlas.methods.filter(m=>m.evidence.startsWith('已核对')).length,3);
assert.equal(atlas.methods.filter(m=>m.theoremReview==='已完成').length,0);
let localLinks=0;
for(const file of htmlFiles){
 const html=await fs.readFile(file,'utf8');
 assert(html.includes('lang="zh-CN"'));assert(html.includes('id="main"'));
 assert(!/undefined|\[object Object\]/.test(html),'Unexpected template content '+file);
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const href=match[1].replaceAll('&amp;','&');if(/^(https?:|mailto:|data:)/.test(href))continue;
  const url=new URL(href,'https://preview.example/math-methods-atlas/'+path.relative(root,file).split(path.sep).join('/'));
  assert(url.pathname.startsWith('/math-methods-atlas/'),'Link escaped project subpath: '+href);
  let relative=decodeURIComponent(url.pathname.slice('/math-methods-atlas/'.length));
  if(!relative||relative.endsWith('/'))relative+='index.html';
  const target=path.join(root,relative);assert(files.includes(target),'Missing link '+href+' from '+file);
  if(url.hash&&target.endsWith('.html')){const t=await fs.readFile(target,'utf8');const id=decodeURIComponent(url.hash.slice(1));assert(t.includes('id="'+id+'"'),'Missing anchor '+href)}
  localLinks++;
 }
}
const home=await fs.readFile(path.join(root,'index.html'),'utf8');
assert.equal([...home.matchAll(/data-method="M\d{3}"/g)].length,30);
for(const m of atlas.methods){const html=await fs.readFile(path.join(root,'methods',m.id.toLowerCase(),'index.html'),'utf8');assert(html.includes(m.name));assert(html.includes('data-copy-link'));assert(html.includes(m.theoremReview==='已完成'?'已完成':'待逐条完成'));}
console.log(`Verified ${htmlFiles.length} pages and ${localLinks} internal references under /math-methods-atlas/. All identifiers and evidence counts agree.`);
