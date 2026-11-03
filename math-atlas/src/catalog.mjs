import {methods,subjects,snapshotDate} from './data.mjs';
import {aliases,intuitions} from './editorial.mjs';
import {subjectGuides} from './subject-guides.mjs';
import {methodReferences} from './method-references.mjs';
import {claims,bridges} from './verified-claims.mjs';

export const version='0.2';
export {subjectGuides,methodReferences,claims,bridges};
export const records=methods.map((m,i)=>({
  id:m[10],name:m[0],problem:m[1],description:m[2],conditions:m[3],
  guarantee:m[4],limits:m[5],example:m[6],subjects:m[7].split(';'),
  evidence:m[8],source:m[9]||null,aliases:aliases[Number(m[10].slice(1))-1],intuition:intuitions[Number(m[10].slice(1))-1],
  references:methodReferences[m[10]]||[],claimIds:claims.filter(c=>c.methodIds.includes(m[10])).map(c=>c.id),
  bridgeIds:bridges.filter(b=>b.methodIds.includes(m[10])).map(b=>b.id),
  theoremReview:'按具体结论记录；方法族未作整体核验',updated:snapshotDate
}));
export const stats={
  subjects:subjects.length,methods:records.length,
  guides:Object.keys(subjectGuides).length,
  guideApproaches:Object.values(subjectGuides).reduce((n,g)=>n+g.approaches.length,0),
  subjectsWithMethodLinks:subjects.filter(s=>records.some(m=>m.subjects.includes(s[0]))).length,
  methodsWithReferences:records.filter(m=>m.references.length).length,
  referenceEntries:records.reduce((n,m)=>n+m.references.length,0),
  referenceLevels:records.flatMap(m=>m.references).reduce((counts,r)=>{counts[r.reviewLevel]++;return counts},{text:0,contents:0,abstract:0}),
  claims:claims.length,methodsWithClaims:records.filter(m=>m.claimIds.length).length,
  bridges:bridges.length,independentPeerReviews:0
};
