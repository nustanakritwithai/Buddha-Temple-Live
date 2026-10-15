import type { Point } from './simulation';
export const PLACES = [
 {id:'pond',name:'ริมสระบัว',action:'ชมสระบัว',position:{x:4.7,z:.85},radius:1.35,text:'สระเล็ก ๆ มีดอกบัวอยู่เหนือผิวน้ำ ลองมองสีและรูปทรงรอบตัว โดยไม่ต้องรีบไปไหน'},
 {id:'tree',name:'ใต้ร่มไม้',action:'แวะร่มไม้',position:{x:-4.7,z:.55},radius:1.25,text:'ต้นไม้ในลานนี้เป็นแบบจำลองที่ได้แรงบันดาลใจจากต้นโพธิ์ แวะมองใบไม้หรือพักตามจังหวะของคุณ'},
 {id:'pavilion',name:'หน้าศาลา',action:'รู้จักศาลา',position:{x:0,z:1.2},radius:1.6,text:'ศาลาที่ได้แรงบันดาลใจจากสถาปัตยกรรมไทยเป็นจุดหมายกลางสวน รุ่นทดลองนี้ให้เดินเล่นบริเวณลานด้านนอกได้'}
] as const;
export function nearbyPlace(p:Point){return PLACES.filter(v=>Math.hypot(v.position.x-p.x,v.position.z-p.z)<=v.radius).sort((a,b)=>Math.hypot(a.position.x-p.x,a.position.z-p.z)-Math.hypot(b.position.x-p.x,b.position.z-p.z))[0]??null;}
export type RestTimer={duration:number;remaining:number;status:'idle'|'running'|'completed'|'stopped'};
export function idleTimer():RestTimer{return {duration:0,remaining:0,status:'idle'};}
export function startTimer(minutes:number):RestTimer {if(![1,3,5].includes(minutes))throw new RangeError('Choose 1, 3 or 5 minutes');return {duration:minutes*60,remaining:minutes*60,status:'running'};}
export function tickTimer(timer:RestTimer,dt:number,active:boolean):RestTimer {if(timer.status!=='running'||!active||!Number.isFinite(dt)||dt<=0)return timer;const remaining=Math.max(0,timer.remaining-Math.min(dt,.1));return {...timer,remaining:remaining<1e-8?0:remaining,status:remaining<1e-8?'completed':'running'};}
export function stopTimer(timer:RestTimer):RestTimer{return timer.status==='running'?{...timer,status:'stopped'}:timer;}
export type Activity={id:number;second:number;text:string};
export function appendActivity(log:readonly Activity[],second:number,text:string):Activity[]{return [...log,{id:(log.at(-1)?.id??0)+1,second:Math.max(0,Math.floor(second)),text}].slice(-8);}
export type Motion={heading:number;distance:number;walking:boolean};
export function updateMotion(previous:Point,next:Point,motion:Motion):Motion {const dx=next.x-previous.x,dz=next.z-previous.z,d=Math.hypot(dx,dz);return d>1e-6?{heading:Math.atan2(dx,dz),distance:motion.distance+d,walking:true}:{...motion,walking:false};}
export function formatTime(seconds:number){const n=Math.max(0,Math.ceil(seconds));return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`;}
