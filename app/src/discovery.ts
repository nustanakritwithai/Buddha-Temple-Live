import type {Point} from './simulation';
import type {Mode} from './practice';
export type Discoverable={id:string;position:Point;radius:number};
export type DiscoveryContext={mode:Mode;modalOpen:boolean;realmOpen:boolean;visible:boolean};
export function allowsDiscovery(c:DiscoveryContext){return c.mode==='EXPLORE'&&!c.modalOpen&&!c.realmOpen&&c.visible;}
/** Distance only selects an available action. This never opens content or records visits. */
export function nearbyStation<T extends Discoverable>(p:Point,stations:readonly T[],context:DiscoveryContext):T|null {
 if(!allowsDiscovery(context))return null;return stations.filter(s=>Math.hypot(p.x-s.position.x,p.z-s.position.z)<=s.radius).sort((a,b)=>Math.hypot(p.x-a.position.x,p.z-a.position.z)-Math.hypot(p.x-b.position.x,p.z-b.position.z))[0]??null;
}
export function canOpenStation(p:Point,station:Discoverable,context:DiscoveryContext){return allowsDiscovery(context)&&Math.hypot(p.x-station.position.x,p.z-station.position.z)<=station.radius;}
