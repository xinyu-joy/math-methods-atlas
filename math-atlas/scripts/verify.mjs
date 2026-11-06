import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
async function walk(dir){const list=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())list.push(...await walk(p));else list.push(p)}return list}
const files=await walk(root),htmlFiles=files.filter(f=>f.endsWith('.html'));

const atlas=JSON.parse(await fs.readFile(path.join(root,'downloads/atlas.json'),'utf8'));
assert.equal(atlas.subjects.length,63);assert.equal(atlas.methods.length,30);
assert.equal(new Set(atlas.methods.map(m=>m.id)).size,30);
assert.equal(atlas.version,'0.3');
assert.equal(atlas.deepMethods.length,6);
assert.equal(htmlFiles.length,113+3+atlas.deepMethods.length+atlas.library.length,'Expected legacy pages plus concrete index, library, coverage and detail pages');
assert.equal(atlas.stats.guides,27);
assert.equal(atlas.stats.subjectsWithMethodLinks,43);
assert.equal(atlas.stats.methodsWithReferences,30);
assert.equal(atlas.stats.independentPeerReviews,0);
assert.equal(atlas.claims.length,5);assert.equal(atlas.bridges.length,3);
assert.equal(atlas.methods.filter(m=>m.evidence.startsWith('已核对')).length,3);
assert.equal(atlas.methods.filter(m=>m.theoremReview==='已完成').length,0);
const ids=new Set(atlas.methods.map(m=>m.id));
for(const m of atlas.methods){
 assert(/^M\d{3}$/.test(m.id));assert(m.references.length>0);
 for(const ref of m.references){assert(ref.locator&&ref.supports&&ref.checked&&ref.limitation);assert(['text','contents','abstract'].includes(ref.reviewLevel));assert.equal(new URL(ref.url).protocol,'https:');}
}
const formerEmpty=['00','01','06','08','16','17','19','26','28','31','33','39','51','54','78','80','82','83','85','97'];
for(const code of formerEmpty)assert(atlas.subjects.find(s=>s.code===code)?.guide);
for(const s of atlas.subjects){
 const matches=atlas.methods.filter(m=>m.subjects.includes(s.code));
 assert(s.guide||matches.length>0,'No readable content for '+s.code);
 if(s.guide){const g=s.guide;assert(g.overview&&g.boundaries);assert(g.questions.length>=3&&g.branches.length>=3&&g.approaches.length>=3&&g.reading.length>=1&&g.next.length);
  for(const a of g.approaches){assert(a.name&&a.purpose&&a.conditions);a.methodIds.forEach(id=>assert(ids.has(id),'Unknown guide method '+id));}
  for(const r of g.reading){assert(r.locator&&r.note);assert.equal(new URL(r.url).protocol,'https:');}
 }
}
for(const c of atlas.claims){assert(c.assumptions.length&&c.proof.length&&c.sources.length&&c.review.scope&&c.review.notCovered);c.methodIds.forEach(id=>assert(ids.has(id)));}
for(const b of atlas.bridges){assert(b.conditions.length&&b.sources.length&&b.openQuestion&&b.status);b.methodIds.forEach(id=>assert(ids.has(id)));}
const verification=JSON.parse(await fs.readFile(path.join(root,'downloads/verification-results.json'),'utf8'));
assert.deepEqual(verification.results.map(r=>r.claim),atlas.claims.map(c=>c.id));
assert(verification.results.every(r=>r.passed));
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
for(const m of atlas.methods){const html=await fs.readFile(path.join(root,'methods',m.id.toLowerCase(),'index.html'),'utf8');assert(html.includes(m.name));assert(html.includes('data-copy-link'));assert(html.includes('文献位置'));assert(html.includes('id="verification"'));}
for(const code of formerEmpty){const html=await fs.readFile(path.join(root,'subjects',code,'index.html'),'utf8');assert(html.includes('id="approaches"')&&html.includes('id="reading"'));assert(!html.includes('这个方向的方法条目还在等待补充'));}
console.log(`Verified ${htmlFiles.length} pages and ${localLinks} internal references. Legacy URLs preserved; 27 subject guides, 6 concrete methods, and source library checked.`);

const requiredSections=['problem','statement','mechanism','workflow','example','limits','comparison','transfer','frontier'];
const sourceIds=new Set(atlas.library.map(s=>s.id));assert.equal(sourceIds.size,atlas.library.length);
const sourceKeys=new Set();
for(const s of atlas.library){assert(['book','notes','paper'].includes(s.type));assert(['metadata','contents','excerpt','chapter'].includes(s.access));assert(s.authors.length&&s.title&&s.readScope&&s.reason&&s.limitations&&s.locators.length&&s.checkedAt);assert.equal(new URL(s.url).protocol,'https:');if(s.openUrl)assert.equal(new URL(s.openUrl).protocol,'https:');const key=s.doi||s.title+'|'+s.edition;assert(!sourceKeys.has(key),'Duplicate source edition '+key);sourceKeys.add(key)}
for(const d of atlas.deepMethods){assert(ids.has(d.familyId));assert(d.keywords.length>=8&&d.keywords.length<=15);assert(d.keywords.filter(k=>k.definition).length>=3);assert(d.reading.length>=3);assert(d.review.gaps.length&&d.review.scope);assert.deepEqual([...d.sections.map(s=>s.id)].sort(),[...requiredSections].sort());for(const s of d.sections){assert(s.paragraphs?.length||s.steps?.length);(s.sourceIds||[]).forEach(id=>assert(sourceIds.has(id),'Unknown source '+id))}d.reading.forEach(r=>assert(sourceIds.has(r.sourceId)));d.subjects.forEach(c=>assert(atlas.subjects.some(s=>s.code===c)));const body=d.sections.map(s=>[...(s.paragraphs||[]),...(s.steps||[])].join('')).join('');assert(body.length>=1500,'Insufficient explanation '+d.id);const html=await fs.readFile(path.join(root,'methods',d.familyId.toLowerCase(),d.slug,'index.html'),'utf8');assert(html.includes('katex-mathml'),'No rendered accessible math '+d.id);for(const id of requiredSections)assert(html.includes('id="'+id+'"'));assert(!html.includes('katex-error'))}
const deepVerification=JSON.parse(await fs.readFile(path.join(root,'downloads/deep-verification.json'),'utf8'));assert.deepEqual(deepVerification.results.map(r=>r.method).sort(),atlas.deepMethods.map(d=>d.id).sort());assert(deepVerification.results.every(r=>r.passed));
console.log('Deep content schema, source uniqueness, mathematical examples and formula rendering verified.');
