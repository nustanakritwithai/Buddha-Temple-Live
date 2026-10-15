import type {FreeCamera} from '@babylonjs/core/Cameras/freeCamera.js';
import {Vector3} from '@babylonjs/core/Maths/math.vector.js';
import type {ViewState} from './controls';
/** The same pose path is exercised against a real Babylon camera in headless tests. */
export function applyFirstPersonPose(camera:FreeCamera,position:{x:number;y:number;z:number},view:ViewState){
 camera.getScene().activeCamera=camera;
 camera.position.set(position.x,position.y,position.z);
 camera.setTarget(camera.position.add(new Vector3(Math.sin(view.yaw)*Math.cos(view.pitch),Math.sin(view.pitch),Math.cos(view.yaw)*Math.cos(view.pitch))));
}
