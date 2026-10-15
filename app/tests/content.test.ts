import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LESSONS, LEARNING_ROUTES, TEACHING_POLICY, CONTENT_NOTICE } from '../src/content.ts';
test('catalog has 11 distinct source discourses and seven MN107 themes', () => {
  assert.equal(new Set(LESSONS.map(l => l.sourceUrl)).size, 11);
  assert.equal(LESSONS.filter(l => l.id.startsWith('mn107-')).length, 7);
  assert.equal(LESSONS.filter(l => l.tier === 'optional').length, 7);
  assert.equal(new Set(LESSONS.map(l => l.id)).size, LESSONS.length);
});
test('every lesson preserves provenance, adaptation and context', () => {
  const hosts = new Set(['www.dhammatalks.org', 'accesstoinsight.org', 'bhantesuddhaso.com']);
  for (const l of LESSONS) {
    const url = new URL(l.sourceUrl);
    assert.equal(url.protocol, 'https:'); assert.ok(hosts.has(url.hostname)); assert.equal(url.hash, '');
    assert.equal(l.verified, true); assert.equal(l.isAdaptation, true);
    assert.match(l.adaptationLabel, /ประยุกต์/); assert.match(l.adaptationLabel, /ข้าม/);
    assert.ok(l.sourceSummary && l.sourceLabel && l.title && l.topic);
    assert.ok(['monastic', 'lay'].includes(l.context)); assert.ok(l.limits.length >= 4);
    assert.match(l.adaptationActivity, /หากต้องการ/);
    for (const z of l.zoneIds) assert.match(z, /^Z0[1-7]$/);
  }
});
test('five modern routes resolve every lesson without gates or assessments', () => {
  assert.equal(LEARNING_ROUTES.length, 5);
  const ids = new Set(LESSONS.map(l => l.id));
  const referenced = new Set<string>();
  for (const r of LEARNING_ROUTES) {
    assert.equal(r.isModernFramework, true); assert.match(r.description, /สมัยใหม่/);
    for (const id of r.lessonIds) { assert.ok(ids.has(id)); referenced.add(id); }
    for (const field of ['score', 'requiredScore', 'locked', 'prerequisites']) assert.ok(!(field in r));
  }
  assert.equal(referenced.size, LESSONS.length);
});
test('sensitive practice boundaries and edition difference remain explicit', () => {
  const limits = (id: string) => LESSONS.find(l => l.id === id)!.limits.join(' ');
  assert.match(limits('mn107-food'), /ไม่กำหนดปริมาณอาหาร/);
  assert.match(limits('mn107-wakefulness'), /ไม่ลดเวลานอน/);
  assert.match(limits('mn118'), /ไม่กลั้นหรือบังคับลมหายใจ/);
  assert.match(limits('mn107-jhana'), /ไม่ทดสอบหรือรับรองฌาน/);
  assert.match(LESSONS.find(l => l.id === 'an3-kalama')!.sourceLabel, /3:66.*3.65/);
  assert.match(CONTENT_NOTICE, /ไม่มีคะแนน/);
  assert.equal(TEACHING_POLICY.sourceUrl, LESSONS.find(l => l.id === 'an5-159')!.sourceUrl);
});
