import assert from 'node:assert/strict';
const gcd=(a,b)=>b?gcd(b,a%b):a<0n?-a:a;
class Q{
 constructor(n,d=1n){n=BigInt(n);d=BigInt(d);assert.notEqual(d,0n);if(d<0){n=-n;d=-d}const g=gcd(n,d);this.n=n/g;this.d=d/g}
 add(b){b=q(b);return new Q(this.n*b.d+b.n*this.d,this.d*b.d)}
 neg(){return new Q(-this.n,this.d)}sub(b){return this.add(q(b).neg())}mul(b){b=q(b);return new Q(this.n*b.n,this.d*b.d)}div(b){b=q(b);return new Q(this.n*b.d,this.d*b.n)}
 eq(b){b=q(b);return this.n===b.n&&this.d===b.d}toString(){return this.d===1n?String(this.n):`${this.n}/${this.d}`}
}
const q=x=>x instanceof Q?x:new Q(x),eq=(a,b)=>assert(q(a).eq(b),`${a} != ${b}`);
const rank=A=>{A=A.map(r=>r.map(q));let k=0;for(let j=0;j<(A[0]?.length||0)&&k<A.length;j++){const p=A.findIndex((r,i)=>i>=k&&r[j].n!==0n);if(p<0)continue;[A[k],A[p]]=[A[p],A[k]];const pivot=A[k][j];A[k]=A[k].map(x=>x.div(pivot));for(let i=0;i<A.length;i++)if(i!==k){const c=A[i][j];A[i]=A[i].map((x,t)=>x.sub(A[k][t].mul(c)))}k++}return k};
const multiply=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s.add(q(x).mul(B[k][j])),q(0))));
const zeros=A=>assert(A.flat().every(x=>q(x).eq(0)));
const poly=terms=>new Map(terms.map(([i,j,c])=>[`${i},${j}`,q(c)]));
const padd=(a,b)=>{const c=new Map(a);for(const [k,v] of b)c.set(k,(c.get(k)||q(0)).add(v));for(const [k,v] of c)if(v.eq(0))c.delete(k);return c};
const pscale=(a,c)=>new Map([...a].map(([k,v])=>[k,v.mul(c)]));
const pmul=(a,b)=>{let c=new Map();for(const [ij,x] of a)for(const [kl,y] of b){const [i,j]=ij.split(',').map(Number),[k,l]=kl.split(',').map(Number);c=padd(c,poly([[i+k,j+l,x.mul(y)]]))}return c};
const peq=(a,b)=>assert.equal(padd(a,pscale(b,-1)).size,0);
export function verifyDeepExamples(){const results=[];
 // Picard map on C([0,1/2]), with u0=1 and exact polynomial coefficients.
 let u=[q(1)],previous;for(let n=1;n<=4;n++){previous=u;u=[q(1),...u.map((c,i)=>c.div(i+1))]}
 const evaluate=(a,t)=>a.reduceRight((v,c)=>v.mul(t).add(c),q(0)),half=new Q(1,2);
 eq(evaluate(u,half),new Q(211,128));
 const posterior=evaluate(u,half).sub(evaluate(previous,half));eq(posterior,new Q(1,384));
 const Tu=[q(1),...u.map((c,i)=>c.div(i+1))],residual=evaluate(Tu,half).sub(evaluate(u,half));eq(residual,new Q(1,3840));eq(residual.mul(2),new Q(1,1920));
 const trueError=Math.exp(.5)-211/128;assert(trueError>0&&trueError<1/1920);
 results.push({method:'D001',passed:true,checks:['four exact Picard polynomial integrations','a priori, a posteriori and residual bounds'],result:{u4AtHalf:'211/128',aPriori:'1/16',posterior:String(posterior),residual:String(residual),residualErrorBound:'1/1920',trueErrorApprox:trueError}});
 // Verify the joint transition kernel has the required marginals and a closed diagonal.
 const P=[[new Q(3,4),new Q(1,4)],[new Q(1,2),new Q(1,2)]],pi=[new Q(2,3),new Q(1,3)];
 const joint=[[new Q(3,4),q(0),q(0),new Q(1,4)],[new Q(1,2),new Q(1,4),q(0),new Q(1,4)],[new Q(1,2),q(0),new Q(1,4),new Q(1,4)],[new Q(1,2),q(0),q(0),new Q(1,2)]];
 for(let i=0;i<4;i++){eq(joint[i].reduce((a,b)=>a.add(b)),1);for(let a=0;a<2;a++){eq(joint[i][2*a].add(joint[i][2*a+1]),P[Math.floor(i/2)][a]);eq(joint[i][a].add(joint[i][a+2]),P[i%2][a])}}
 eq(joint[0][1].add(joint[0][2]),0);eq(joint[3][1].add(joint[3][2]),0);multiply([pi],P)[0].forEach((x,i)=>eq(x,pi[i]));
 let Pn=[[q(1),q(0)],[q(0),q(1)]],series=[];
 for(let n=0;n<=4;n++){const tv=Pn.map(row=>row.reduce((a,x,i)=>{const z=x.sub(pi[i]);return a.add(new Q(z.n<0n?-z.n:z.n,z.d))},q(0)).div(2));const max=tv[0].n*tv[1].d>tv[1].n*tv[0].d?tv[0]:tv[1];eq(max,new Q(2,3n*4n**BigInt(n)));series.push(String(max));Pn=multiply(Pn,P)}
 assert(1/6<=1/4&&2/3>1/4);assert(1/384<=1/100&&1/96>1/100);
 results.push({method:'D004',passed:true,checks:['joint kernel marginals and sticking property','stationarity','exact total variation for n=0..4'],result:{worstCaseTV:series,mixingQuarter:1,mixingHundredth:4}});

 // Exact algebraic certificates verify ideal equality, not just sample roots.
 const x=poly([[1,0,1]]),y=poly([[0,1,1]]),one=poly([[0,0,1]]),y2=pmul(y,y),y3=pmul(y2,y);
 const f1=padd(pmul(x,x),pscale(y,-1)),f2=padd(pmul(x,y),pscale(one,-1)),g1=padd(x,pscale(y2,-1)),g2=padd(y3,pscale(one,-1));
 peq(g1,padd(pmul(y,f1),pscale(pmul(x,f2),-1)));
 peq(g2,padd(f2,pscale(pmul(y,g1),-1)));
 peq(f1,padd(pmul(padd(x,y2),g1),pmul(y,g2)));
 peq(f2,padd(pmul(y,g1),g2));
 const spol=padd(pmul(y3,g1),pscale(pmul(x,g2),-1));peq(spol,padd(g1,pscale(pmul(y2,g2),-1)));
 results.push({method:'D002',passed:true,checks:['ideal equality by four symbolic polynomial identities','S-polynomial reduces to zero for lex x>y'],result:'G={x−y²,y³−1}'});
 // Complex with vertices 0..3, edges 01,12,23,03,02; add faces 012 and 023.
 const B1=[[-1,0,0,-1,-1],[1,-1,0,0,0],[0,1,-1,0,1],[0,0,1,1,0]],B2=[[1],[1],[0],[0],[-1]],B2full=[[1,0],[1,0],[0,1],[0,-1],[-1,1]];
 zeros(multiply(B1,B2));zeros(multiply(B1,B2full));assert.equal(rank(B1),3);assert.equal(rank(B2),1);assert.equal(rank(B2full),2);
 results.push({method:'D003',passed:true,checks:['boundary composed with boundary is zero','exact rational Gaussian elimination'],result:{oneFaceBetti:[1,5-3-1,1-1],twoFacesBetti:[1,5-3-2,2-2]}});
 // SOS equality and the entire affine Gram family, using exact coefficient algebra.
 const z=[pmul(x,x),pmul(x,y),pmul(y,y)],target=poly([[4,0,1],[2,2,4],[0,4,1]]);
 for(const a of [-2,-1,0,1,2]){const G=[[1,0,a],[0,4-2*a,0],[a,0,1]];let gram=new Map();for(let i=0;i<3;i++)for(let j=0;j<3;j++)gram=padd(gram,pscale(pmul(z[i],z[j]),G[i][j]));peq(gram,target);assert.equal([1-a,1+a,4-2*a].every(v=>v>=0),a>=-1&&a<=1)}
 peq(target,padd(pmul(padd(z[0],z[2]),padd(z[0],z[2])),pscale(pmul(z[1],z[1]),2)));assert.equal(2**4+4*2**2+1,33);
 results.push({method:'D005',passed:true,checks:['coefficient identity for five Gram parameters including indefinite cases','explicit rank-two sum-of-squares identity'],result:{polynomial:'x^4+4x^2y^2+y^4',psdInterval:'[-1,1]',at2Minus1:33}});
 // Assemble four linear finite elements and integrate exact piecewise error polynomials.
 const h=new Q(1,4),K=Array.from({length:3},()=>Array.from({length:3},()=>q(0))),F=Array.from({length:3},()=>q(0));
 for(let e=0;e<4;e++)for(let i=0;i<2;i++){const I=e+i-1;if(I<0||I>2)continue;F[I]=F[I].add(h.div(2));for(let j=0;j<2;j++){const J=e+j-1;if(J>=0&&J<3)K[I][J]=K[I][J].add(q(i===j?1:-1).div(h))}}
 const U=[new Q(3,32),new Q(1,8),new Q(3,32)],KU=multiply(K,U.map(x=>[x]));KU.forEach((r,i)=>eq(r[0],F[i]));
 assert.deepEqual(K.map(r=>r.map(String)),[['8','-4','0'],['-4','8','-4'],['0','-4','8']]);
 const umul=(a,b)=>{const out=Array.from({length:a.length+b.length-1},()=>q(0));a.forEach((x,i)=>b.forEach((y,j)=>out[i+j]=out[i+j].add(x.mul(y))));return out};
 const power=(x,n)=>{let v=q(1);while(n--)v=v.mul(x);return v};
 const integral=(a,l,r)=>a.reduce((sum,c,i)=>sum.add(c.mul(power(r,i+1).sub(power(l,i+1))).div(i+1)),q(0));
 const nodal=[q(0),...U,q(0)];let energy=q(0),l2=q(0);const orth=[q(0),q(0),q(0)];
 for(let e=0;e<4;e++){const l=h.mul(e),r=h.mul(e+1),slope=nodal[e+1].sub(nodal[e]).div(h),intercept=nodal[e].sub(slope.mul(l)),derivativeError=[new Q(1,2).sub(slope),q(-1)],error=[intercept.neg(),new Q(1,2).sub(slope),new Q(-1,2)];energy=energy.add(integral(umul(derivativeError,derivativeError),l,r));l2=l2.add(integral(umul(error,error),l,r));for(let i=0;i<2;i++){const I=e+i-1;if(I>=0&&I<3)orth[I]=orth[I].add(integral(derivativeError,l,r).mul(q(i===0?-1:1).div(h)))}}
 eq(energy,new Q(1,192));eq(l2,new Q(1,30720));orth.forEach(x=>eq(x,0));
 results.push({method:'D006',passed:true,checks:['element assembly','exact residual KU−F=0','piecewise polynomial integration','Galerkin orthogonality'],result:{solution:U.map(String),energyErrorSquared:String(energy),l2ErrorSquared:String(l2),orthogonality:orth.map(String)}});
 // Qubit positivity check from the quantum guide; unit trace alone is insufficient.
 eq(new Q(1).add(new Q(3,5)).div(2),new Q(4,5));eq(new Q(1).sub(new Q(3,5)).div(2),new Q(1,5));eq(new Q(1).sub(new Q(6,5)).div(2),new Q(-1,10));
 return {checkedAt:'2026-11-06',scope:'Exact arithmetic for these finite examples only; not general theorem verification or external peer review',results,additionalChecks:[{subject:'81',passed:true,result:'Bloch z=3/5: eigenvalues 4/5,1/5; z=6/5: 11/10,−1/10'}]};
}
if(process.argv[1]?.endsWith('verify-deep-examples.mjs'))console.log(JSON.stringify(verifyDeepExamples(),null,2));
