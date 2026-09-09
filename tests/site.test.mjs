import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read=(path)=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
test('homepage follows required content sequence',()=>{const page=read('app/page.tsx');const labels=['01 / CAPABILITIES','02 / PROJECT SUPPORT','03 / WHO WE SUPPORT','04 / PAST PERFORMANCE','05 / PROCUREMENT','06 / LEADERSHIP','07 / CONTACT'];let last=-1;for(const label of labels){const next=page.indexOf(label);assert.ok(next>last,`${label} is missing or out of order`);last=next}});
test('primary routes exist in navigation and footer',()=>{const nav=read('src/content/navigation.ts');for(const route of ['/capabilities','/past-performance','/about'])assert.match(nav,new RegExp(route))});
test('contact form uses schema validation and demo confirmation',()=>{const form=read('components/contact-form.tsx');assert.match(form,/z\.object/);assert.match(form,/Demo form validated successfully/)});
test('all capability anchors are rendered',()=>{const data=read('src/content/capabilities.ts');for(const id of ['vendor','compliance','site-operations','project-administration'])assert.match(data,new RegExp(`id: '${id}'`))});
test('prohibited 3D dependencies are absent',()=>{const pkg=JSON.parse(read('package.json'));for(const name of ['three','@react-three/fiber','@react-three/drei'])assert.equal(pkg.dependencies?.[name],undefined)});
