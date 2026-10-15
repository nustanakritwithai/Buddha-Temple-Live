import type {Point} from './simulation';
export type Seat={id:string;kind:'bench'|'cushion';label:string;position:Point;stand:Point;surfaceY:number;heading:number};
export const SEATS:readonly Seat[]=[
 ...[-1.45,0,1.45].map((x,i)=>({id:`cushion-${i}`,kind:'cushion' as const,label:['เบาะซ้าย','เบาะกลาง','เบาะขวา'][i],position:{x,z:-3.3},stand:{x,z:-2.45},surfaceY:.88,heading:0})),
 ...[-4.6,4.6].map((x,i)=>({id:`bench-${i}`,kind:'bench' as const,label:i?'ม้านั่งขวา':'ม้านั่งซ้าย',position:{x,z:2.57},stand:{x,z:3.55},surfaceY:.765,heading:0}))
];
export function nearestSeat(p:Point,maxDistance=1.2):Seat|null {return SEATS.filter(s=>Math.hypot(s.position.x-p.x,s.position.z-p.z)<=maxDistance||Math.hypot(s.stand.x-p.x,s.stand.z-p.z)<=.75).sort((a,b)=>Math.hypot(a.position.x-p.x,a.position.z-p.z)-Math.hypot(b.position.x-p.x,b.position.z-p.z))[0]??null;}
/** Pose lower surface meets authored geometry rather than compressing the guest. */
export function seatedRootY(seat:Seat){return seat.surfaceY+(seat.kind==='bench'?-.52:-.22);}
export function safeStandPosition(seat:Seat){return {...seat.stand};}
