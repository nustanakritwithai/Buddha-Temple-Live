import './style.css';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import '@babylonjs/loaders/glTF/2.0/glTFLoader';
import '@babylonjs/loaders/glTF/glTFFileLoader';
import { ENTRANCE, movePlayer, parseSave, type Point } from './simulation';
import { LocalWorldAdapter } from './adapter';
const app=document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML=`<canvas id="world" aria-label="ลานวัดสามมิติ ใช้ปุ่ม W A S D หรือปุ่มลูกศรเพื่อเดิน ลากเพื่อหมุนมุมมอง" tabindex="0"></canvas>
<header class="top"><div class="brand"><div class="eyebrow">A SMALL PLACE TO SLOW DOWN</div><h1><span class="mark" aria-hidden="true">❋</span>ลานพักใจ</h1><p>โหมดทดลองในเบราว์เซอร์ · ยังไม่เชื่อมเซิร์ฟเวอร์</p></div><nav class="tools" aria-label="เครื่องมือ"><button id="help">วิธีเดินเล่น</button><button id="settings">ตั้งค่า</button></nav></header>
<div class="coordinate">AI LIVING TEMPLE / COURTYARD 01</div>
<div class="joystick" id="joystick" role="group" aria-label="จอยสัมผัสสำหรับเดิน"><div class="stick"></div><span class="joystick-label">เลื่อนเพื่อเดิน</span></div>
<footer class="bottom"><section class="guide"><div><div class="label">YOUR LITTLE SANCTUARY</div><h2 id="place-title">ค่อย ๆ เดิน ไม่ต้องรีบ</h2><p>เดินชมสวน แวะมองดอกบัว<br>หรือหยุดพักตรงนี้สักครู่</p></div><div class="status"><span class="dot"></span><span id="gardener-status">กำลังเตรียมสวน</span></div></section><div class="actions"><button id="home" disabled>↶ กลับทางเข้า</button><button class="primary" id="sit" aria-pressed="false" disabled>◌ นั่งพัก</button></div></footer>
<div class="toast" role="status" aria-live="polite"></div>
<div class="loading" role="status"><div class="symbol pulse">❋</div><h2>กำลังเปิดประตูสวน</h2><p>เตรียมลานเล็ก ๆ สำหรับการเดินเล่นของคุณ</p></div>
<dialog id="help-dialog" aria-labelledby="help-title"><h2 id="help-title">เดินเล่นในลานพักใจ</h2><p>ผู้มาเยือนเสื้อสีงาช้างและวงแสงบนพื้นคือคุณ มุมมองจะค่อย ๆ ตามขณะเดิน</p><ul><li>คอมพิวเตอร์: W A S D หรือปุ่มลูกศรเพื่อเดิน</li><li>มือถือ: เลื่อนจอยวงกลมทางซ้ายเพื่อเดิน</li><li>ลากพื้นที่สวนเพื่อหมุนมุมมอง ใช้สองนิ้วหรือเลื่อนเมาส์เพื่อซูม</li><li>กด “นั่งพัก” เพื่อหยุด แล้วกด “ลุกเดิน” เพื่อเดินต่อ</li></ul><p>คนสวนเป็นตัวละครจำลองที่เดิน รดน้ำ และพักตามลำดับที่กำหนด ไม่มีแชต AI และไม่มีการทำงานต่อเมื่อปิดหน้านี้</p><div class="dialog-actions"><button data-close>เข้าใจแล้ว</button></div></dialog>
<dialog id="settings-dialog" aria-labelledby="settings-title"><h2 id="settings-title">พื้นที่ในจังหวะของคุณ</h2><label class="setting"><input type="checkbox" id="reduced"> ลดการเคลื่อนไหวของมุมมองและเอฟเฟกต์</label><label class="setting"><input type="checkbox" id="sound"> เสียงบรรยากาศเบา ๆ</label><p>เสียงสังเคราะห์ในเครื่อง เปิดเมื่อคุณเลือกเท่านั้น ตำแหน่งและการลดการเคลื่อนไหวจะบันทึกในเบราว์เซอร์นี้เท่านั้น หากเบราว์เซอร์อนุญาต</p><div class="dialog-actions"><button data-close>เรียบร้อย</button></div></dialog>`;
const $=<T extends HTMLElement>(s:string)=>document.querySelector<T>(s)!;
const canvas=$<HTMLCanvasElement>('#world'),loading=$('.loading'),sitButton=$<HTMLButtonElement>('#sit');
let saved=null;try{saved=parseSave(localStorage.getItem('living-temple-v1'));}catch{}
let player:Point=saved?.position??{...ENTRANCE},reduced=saved?.reducedMotion??matchMedia('(prefers-reduced-motion: reduce)').matches,sitting=false;
const keys=new Set<string>();let joystick={x:0,z:0};let audio:AudioContext|null=null,audioGain:GainNode|null=null;
function save(){try{localStorage.setItem('living-temple-v1',JSON.stringify({version:1,position:player,reducedMotion:reduced}));}catch{}}
function resetInputs(){keys.clear();joystick={x:0,z:0};$('.stick').style.transform='';}
function toast(text:string){const el=$('.toast');el.textContent=text;el.classList.add('visible');window.setTimeout(()=>el.classList.remove('visible'),3000);}
function applyMotion(){document.body.classList.toggle('reduce-motion',reduced);$<HTMLInputElement>('#reduced').checked=reduced;save();}applyMotion();
for(const name of ['help','settings'])$(`#${name}`).onclick=()=>{resetInputs();$<HTMLDialogElement>(`#${name}-dialog`).showModal();};
document.querySelectorAll<HTMLButtonElement>('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog')?.close());
$<HTMLInputElement>('#reduced').onchange=e=>{reduced=(e.target as HTMLInputElement).checked;applyMotion();};
$<HTMLInputElement>('#sound').onchange=async e=>{const checked=(e.target as HTMLInputElement).checked;try{if(checked){if(!audio){audio=new AudioContext();audioGain=audio.createGain();audioGain.gain.value=.018;audioGain.connect(audio.destination);[146.83,220,293.66].forEach(f=>{const osc=audio!.createOscillator();osc.type='sine';osc.frequency.value=f;osc.connect(audioGain!);osc.start();});}await audio.resume();}else await audio?.suspend();}catch{(e.target as HTMLInputElement).checked=false;toast('เบราว์เซอร์นี้ยังเปิดเสียงไม่ได้');}};
window.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||e.target instanceof HTMLInputElement)return;if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright'].includes(e.key.toLowerCase())){e.preventDefault();keys.add(e.key.toLowerCase());}});
window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));window.addEventListener('blur',()=>{resetInputs();save();});window.addEventListener('pagehide',save);
const joy=$('#joystick');let joyPointer:number|null=null;
function updateJoy(e:PointerEvent){const r=joy.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/35,z=(e.clientY-r.top-r.height/2)/35,length=Math.max(1,Math.hypot(x,z));joystick={x:x/length,z:z/length};$('.stick').style.transform=`translate(${joystick.x*28}px,${joystick.z*28}px)`;}
joy.onpointerdown=e=>{if(joyPointer!==null)return;e.preventDefault();joyPointer=e.pointerId;joy.setPointerCapture(e.pointerId);updateJoy(e);};joy.onpointermove=e=>{if(e.pointerId===joyPointer)updateJoy(e);};joy.onpointerup=joy.onpointercancel=joy.onlostpointercapture=()=>{joyPointer=null;resetInputs();};
async function start(){
 let engine:Engine;try{engine=new Engine(canvas,true,{stencil:true,preserveDrawingBuffer:true},false);}catch{fail('อุปกรณ์นี้ยังเปิดภาพสามมิติไม่ได้','ลองใช้เบราว์เซอร์ที่รองรับ WebGL หรือเปิดการเร่งกราฟิก');return;}
 engine.setHardwareScalingLevel(Math.max(1,window.devicePixelRatio/1.5));const scene=new Scene(engine);scene.useRightHandedSystem=true;scene.clearColor=new Color4(.90,.91,.84,1);scene.ambientColor=new Color3(.6,.64,.57);
 const camera=new ArcRotateCamera('camera',Math.PI*.31,1.02,23,new Vector3(0,.6,0),scene);camera.attachControl(canvas,true);camera.lowerRadiusLimit=9;camera.upperRadiusLimit=28;camera.lowerBetaLimit=.42;camera.upperBetaLimit=1.22;camera.panningSensibility=0;camera.wheelPrecision=35;camera.inertia=.65;camera.inputs.removeByType('ArcRotateCameraKeyboardMoveInput');camera.pinchPrecision=65;
 const ambient=new HemisphericLight('sky',new Vector3(0,1,0),scene);ambient.intensity=1.15;ambient.groundColor=new Color3(.48,.50,.38);const sun=new DirectionalLight('sun',new Vector3(-.6,-1,-.3),scene);sun.position=new Vector3(9,15,8);sun.intensity=2.3;
 const shadows=new ShadowGenerator(1024,sun);shadows.useBlurExponentialShadowMap=true;shadows.blurKernel=12;shadows.darkness=.23;
 const floor=MeshBuilder.CreateGround('surround',{width:180,height:180},scene);floor.position.y=-.76;const groundMat=new StandardMaterial('surround-mat',scene);groundMat.diffuseColor=new Color3(.80,.83,.73);groundMat.specularColor=Color3.Black();floor.material=groundMat;floor.receiveShadows=true;
 try{
 const courtyard=await SceneLoader.ImportMeshAsync('',`${import.meta.env.BASE_URL}assets/`,'living_temple_scene.glb',scene);
 for(const mesh of courtyard.meshes){if(mesh.name.includes('AI_Gardener_NPC')){mesh.dispose();continue;}mesh.receiveShadows=true;if(mesh.name!=='Courtyard'&&mesh.name!=='__root__')shadows.addShadowCaster(mesh);}
 const npc=await SceneLoader.ImportMeshAsync('',`${import.meta.env.BASE_URL}assets/`,'ai_gardener_npc.glb',scene);const gardener=new TransformNode('moving-gardener',scene);npc.meshes[0].parent=gardener;npc.meshes.forEach(m=>shadows.addShadowCaster(m));
 const ring=MeshBuilder.CreateTorus('you',{diameter:.6,thickness:.045,tessellation:36},scene);const glow=new StandardMaterial('you-glow',scene);glow.diffuseColor=new Color3(.95,.83,.49);glow.emissiveColor=new Color3(.35,.27,.1);glow.specularColor=Color3.Black();ring.material=glow;
 const visitor=new TransformNode('visitor',scene);
 const robe=new StandardMaterial('visitor-ivory',scene);robe.diffuseColor=new Color3(.96,.88,.68);robe.specularColor=Color3.Black();
 const skin=new StandardMaterial('visitor-skin',scene);skin.diffuseColor=new Color3(.62,.39,.23);skin.specularColor=Color3.Black();
 const body=MeshBuilder.CreateCylinder('visitor-shirt',{height:.66,diameterTop:.38,diameterBottom:.48,tessellation:12},scene);body.position.y=.85;body.material=robe;body.parent=visitor;
 const head=MeshBuilder.CreateSphere('visitor-head',{diameter:.33,segments:12},scene);head.position.y=1.38;head.material=skin;head.parent=visitor;
 for(const side of [-1,1]){const leg=MeshBuilder.CreateCylinder('visitor-leg',{height:.48,diameter:.14,tessellation:8},scene);leg.position.set(side*.12,.34,0);leg.material=robe;leg.parent=visitor;const arm=MeshBuilder.CreateCylinder('visitor-arm',{height:.48,diameter:.12,tessellation:8},scene);arm.position.set(side*.28,.84,0);arm.material=skin;arm.parent=visitor;}
 visitor.getChildMeshes().forEach(m=>shadows.addShadowCaster(m));
 const dropMat=new StandardMaterial('water-drops',scene);dropMat.diffuseColor=new Color3(.32,.70,.75);dropMat.emissiveColor=new Color3(.1,.2,.2);const drops=Array.from({length:5},(_,i)=>{const d=MeshBuilder.CreateSphere(`water-${i}`,{diameter:.045,segments:6},scene);d.material=dropMat;return d;});
 const world=new LocalWorldAdapter();let previous=performance.now(),accumulator=0,time=0,lastSave=0,lastStatus='';let state=world.tick(0);
 loading.hidden=true;$<HTMLButtonElement>('#home').disabled=false;sitButton.disabled=false;toast('ผู้มาเยือนเสื้อสีงาช้างคือคุณ · ลากสวนเพื่อมองรอบ ๆ');
 sitButton.onclick=()=>{sitting=!sitting;resetInputs();sitButton.setAttribute('aria-pressed',String(sitting));sitButton.textContent=sitting?'◌ ลุกเดิน':'◌ นั่งพัก';$('#place-title').textContent=sitting?'พักตรงนี้สักครู่':'ค่อย ๆ เดิน ไม่ต้องรีบ';toast(sitting?'หยุดพักได้ตามสบาย':'พร้อมเดินต่อแล้ว');};
 $('#home').onclick=()=>{player={...ENTRANCE};sitting=false;sitButton.setAttribute('aria-pressed','false');sitButton.textContent='◌ นั่งพัก';$('#place-title').textContent='ค่อย ๆ เดิน ไม่ต้องรีบ';camera.alpha=Math.PI*.31;camera.beta=1.02;camera.radius=23;camera.target.set(0,.6,0);resetInputs();save();toast('กลับมาที่ทางเข้าแล้ว');};
 document.addEventListener('visibilitychange',()=>{resetInputs();previous=performance.now();accumulator=0;if(document.hidden){save();void audio?.suspend();}else if($<HTMLInputElement>('#sound').checked)void audio?.resume();});
 engine.runRenderLoop(()=>{
 const now=performance.now(),elapsed=Math.min(.1,(now-previous)/1000);previous=now;if(document.hidden)return;
 accumulator+=elapsed;while(accumulator>=1/60){accumulator-=1/60;time+=1/60;state=world.tick(1/60);
 if(!sitting&&!document.querySelector('dialog[open]')){const sx=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0)+joystick.x;const sy=(keys.has('w')||keys.has('arrowup')?1:0)-(keys.has('s')||keys.has('arrowdown')?1:0)-joystick.z;const fx=-Math.cos(camera.alpha),fz=-Math.sin(camera.alpha);player=movePlayer(player,{x:fx*sy-fz*sx,z:fz*sy+fx*sx},1/60);}}
 ring.position.set(player.x,.16,player.z);visitor.position.set(player.x,.02,player.z);visitor.scaling.y=sitting?.62:1;
 gardener.position.set(state.position.x,.04,state.position.z);gardener.rotation.y=state.mode==='watering'?Math.PI:state.heading;gardener.rotation.z=state.mode==='watering'&&!reduced?Math.sin(time*2)*.035:0;
 drops.forEach((d,i)=>{d.setEnabled(state.mode==='watering'&&!reduced);d.position.set(state.position.x-.82,.75-((time*.6+i*.12)%.6),state.position.z-.18);});
 const status={walking:'คนสวนกำลังเดินชมสวน',watering:'คนสวนกำลังรดน้ำ',resting:'คนสวนกำลังพัก'}[state.mode];if(status!==lastStatus){$('#gardener-status').textContent=status;lastStatus=status;}
 if(!reduced){const target=new Vector3(player.x*.25,.6,player.z*.15-.7);camera.target=Vector3.Lerp(camera.target,target,Math.min(1,elapsed*1.8));}
 if(now-lastSave>3000){save();lastSave=now;}scene.render();});
 window.addEventListener('resize',()=>engine.resize());
 }catch(error){console.error('Temple asset initialization failed',error);engine.dispose();fail('ยังเปิดสวนไม่สำเร็จ','โหลดโมเดลไม่ครบ กรุณาลองใหม่เมื่อการเชื่อมต่อพร้อม');}
}
function fail(title:string,detail:string){loading.innerHTML=`<div class="symbol">❋</div><h2>${title}</h2><p>${detail}</p><button id="retry">ลองเปิดสวนอีกครั้ง</button><p>คุณยังอ่านวิธีใช้งานและตั้งค่าได้หลังจากลองใหม่</p>`;$('#retry').onclick=()=>location.reload();}
void start();
