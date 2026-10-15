import {Scene} from '@babylonjs/core/scene';
import {MeshBuilder} from '@babylonjs/core/Meshes/meshBuilder';
import {StandardMaterial} from '@babylonjs/core/Materials/standardMaterial';
import {DynamicTexture} from '@babylonjs/core/Materials/Textures/dynamicTexture';
import {Color3} from '@babylonjs/core/Maths/math.color';
import type {LearningStation} from './learning-stations';
import {groundHeight} from './zones';
/** Original simple, static props. No animation, glow, audio, external font or asset fetch. */
export function addStationMeshes(scene:Scene,stations:readonly LearningStation[]){
 const material=(name:string,color:Color3)=>{const m=new StandardMaterial(name,scene);m.diffuseColor=color;m.specularColor=Color3.Black();return m;};
 const wood=material('reading-wood',new Color3(.30,.22,.13)),ivory=material('reading-paper',new Color3(.96,.92,.79));
 for(const station of stations){if(station.kind==='helper')continue;const p=station.propPosition,y=groundHeight(p);const tag=(mesh:ReturnType<typeof MeshBuilder.CreateBox>)=>{mesh.metadata={learningStationId:station.id};mesh.isPickable=true;return mesh;};
 const post=tag(MeshBuilder.CreateBox(`station-${station.id}-post`,{width:.075,height:.9,depth:.075},scene));post.position.set(p.x,y+.45,p.z);post.material=wood;
 if(station.kind==='book'){const stand=tag(MeshBuilder.CreateBox(`bookstand-${station.id}`,{width:.72,height:.07,depth:.48},scene));stand.position.set(p.x,y+.87,p.z);stand.material=wood;for(const side of [-1,1]){const pages=tag(MeshBuilder.CreateBox(`pages-${station.id}-${side}`,{width:.30,height:.035,depth:.38},scene));pages.position.set(p.x+side*.155,y+.94,p.z);pages.rotation.z=side*.09;pages.material=ivory;}}
 const board=tag(MeshBuilder.CreateBox(`sign-frame-${station.id}`,{width:1.04,height:.36,depth:.065},scene));board.position.set(p.x,y+(station.kind==='book'?1.17:1.05),p.z);board.material=wood;
 const face=tag(MeshBuilder.CreatePlane(`readable-${station.id}`,{width:.98,height:.30,sideOrientation:2},scene));face.position.set(p.x,board.position.y,p.z+.04);face.rotation.y=Math.PI;
 const texture=new DynamicTexture(`caption-${station.id}`,{width:768,height:256},scene,false);const ctx=texture.getContext();ctx.fillStyle='#fff8df';ctx.fillRect(0,0,768,256);ctx.fillStyle='#294d3c';ctx.font='38px Tahoma, sans-serif';(ctx as CanvasRenderingContext2D).textAlign='center';ctx.fillText(station.signText,384,118);ctx.font='24px Tahoma, sans-serif';ctx.fillStyle='#7b7259';ctx.fillText('เลือกอ่านได้เมื่อคุณต้องการ',384,182);texture.update();const caption=material(`paper-${station.id}`,Color3.White());caption.diffuseTexture=texture;face.material=caption;
 }
}
