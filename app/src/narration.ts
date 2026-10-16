export type NarrationStatus='idle'|'unavailable'|'starting'|'playing'|'paused'|'stopped'|'error';
export interface Voice {lang:string;name:string;localService?:boolean;}
export interface SpeechItem {text:string;lang:string;voice:Voice|null;volume:number;onstart:(()=>void)|null;onend:(()=>void)|null;onerror:((event?:{error?:string})=>void)|null;}
export interface SpeechPort {getVoices():Voice[];speak(item:SpeechItem):void;cancel():void;pause():void;resume():void;addEventListener(type:string,fn:()=>void):void;removeEventListener(type:string,fn:()=>void):void;}
export function thaiVoice(voices:Voice[]){return voices.filter(v=>/^th(?:-|$)/i.test(v.lang)).sort((a,b)=>Number(Boolean(b.localService))-Number(Boolean(a.localService)))[0]??null;}
/** User-initiated only. Token invalidation makes late callbacks from cancelled speech harmless. */
export function createNarrator(port:SpeechPort|null,makeItem:(text:string)=>SpeechItem,onChange:(state:{status:NarrationStatus;available:boolean;volume:number;voiceCount:number;voiceName:string|null;reason:string|null})=>void){
 let status:NarrationStatus='idle',volume=.7,token=0,disposed=false,item:SpeechItem|null=null,timer:ReturnType<typeof setTimeout>|null=null;
 let reason:string|null=null;let checks:ReturnType<typeof setTimeout>[]=[];
 const clearChecks=()=>{checks.forEach(clearTimeout);checks=[];};
 const emit=()=>{if(disposed)return;let voices:Voice[]=[];try{voices=port?.getVoices()??[];}catch{}const voice=thaiVoice(voices);onChange({status,available:Boolean(voice),volume,voiceCount:voices.length,voiceName:voice?.name??null,reason:reason??(!port?'unsupported':!voices.length?'empty-voices':!voice?'no-thai':null)});};
 const clearTimer=()=>{if(timer!==null)clearTimeout(timer);timer=null;};
 const stop=()=>{if(disposed)return;token++;clearChecks();clearTimer();reason=null;item=null;try{port?.cancel();}catch{}status='stopped';emit();};
 const voicesChanged=()=>emit();try{port?.addEventListener('voiceschanged',voicesChanged);}catch{}
 const api={
 play(text:string){if(disposed)return false;stop();if(!text.trim())return false;let voice:Voice|null=null;try{voice=port&&thaiVoice(port.getVoices());}catch{}if(!port||!voice){status='unavailable';emit();return false;}
 const current=token;try{port.resume();item=makeItem(text);item.lang='th-TH';item.voice=voice;item.volume=volume;item.onstart=()=>{if(current!==token||disposed)return;clearTimer();status='playing';emit();};item.onend=()=>{if(current!==token||disposed)return;clearTimer();item=null;status='idle';emit();};item.onerror=event=>{if(current!==token||disposed)return;clearTimer();item=null;reason=event?.error??'speech-error';status='error';emit();};status='starting';emit();timer=setTimeout(()=>{if(current!==token||disposed)return;stop();reason='start-timeout';status='error';emit();},10000);port.speak(item);return true;}catch{clearTimer();item=null;reason='speech-error';status='error';emit();return false;}},
 pause(){if(disposed||status!=='playing')return;try{port?.pause();status='paused';emit();}catch{stop();status='error';emit();}},
 resume(){if(disposed||status!=='paused')return;try{port?.resume();status='playing';emit();}catch{stop();status='error';emit();}},
 stop,
 setVolume(value:number){if(disposed||!Number.isFinite(value))return;volume=Math.max(0,Math.min(1,value));emit();},
 refresh:emit,
 checkVoices(){if(disposed)return;clearChecks();reason=null;if(!['playing','paused','starting'].includes(status))status='idle';emit();for(const delay of [300,1000,3000])checks.push(setTimeout(()=>{emit();},delay));},
 dispose(){if(disposed)return;stop();disposed=true;try{port?.removeEventListener('voiceschanged',voicesChanged);}catch{}},
 };
 return api;
}
