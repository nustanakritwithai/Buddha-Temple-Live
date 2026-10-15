import { initialGardener, stepGardener, type Gardener } from './simulation';
/** Replace with an authoritative server transport later. No network or durable world state here. */
export interface WorldAdapter {readonly kind:'local'|'remote'; tick(dt:number):Gardener; disconnect():void;}
export class LocalWorldAdapter implements WorldAdapter {
 readonly kind='local' as const;private gardener=initialGardener();
 tick(dt:number){this.gardener=stepGardener(this.gardener,dt);return this.gardener;}
 disconnect(){}
}
