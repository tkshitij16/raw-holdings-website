import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
test('homepage follows required content sequence', () => {
  const page = read('app/page.tsx');
  const labels = [
    '01 / CAPABILITIES',
    '02 / PROJECT SUPPORT',
    '03 / WHO WE SUPPORT',
    '04 / PAST PERFORMANCE',
    '05 / PROCUREMENT',
    '06 / LEADERSHIP',
    '07 / CONTACT',
  ];
  let last = -1;
  for (const label of labels) {
    const next = page.indexOf(label);
    assert.ok(next > last, `${label} is missing or out of order`);
    last = next;
  }
});
test('hero leads with RAW Holdings and uses a text-free Chicago map', () => {
  const page = read('app/page.tsx');
  assert.match(page, /RAW HOLDINGS/);
  assert.match(page, /hero-map/);
  assert.match(read('src/content/media.ts'), /chicago-map-no-text\.png/);
  assert.doesNotMatch(page, /hero-media/);
});
test('primary routes exist in navigation and footer', () => {
  const nav = read('src/content/navigation.ts');
  for (const route of ['/capabilities', '/past-performance', '/about'])
    assert.match(nav, new RegExp(route));
});
test('contact form uses schema validation and demo confirmation', () => {
  const form = read('components/contact-form.tsx');
  assert.match(form, /z\.object/);
  assert.match(form, /Demo form validated successfully/);
});
test('all capability anchors are rendered', () => {
  const data = read('src/content/capabilities.ts');
  for (const id of [
    'vendor',
    'compliance',
    'site-operations',
    'project-administration',
  ])
    assert.match(data, new RegExp(`id: '${id}'`));
});
test('Three.js hero scene responds to scroll and respects reduced motion', () => {
  const pkg = JSON.parse(read('package.json'));
  const scene = read('components/hero-map-scene.tsx');
  assert.equal(typeof pkg.dependencies?.three, 'string');
  assert.match(scene, /addEventListener\('scroll'/);
  assert.match(scene, /prefers-reduced-motion/);
  assert.match(scene, /camera\.position\.set/);
});
