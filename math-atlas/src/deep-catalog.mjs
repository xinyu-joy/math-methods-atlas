import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=path.join(path.dirname(fileURLToPath(import.meta.url)),'deep');
const batches=fs.readdirSync(dir).filter(f=>f.endsWith('.json')).sort().map(f=>JSON.parse(fs.readFileSync(path.join(dir,f),'utf8')));
export const deepMethods=batches.flatMap(b=>b.methods||[]).sort((a,b)=>a.id.localeCompare(b.id));
export const library=batches.flatMap(b=>b.books||[]);
export const expandedGuides=Object.assign({},...batches.map(b=>b.subjectGuides||{}));
export const retrievalLog=batches.flatMap(b=>b.retrievalLog||[]);
export const releaseDate='2026-11-06';
export const accessLabels={metadata:'仅书目信息',contents:'目录／简介已读',excerpt:'相关正文片段已读',chapter:'相关章节已精读'};
export const deepStats={
  concreteMethods:deepMethods.length,
  familiesWithDeepMethods:new Set(deepMethods.map(d=>d.familyId)).size,
  selectedBooks:library.filter(s=>s.type==='book').length,
  otherSources:library.filter(s=>s.type!=='book').length,
  sourceRecords:library.length,
  booksWithText:library.filter(s=>s.type==='book'&&['excerpt','chapter'].includes(s.access)).length,
  methodsWithText:deepMethods.filter(d=>d.review.textRead).length,
  methodsWithConditions:deepMethods.filter(d=>d.review.hypothesesChecked).length,
  methodsWithExamples:deepMethods.filter(d=>d.review.exampleRecomputed).length,
  sourcesByAccess:library.reduce((a,s)=>{a[s.access]=(a[s.access]||0)+1;return a},{}),
  independentPeerReviews:0
};
export const concretePath=d=>'methods/'+d.familyId.toLowerCase()+'/'+d.slug+'/index.html';
export const sourcePath=s=>'library/'+s.id.toLowerCase()+'/index.html';
