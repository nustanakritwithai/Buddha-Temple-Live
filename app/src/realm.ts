import {REALM_PROTOCOL,createRealmSessionId,isTrustedRealmEvent} from './realm-protocol';
export interface RealmAdapter {available:boolean;reason:string;enter(returnToTemple:()=>void,preferences?:{reduceMotion:boolean}):void;exit():void;}
let cleanup:(()=>void)|null=null;
export const realmAdapter:RealmAdapter={available:true,reason:'ต้นแบบ Infinite Stillness ที่ผู้ใช้มีอยู่ · ยังไม่ทดสอบบนอุปกรณ์จริง',enter(returnToTemple,preferences={reduceMotion:false}){
 if(cleanup)return;const sessionId=createRealmSessionId(),overlay=document.createElement('dialog');overlay.className='realm-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Infinite Stillness ต้นแบบ');
 const frame=document.createElement('iframe');frame.title='Infinite Stillness — ต้นแบบการฝึกตามสมัครใจ';frame.sandbox.add('allow-scripts');frame.src=`${import.meta.env.BASE_URL}realm/infinite-stillness.html`;frame.referrerPolicy='no-referrer';
 const bar=document.createElement('div');bar.className='realm-bar';const status=document.createElement('span');status.textContent='กำลังเปิดต้นแบบ · ออกได้ทุกเมื่อ';const close=document.createElement('button');close.textContent='ออกกลับศาลา';bar.append(status,close);overlay.append(frame,bar);const previous=document.activeElement as HTMLElement|null;document.body.append(overlay);overlay.showModal();close.focus();overlay.addEventListener('cancel',e=>{e.preventDefault();realmAdapter.exit();});
 const send=(type:string)=>frame.contentWindow?.postMessage({protocol:REALM_PROTOCOL,type,sessionId},'*');
 const onMessage=(event:MessageEvent)=>{if(!isTrustedRealmEvent(event,frame.contentWindow,sessionId))return;if(event.data.type==='ready'){clearTimeout(timeout);status.textContent='ต้นแบบในเครื่อง · ไม่มีการประเมินสมาธิ';}if(event.data.type==='exit')realmAdapter.exit();};
 const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();realmAdapter.exit();}};
 const onHidden=()=>{if(document.hidden)send('pause');};
 frame.onload=()=>frame.contentWindow?.postMessage({protocol:REALM_PROTOCOL,type:'init',sessionId,preferences:{voice:false,captions:true,particles:!preferences.reduceMotion,reduceMotion:preferences.reduceMotion}},'*');
 const timeout=window.setTimeout(()=>{status.textContent='หากต้นแบบไม่แสดงภาพ คุณออกกลับศาลาได้ทันที';},15000);
 cleanup=()=>{send('dispose');clearTimeout(timeout);window.removeEventListener('message',onMessage);window.removeEventListener('keydown',onKey);document.removeEventListener('visibilitychange',onHidden);overlay.close();overlay.remove();cleanup=null;returnToTemple();if(previous?.isConnected&&previous.getClientRects().length)previous.focus();else document.querySelector<HTMLCanvasElement>('#world')?.focus();};close.onclick=()=>realmAdapter.exit();window.addEventListener('message',onMessage);window.addEventListener('keydown',onKey);document.addEventListener('visibilitychange',onHidden);
 },exit(){cleanup?.();}};
