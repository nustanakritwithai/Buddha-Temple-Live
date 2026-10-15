import type {Point} from './simulation';
export const ZONES=[
 {id:'Z01',name:'ทางเข้า',point:{x:0,z:5.8},description:'เลือกเส้นทางหรือขอคำแนะนำเมื่อคุณต้องการ',actions:['welcome','curriculum','schedule']},
 {id:'Z02',name:'ทางจงกรม',point:{x:0,z:3.4},description:'ทางเดินสั้นบนแนวลานหน้า หยุดหรือออกได้ทุกเมื่อ',actions:['walk','curriculum']},
 {id:'Z03',name:'ศาลาและเบาะนั่ง',point:{x:0,z:-3.3},description:'เลือกเบาะ พัก หรือเริ่มฝึกตามสมัครใจ',actions:['practice','rest','curriculum','chant','listen','realm']},
 {id:'Z04',name:'ร่มไม้',point:{x:-4.7,z:.55},description:'แวะอ่านหรือพัก โดยไม่ต้องบันทึกความรู้สึกส่วนตัว',actions:['rest','curriculum']},
 {id:'Z05',name:'สระบัว',point:{x:4.7,z:.85},description:'สังเกตธรรมชาติ หรือดูแลสระแบบจำลอง',actions:['observe','pond']},
 {id:'Z06',name:'สวนและกระถาง',point:{x:-5.08,z:5.65},description:'ดูแลสวนเล็ก ๆ ในรอบที่เปิดหน้า ไม่มีคะแนนหรือภารกิจบังคับ',actions:['water','sweep']},
 {id:'Z07',name:'ม้านั่ง',point:{x:-4.6,z:3.5},description:'นั่งพักได้เฉย ๆ ไม่มีเวลาอัตโนมัติและไม่มีสถิติ',actions:['rest','curriculum','welcome']},
 {id:'Z08',name:'ขอบลานปลอดภัย',point:{x:6.1,z:6.3},description:'ขอบเขตลานช่วยให้ไม่เดินหลุดฉาก ไม่มีบทสนทนาในพื้นที่นี้',actions:['boundary']}
] as const;
export const CUSHIONS=[{x:-1.45,z:-3.3},{x:0,z:-3.3},{x:1.45,z:-3.3}];
export function nearestZone(p:Point){return ZONES.reduce((a,b)=>Math.hypot(a.point.x-p.x,a.point.z-p.z)<=Math.hypot(b.point.x-p.x,b.point.z-p.z)?a:b);}
export function reachableZone(p:Point){const z=nearestZone(p);return Math.hypot(z.point.x-p.x,z.point.z-p.z)<1.65?z:null;}
export function groundHeight(p:Point){if(Math.abs(p.x)<3.5&&p.z<-.6&&p.z> -6.2)return .66;if(Math.abs(p.x)<1.5&&p.z<=.1)return p.z<-.35?.56:p.z<-.1?.35:.18;return .1;}
