import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';

// Exact arithmetic for the five published examples. This checks examples, not general proofs.
const gcd=(a,b)=>b===0n?(a<0n?-a:a):gcd(b,a%b);
const R=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);assert.notEqual(d,0n);if(d<0n){n=-n;d=-d}const g=gcd(n,d);return [n/g,d/g]};
const add=(a,b)=>R(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const neg=a=>[-a[0],a[1]];
const sub=(a,b)=>add(a,neg(b));
const mul=(a,b)=>R(a[0]*b[0],a[1]*b[1]);
const div=(a,b)=>R(a[0]*b[1],a[1]*b[0]);
const pow=(a,n)=>R(a[0]**BigInt(n),a[1]**BigInt(n));
const str=a=>a[1]===1n?String(a[0]):a[0]+'/'+a[1];
const eq=(a,b)=>assert.equal(str(a),str(b));
const le=(a,b)=>a[0]*b[1]<=b[0]*a[1];
const integrate=(coeff,left,right)=>coeff.reduce((sum,c,i)=>add(sum,mul(div(c,R(i+1)),sub(pow(right,i+1),pow(left,i+1)))),R(0));
const square=coeff=>{const r=Array.from({length:2*coeff.length-1},()=>R(0));for(let i=0;i<coeff.length;i++)for(let j=0;j<coeff.length;j++)r[i+j]=add(r[i+j],mul(coeff[i],coeff[j]));return r};
export function verifyExamples(){
 const results=[];
 let x=R(0);for(let n=1;n<=12;n++){x=div(add(x,R(2)),R(3));eq(sub(R(1),x),pow(R(1,3),n))}
 results.push({claim:'C001',passed:true,check:'T(x)=(x+2)/3, x0=0; n=1..12 的误差均精确等于 3^(-n)',x12:str(x),error12:str(sub(R(1),x))});

 const A=[[-1,0],[0,-2]],P=[[1,0],[0,1]],Q=Array.from({length:2},()=>[0,0]);
 for(let i=0;i<2;i++)for(let j=0;j<2;j++)for(let k=0;k<2;k++)Q[i][j]-=A[k][i]*P[k][j]+P[i][k]*A[k][j];
 assert.deepEqual(Q,[[2,0],[0,4]]);
 for(const v of [[1,2],[-3,1],[1,0],[0,1]]){const dV=2*v[0]*(-v[0])+2*v[1]*(-2*v[1]);assert.equal(dV,-(2*v[0]**2+4*v[1]**2));assert(dV<0)}
 results.push({claim:'C002',passed:true,check:'独立矩阵乘法得到 -(AᵀP+PA)=Q；Q 的两个对角元均正，验证四个非零向量的 V 导数',A,P,Q,decay:'V(t) ≤ exp(-2t) V(0)'});

 const monomials=[[0,0],[1,0],[0,1],[2,0],[1,1],[0,2]],v=[0,0,0,1,0,1],gram=v.map(a=>v.map(b=>a*b)),coefficients={};
 for(let i=0;i<6;i++)for(let j=0;j<6;j++){const key=(monomials[i][0]+monomials[j][0])+','+(monomials[i][1]+monomials[j][1]);coefficients[key]=(coefficients[key]||0)+gram[i][j]}
 assert.deepEqual(Object.fromEntries(Object.entries(coefficients).filter(([,v])=>v)),{'4,0':1,'2,2':2,'0,4':1});
 results.push({claim:'C003',passed:true,check:'按完整次数基底的单项式指数逐项展开 zᵀQz；Q=vvᵀ 因而半正定',z:['1','x','y','x²','xy','y²'],Q:gram,polynomial:'x⁴ + 2x²y² + y⁴ = (x²+y²)²'});

 for(const l of [R(0),R(1,2),R(2),R(3),R(8)]){const g=sub(l,div(mul(l,l),R(4)));assert(le(g,R(1)));for(const y of [R(1),R(3,2),R(2),R(5)]){assert(le(g,mul(y,y)));const L=add(mul(y,y),mul(l,sub(R(1),y)));eq(sub(L,g),pow(sub(y,div(l,R(2))),2))}}
 const lambda=R(2),dual=sub(lambda,div(pow(lambda,2),R(4)));eq(dual,R(1));
 results.push({claim:'C004',passed:true,check:'精确配方 L(x,λ)-g(λ)=(x-λ/2)²；测试非负乘子与可行点；λ=2 的下界与 x=1 的目标相等',dual:'g(λ)=λ−λ²/4',optimum:'primal=dual=1'});

 const zero=R(0),half=R(1,2),one=R(1);
 const stiffness=add(integrate([R(4)],zero,half),integrate([R(4)],half,one));
 const load=add(integrate([R(0),R(2)],zero,half),integrate([R(2),R(-2)],half,one));
 const U=div(load,stiffness);eq(U,R(1,8));
 const energyError=add(integrate(square([R(1,4),R(-1)]),zero,half),integrate(square([R(3,4),R(-1)]),half,one));eq(energyError,R(1,48));
 const orthogonality=add(integrate([R(1,2),R(-2)],zero,half),integrate([R(-3,2),R(2)],half,one));eq(orthogonality,R(0));
 const l2Error=add(integrate(square([R(0),R(1,4),R(-1,2)]),zero,half),integrate(square([R(-1,4),R(3,4),R(-1,2)]),half,one));eq(l2Error,R(1,1920));
 results.push({claim:'C005',passed:true,check:'从帽函数积分独立组装刚度、载荷并求解；精确积分能量误差与 Galerkin 正交性',stiffness:str(stiffness),load:str(load),midpoint:str(U),squaredEnergyError:str(energyError),squaredL2Error:str(l2Error),orthogonality:str(orthogonality)});
 // The explicit scalar stability example in B002: -Vdot-epsilon*x²=x²+2x⁴.
 const candidate=[0,0,1],dynamics=[0,-1,0,-1],gradient=candidate.slice(1).map((c,i)=>c*(i+1));
 const negativeDerivative=Array(gradient.length+dynamics.length-1).fill(0);
 for(let i=0;i<gradient.length;i++)for(let j=0;j<dynamics.length;j++)negativeDerivative[i+j]-=gradient[i]*dynamics[j];
 const strictMargin=[0,0,1,0,0];assert.deepEqual(negativeDerivative.map((x,i)=>x-strictMargin[i]),[0,0,1,0,2]);
 const bridgeChecks=[{bridge:'B002',passed:true,check:'f=-x-x³,V=x²,epsilon=1：V-epsilon*x²=0，-Vdot-epsilon*x²=x²+2x⁴。'}];
 return {version:'0.2',date:'2026-11-03',scope:'五个已公开例子及 B002 标量证书的算术与代数复核；不替代一般证明、形式化验证或独立同行审阅。',arithmetic:'BigInt rational arithmetic; integer matrix and polynomial coefficient calculations',results,bridgeChecks};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=verifyExamples();console.log(`Passed ${r.results.length} mathematical example checks with exact arithmetic.`)}
