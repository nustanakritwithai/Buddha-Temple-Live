import type {Point} from './simulation';
export type Mode='EXPLORE'|'REST'|'PRACTICE';
export type PracticeKind='sitting'|'walking'|'observe';
export type Session={mode:Mode;kind:PracticeKind;status:'idle'|'running'|'paused'|'completed';remaining:number;duration:number;returnPosition:Point;walkDirection:1|-1};
export function initialSession(position:Point):Session{return {mode:'EXPLORE',kind:'sitting',status:'idle',remaining:0,duration:0,returnPosition:{...position},walkDirection:1};}
export function enterRest(position:Point):Session{return {...initialSession(position),mode:'REST'};}
export function enterPractice(position:Point,minutes:number,kind:PracticeKind='sitting'):Session {if(![3,5,10,15].includes(minutes))throw new RangeError('Choose 3, 5, 10 or 15 minutes');return {...initialSession(position),mode:'PRACTICE',kind,status:'running',duration:minutes*60,remaining:minutes*60};}
export function pausePractice(s:Session):Session{return s.mode!=='PRACTICE'||s.status==='completed'?s:{...s,status:s.status==='running'?'paused':'running'};}
export function tickPractice(s:Session,dt:number,visible:boolean):Session{if(s.mode!=='PRACTICE'||s.status!=='running'||!visible||!Number.isFinite(dt)||dt<=0)return s;const remaining=Math.max(0,s.remaining-Math.min(.1,dt));return {...s,remaining:remaining<1e-7?0:remaining,status:remaining<1e-7?'completed':'running'};}
export function leaveSession(s:Session){return {session:initialSession(s.returnPosition),position:{...s.returnPosition}};}
export function quietPractice(s:Session){return s.mode==='PRACTICE';}
export function advanceWalking(s:Session,p:Point,dt:number):{session:Session;position:Point}{if(s.mode!=='PRACTICE'||s.kind!=='walking'||s.status!=='running')return {session:s,position:p};const z=Math.max(1.1,Math.min(4.8,p.z+s.walkDirection*.45*Math.max(0,Math.min(.05,dt))));return {session:{...s,walkDirection:z>=4.8?-1:z<=1.1?1:s.walkDirection},position:{x:0,z}};}
