import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WELCOME_DIALOGUE_BRANCHES } from '../src/learning-stations.ts';
import { LESSONS } from '../src/content.ts';
import { walkable, ENTRANCE } from '../src/simulation.ts';
import { LEARNING_STATIONS, QUIET_BOUNDARY_ZONE, SCRIPTED_HELPER_LABEL, STATION_NOTICE, stationById } from '../src/learning-stations.ts';
test('all 17 existing lessons have one natural discovery location, with no Z08 station', () => {
  const ids = new Set(LESSONS.map(l => l.id));
  const mapped = LEARNING_STATIONS.flatMap(s => s.lessonIds);
  assert.equal(mapped.length, ids.size); assert.equal(new Set(mapped).size, ids.size);
  for (const id of mapped) assert.ok(ids.has(id));
  assert.equal(LEARNING_STATIONS.length, 7);
  assert.equal(new Set(LEARNING_STATIONS.map(s => s.id)).size, 7);
  assert.equal(new Set(LEARNING_STATIONS.map(s => s.zoneId)).size, 7);
  assert.ok(LEARNING_STATIONS.every(s => String(s.zoneId) !== QUIET_BOUNDARY_ZONE));
});
test('every station requires explicit activation and begins with optional authored reflection', () => {
  for (const s of LEARNING_STATIONS) {
    assert.equal(s.activation, 'explicit'); assert.equal(s.isAdaptation, true);
    assert.match(s.reflection, /หากต้องการ/);
    assert.ok(s.title && s.signText && s.cta && s.introduction && s.detailCta && s.sourceCta && s.closeCta);
    assert.ok(s.signText.length < 50); assert.ok(s.cta.length < 50);
    assert.equal(stationById(s.id), s);
    for (const key of ['score', 'locked', 'prerequisites', 'autoOpen']) assert.ok(!(key in s));
  }
  assert.equal(stationById('not-a-station'), undefined);
  assert.match(STATION_NOTICE, /ประยุกต์/);
  for (const s of LEARNING_STATIONS.filter(s => s.kind === 'helper')) {
    assert.equal(s.helperLabel, SCRIPTED_HELPER_LABEL);
    assert.match(s.helperLabel!, /เขียนไว้ล่วงหน้า/); assert.match(s.helperLabel!, /ไม่ได้เชื่อมต่อ LLM/);
  }
});
test('anchors are walkable and reachable from the entrance on a connected navigation grid', () => {
  const step = .1, key = (x: number,z: number) => `${x},${z}`;
  const start = [Math.round(ENTRANCE.x/step), Math.round(ENTRANCE.z/step)];
  const queue = [start], seen = new Set([key(start[0],start[1])]);
  for (let i=0; i<queue.length; i++) {
    const [x,z] = queue[i];
    for (const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx=x+dx,nz=z+dz,k=key(nx,nz);
      if (!seen.has(k) && walkable({x:nx*step,z:nz*step})) { seen.add(k); queue.push([nx,nz]); }
    }
  }
  for (const s of LEARNING_STATIONS) {
    assert.ok(walkable(s.position), `${s.id} anchor must be walkable`);
    assert.ok(queue.some(([x,z]) => Math.hypot(x*step-s.position.x,z*step-s.position.z)<.16), `${s.id} must be reachable`);
    assert.ok(s.radius > 0 && s.radius <= 1.2);
  }
});

test('physical props are offset from the walkable interaction anchor', () => {
  for (const s of LEARNING_STATIONS) {
    const d = Math.hypot(s.position.x-s.propPosition.x,s.position.z-s.propPosition.z);
    assert.ok(Number.isFinite(d) && d >= .4 && d <= s.radius, s.id);
  }
});
test('precept dialogue distinguishes suttas from ceremony and never confers precepts', () => {
  assert.equal(WELCOME_DIALOGUE_BRANCHES.length, 3);
  const ids = new Set(LESSONS.map(l => l.id));
  for (const b of WELCOME_DIALOGUE_BRANCHES) {
    assert.equal(b.isAdaptation, true); assert.match(b.reflection, /หากต้องการ/);
    assert.ok(b.sources.length > 0);
    for (const id of b.lessonIds) assert.ok(ids.has(id));
    for (const source of b.sources) {
      const u = new URL(source.url); assert.equal(u.protocol, 'https:'); assert.equal(u.hostname, 'www.dhammatalks.org'); assert.equal(u.hash, '');
    }
  }
  const review = WELCOME_DIALOGUE_BRANCHES.find(b=>b.id==='review-five-precepts')!;
  assert.ok(review.sources.some(s=>s.url.endsWith('/AN8_39.html')));
  assert.match(review.sourceNote, /ไม่ใช่พิธีรับศีล/);
  const ceremony = WELCOME_DIALOGUE_BRANCHES.find(b=>b.id==='requesting-precepts')!;
  assert.equal(ceremony.sources[0].kind, 'ceremonial-guide');
  assert.match(ceremony.sourceNote, /ไม่ได้ประกอบพิธีหรือให้ศีล/);
  assert.match(ceremony.sourceNote, /ไม่บังคับพิธี/);
});
