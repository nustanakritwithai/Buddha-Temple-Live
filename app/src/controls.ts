import type {Point} from './simulation';
/** Radial dead zone removes accidental drift without losing analog speed. */
export function joystickInput(x:number,z:number,radius:number,deadZone=.14):Point {
 if(!Number.isFinite(x)||!Number.isFinite(z)||!Number.isFinite(radius)||radius<=0)return {x:0,z:0};
 const distance=Math.hypot(x,z),normalized=Math.min(1,distance/radius);if(normalized<=deadZone)return {x:0,z:0};
 const strength=(normalized-deadZone)/(1-deadZone);return {x:x/distance*strength,z:z/distance*strength};
}
export function cameraRelativeMove(input:Point,alpha:number):Point {const x=-Math.cos(alpha),z=-Math.sin(alpha);return {x:x*input.z-z*input.x,z:z*input.z+x*input.x};}
export function cameraPreset(width:number,height:number){return {alpha:Math.PI*.31,beta:1.02,radius:width<height?27:23};}
export function approachHeight(current:number,target:number,dt:number,reduced:boolean){if(reduced)return target;return current+(target-current)*Math.min(1,Math.max(0,dt)*18);}
export type ViewMode='third'|'first';
export type ViewState={mode:ViewMode;yaw:number;pitch:number;sensitivity:number};
export function defaultView():ViewState{return {mode:'third',yaw:Math.PI,pitch:0,sensitivity:1};}
export function look(view:ViewState,dx:number,dy:number):ViewState {if(!Number.isFinite(dx)||!Number.isFinite(dy))return view;const sensitivity=Math.max(.3,Math.min(2,view.sensitivity));return {...view,sensitivity,yaw:(view.yaw-dx*.004*sensitivity)%(Math.PI*2),pitch:Math.max(-1.15,Math.min(1.15,view.pitch-dy*.004*sensitivity))};}
export function switchView(view:ViewState,mode:ViewMode):ViewState{return {...view,mode};}
export function viewMove(input:Point,view:ViewState,orbitAlpha:number){return view.mode==='third'?cameraRelativeMove(input,orbitAlpha):{x:Math.sin(view.yaw)*input.z-Math.cos(view.yaw)*input.x,z:Math.cos(view.yaw)*input.z+Math.sin(view.yaw)*input.x};}
export function endPointer(active:number|null,ended:number){return active===ended?null:active;}
