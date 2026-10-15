export type Point = { x: number; z: number };
export const ENTRANCE: Point = { x: 0, z: 5.8 };
const circles = [{x:-4.7,z:-1.8,r:1.95},{x:4.6,z:-1.55,r:2.23},...[-6.9,6.9].flatMap(x=>[-5.6,-3.4,-.4,2.6,5.6].map(z=>({x,z,r:.6}))),...[-5.9,5.9].map(x=>({x,z:4.7,r:.8})),...[-6,6].map(x=>({x,z:-4.6,r:.8})),{x:1.2,z:5.6,r:.45}];
export function walkable(p: Point): boolean {
 return Number.isFinite(p.x)&&Number.isFinite(p.z)&&Math.abs(p.x)<=7.3&&Math.abs(p.z)<=6.8 && (!(Math.abs(p.x)<3.85&&p.z<.55)||(Math.abs(p.x)<1.25&&p.z>=-.8)||(Math.abs(p.x)<2.4&&p.z<=-.6&&p.z>=-5.7)) && !circles.some(c=>Math.hypot(p.x-c.x,p.z-c.z)<c.r) && ![-4.6,4.6].some(x=>Math.abs(p.x-x)<1.4&&Math.abs(p.z-2.6)<.75);
}
export function movePlayer(p:Point, input:Point, dt:number):Point {
 const magnitude=Math.hypot(input.x,input.z);if(!magnitude||!Number.isFinite(magnitude)||!Number.isFinite(dt)||dt<=0)return {...p};
 const distance=2.5*Math.min(.05,dt),steps=Math.max(1,Math.ceil(distance/.035)),scale=distance/Math.max(1,magnitude)/steps;
 const next={...p};for(let i=0;i<steps;i++){const x=next.x+input.x*scale;if(walkable({x,z:next.z}))next.x=x;const z=next.z+input.z*scale;if(walkable({x:next.x,z}))next.z=z;}return next;
}
const route=[{x:-2.3,z:5.65,mode:'walking',seconds:0},{x:-5.08,z:5.65,mode:'watering',seconds:5},{x:-2.3,z:5.65,mode:'walking',seconds:0},{x:-3.1,z:2.7,mode:'resting',seconds:7}] as const;
export type Gardener={position:Point;phase:number;wait:number;mode:'walking'|'watering'|'resting';heading:number};
export function initialGardener():Gardener{return {position:{x:-1.9,z:3.65},phase:0,wait:0,mode:'walking',heading:0};}
export function stepGardener(state:Gardener,dt:number):Gardener {
 const s={...state,position:{...state.position}};dt=Math.max(0,Math.min(.05,dt));const target=route[s.phase];
 if(s.wait>0){s.wait=Math.max(0,s.wait-dt);if(s.wait===0){s.phase=(s.phase+1)%route.length;s.mode='walking';}return s;}
 const dx=target.x-s.position.x,dz=target.z-s.position.z,d=Math.hypot(dx,dz),step=.65*dt;
 if(d<=step){s.position={x:target.x,z:target.z};s.mode=target.mode;s.wait=target.seconds;if(!s.wait)s.phase=(s.phase+1)%route.length;}else{s.position.x+=dx/d*step;s.position.z+=dz/d*step;s.heading=Math.atan2(dx,dz);s.mode='walking';}return s;
}
export type LocalSave={version:1;position:Point;reducedMotion:boolean};
export function parseSave(raw:string|null):LocalSave|null {try {const s=JSON.parse(raw??'null');return s?.version===1&&typeof s.reducedMotion==='boolean'&&s.position&&walkable(s.position)?s:null;}catch{return null;}}
