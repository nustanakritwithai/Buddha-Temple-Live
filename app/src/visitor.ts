import {Scene} from '@babylonjs/core/scene';
import {TransformNode} from '@babylonjs/core/Meshes/transformNode';
import {MeshBuilder} from '@babylonjs/core/Meshes/meshBuilder';
import {StandardMaterial} from '@babylonjs/core/Materials/standardMaterial';
import {Color3} from '@babylonjs/core/Maths/math.color';
import type {Motion} from './experience';
export function createVisitor(scene:Scene){
 const root=new TransformNode('visitor',scene),torso=new TransformNode('visitor-torso',scene);torso.parent=root;
 const mat=(name:string,color:Color3)=>{const m=new StandardMaterial(name,scene);m.diffuseColor=color;m.specularColor=Color3.Black();return m;};
 const ivory=mat('visitor-ivory',new Color3(.96,.88,.68)),skin=mat('visitor-skin',new Color3(.62,.39,.23)),pants=mat('visitor-trousers',new Color3(.24,.38,.34)),dark=mat('visitor-hair',new Color3(.10,.12,.10));
 function cylinder(name:string,parent:TransformNode,y:number,length:number,diameter:number,material:StandardMaterial){const m=MeshBuilder.CreateCylinder(name,{height:length,diameter,tessellation:10},scene);m.position.y=y;m.material=material;m.parent=parent;return m;}
 const body=cylinder('shirt',torso,.87,.62,.42,ivory);
 const head=MeshBuilder.CreateSphere('head',{diameter:.34,segments:12},scene);head.position.y=1.38;head.material=skin;head.parent=torso;
 const hair=MeshBuilder.CreateSphere('hair',{diameter:.35,segments:12},scene);hair.scaling.y=.55;hair.position.set(0,1.49,-.025);hair.material=dark;hair.parent=torso;
 for(const side of [-1,1]){const eye=MeshBuilder.CreateSphere('eye',{diameter:.025,segments:6},scene);eye.position.set(side*.06,1.39,.156);eye.material=dark;eye.parent=torso;}
 const limbs=[-1,1].map(side=>{const hip=new TransformNode(`hip-${side}`,scene);hip.parent=torso;hip.position.set(side*.12,.60,0);cylinder('thigh',hip,-.13,.26,.16,pants);const knee=new TransformNode(`knee-${side}`,scene);knee.parent=hip;knee.position.y=-.26;cylinder('shin',knee,-.13,.26,.14,pants);const foot=MeshBuilder.CreateBox('shoe',{width:.16,height:.09,depth:.27},scene);foot.position.set(0,-.26,.05);foot.material=dark;foot.parent=knee;
 const shoulder=new TransformNode(`shoulder-${side}`,scene);shoulder.parent=torso;shoulder.position.set(side*.28,1.12,0);cylinder('upper-arm',shoulder,-.12,.24,.13,ivory);const elbow=new TransformNode(`elbow-${side}`,scene);elbow.parent=shoulder;elbow.position.y=-.24;cylinder('forearm',elbow,-.11,.22,.11,skin);return {hip,knee,shoulder,elbow,side};});
 return {root,pose(sitting:boolean,motion:Motion,reduced:boolean,seatKind:'ground'|'bench'|'cushion'='ground'){root.rotation.y=motion.heading;torso.position.y=sitting&&seatKind!=='bench'?-.30:0;body.rotation.x=sitting?-.06:0;
 for(const limb of limbs){const swing=!reduced&&motion.walking?Math.sin(motion.distance*9)*.42*limb.side:0;limb.hip.rotation.x=sitting?-Math.PI/2:swing;limb.hip.rotation.z=sitting?limb.side*.16:0;limb.knee.rotation.x=sitting?(seatKind==='bench'?Math.PI/2:3.0):Math.max(0,-swing)*.6;limb.shoulder.rotation.x=sitting?-.65:-swing*.8;limb.elbow.rotation.x=sitting?-.65:-.12;}}
 };
}
