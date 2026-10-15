import test from 'node:test';
import assert from 'node:assert/strict';
import { REALM_PROTOCOL, createRealmSessionId, createRealmInit, isRealmChildMessage, isTrustedRealmEvent } from '../src/realm-protocol.ts';
const sessionId = 'a'.repeat(32);
const ready = {protocol: REALM_PROTOCOL, type:'ready', sessionId};
test('accepts only bounded messages tied to the current nonce', () => {
  assert.ok(isRealmChildMessage(ready, sessionId));
  assert.ok(isRealmChildMessage({...ready,type:'exit',reason:'user'},sessionId));
  assert.ok(isRealmChildMessage({...ready,type:'phase',phase:'paused'},sessionId));
  for(const value of [null, [], 'ready', {...ready,sessionId:'b'.repeat(32)}, {...ready,url:'https://evil.test'}, {...ready,type:'navigate'}, {...ready,type:'phase',phase:'teleport'}, {...ready,type:'exit',reason:'https://evil.test'}, {...ready,protocol:'wrong'}]) {
    assert.equal(isRealmChildMessage(value,sessionId),false);
  }
});
test('opaque origin alone is insufficient: exact frame source and current nonce required', () => {
  const frame={};
  assert.ok(isTrustedRealmEvent({origin:'null',source:frame,data:ready},frame,sessionId));
  assert.equal(isTrustedRealmEvent({origin:'null',source:{},data:ready},frame,sessionId),false);
  assert.equal(isTrustedRealmEvent({origin:'https://example.test',source:frame,data:ready},frame,sessionId),false);
  assert.equal(isTrustedRealmEvent({origin:'null',source:frame,data:ready},frame,'b'.repeat(32)),false);
  assert.equal(isTrustedRealmEvent({origin:'null',source:null,data:ready},null,sessionId),false);
});
test('fresh crypto nonces and silent, captioned initialization', () => {
  const a=createRealmSessionId(),b=createRealmSessionId();
  assert.match(a,/^[a-f0-9]{32}$/);assert.notEqual(a,b);
  const init=createRealmInit(a,{voice:true});
  assert.equal(init.type,'init');
  if(init.type==='init'){assert.equal(init.preferences.voice,false);assert.equal(init.preferences.captions,true);}
  assert.throws(()=>createRealmInit('invalid'));
});
