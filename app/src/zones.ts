import type {Point} from './simulation';
export const ZONES=[
 {id:'Z01',name:'ทางเข้า',point:{x:0,z:5.8},description:'เลือกเส้นทางหรือขอคำแนะนำเมื่อคุณต้องการ',actions:['welcome','curriculum','schedule']},
 {id:'Z02',name:'ทางจงกรม',point:{x:0,z:3.4},description:'ทางเดินสั้นบนแนวลานหน้า หยุดหรือออกได้ทุกเมื่อ',actions:['walk','curriculum']},
 {id:'Z03',name:'ศาลาและเบาะนั่ง',point:{x:0,z:-2.2},description:'เลือกเบาะ พัก หรือเริ่มฝึกตามสมัครใจ',actions:['practice','rest','curriculum','chant','listen','realm']},
 {id:'Z04',name:'ร่มไม้',point:{x:-4.7,z:.55},description:'แวะอ่านหรือพัก โดยไม่ต้องบันทึกความรู้สึกส่วนตัว',actions:['rest','curriculum']},
 {id:'Z05',name:'สระบัว',point:{x:4.7,z:.85},description:'สังเกตธรรมชาติ หรือดูแลสระแบบจำลอง',actions:['observe','pond']},
 {id:'Z06',name:'สวนและกระถาง',point:{x:-4.8,z:5.8},description:'ดูแลสวนเล็ก ๆ ในรอบที่เปิดหน้า ไม่มีคะแนนหรือภารกิจบังคับ',actions:['water','sweep']},
 {id:'Z07',name:'ม้านั่ง',point:{x:-4.6,z:3.5},description:'นั่งพักได้เฉย ๆ ไม่มีเวลาอัตโนมัติและไม่มีสถิติ',actions:['rest','curriculum','welcome']},
 {id:'Z08',name:'ขอบลานปลอดภัย',point:{x:6.1,z:6.3},description:'ขอบเขตลานช่วยให้ไม่เดินหลุดฉาก ไม่มีบทสนทนาในพื้นที่นี้',actions:['boundary']}
] as const;
export type Zone=Omit<typeof ZONES[number],'point'>&{point:Point};
export const CUSHIONS=[{x:-1.45,z:-3.3},{x:0,z:-3.3},{x:1.45,z:-3.3}];
export function nearestZone(p:Point){return ZONES.reduce((a,b)=>Math.hypot(a.point.x-p.x,a.point.z-p.z)<=Math.hypot(b.point.x-p.x,b.point.z-p.z)?a:b);}
export function reachableZone(p:Point):Zone|null{if(Math.hypot(p.x-4.6,p.z-3.55)<1.65)return {...ZONES[6],point:{x:4.6,z:3.55}};const z=nearestZone(p);return Math.hypot(z.point.x-p.x,z.point.z-p.z)<1.65?z:null;}
/** V0.6 measured surfaces. Stair ramp is a deliberate smooth proxy over physical treads. */
export function groundHeight(p:Point){
 if(CUSHIONS.some(c=>Math.hypot(c.x-p.x,c.z-p.z)<.4))return .945;
 if(Math.abs(p.x)<3.5&&p.z<=-.66&&p.z> -6.2)return .7085;
 if(Math.abs(p.x)<1.5&&p.z<.35&&p.z>-.66)return .18+(.35-p.z)/1.01*(.7085-.18);
 if(Math.abs(p.z-.925)<.65&&Math.abs(p.x)<6.3)return .18;
 if(Math.abs(p.x)<1.3&&p.z>-.66&&p.z<6.9)return .159;
 return .025;
}
