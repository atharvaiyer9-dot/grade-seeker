export const round = (n:number, digits=1) => Number(n.toFixed(digits));
export function calculatePercentage(score:number, possible:number) { return possible <= 0 ? 0 : round((score / possible) * 100, 2); }
export function calculateWeightedGrade(categories:{weight:number; earned:number; possible:number}[]) { const active=categories.filter(c=>c.possible>0); const weight=active.reduce((s,c)=>s+c.weight,0); return weight===0?0:round(active.reduce((s,c)=>s+(c.earned/c.possible)*c.weight,0)/weight*100,2); }
export function calculateProjectedGrade(current:number, futureWeight:number, score:number) { return round(current*(1-futureWeight/100)+score*(futureWeight/100),2); }
export function calculateRequiredScore(current:number,target:number,futureWeight:number) { if(futureWeight<=0)return null; return round((target-current*(1-futureWeight/100))/(futureWeight/100),2); }
const base:{[k:string]:number}={A:4,B:3,C:2,D:1,F:0};
export function calculateGPA(rows:{letter:string;courseType:string;credits:number}[], weighted=false) { const points=rows.reduce((s,r)=>{const p=base[r.letter]??0; return s+(p+(weighted?(r.courseType==="AP"?1:r.courseType==="Honors"?.5:0):0))*r.credits},0); const credits=rows.reduce((s,r)=>s+r.credits,0); return credits?round(points/credits,2):0; }
export const calculateSemesterGPA=calculateGPA; export const calculateCumulativeGPA=calculateGPA;
