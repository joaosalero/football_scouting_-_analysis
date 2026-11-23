const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const model = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
const controller = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

function boot(modelSource = model) {
  const elements = new Map();
  for (const match of html.matchAll(/\bid="([^"]+)"/g)) {
    elements.set(match[1], {
      style: {}, events: {}, children: [], attributes: {},
      setAttribute(name, value) { this.attributes[name] = value; },
      addEventListener(name, callback) { this.events[name] = callback; },
      appendChild(child) { this.children.push(child); },
      getContext() { return new Proxy({}, { get(target, key) { return target[key] ?? (() => {}); } }); },
      width: 520, height: 200,
    });
  }
  let initialize;
  const context = vm.createContext({
    document: {
      getElementById: id => elements.get(id),
      createElement: () => ({}),
      addEventListener(name, callback) { if (name === 'DOMContentLoaded') initialize = callback; },
    },
    window: { addEventListener() {} },
    alert() {},
  });
  // Run the actual model and controller together; the DOM harness needs no browser dependencies.
  vm.runInContext(modelSource.replace(/^export /gm, '') + '\n' + controller.replace(/^import .*?;\s*/, ''), context);
  initialize();
  return { elements, context };
}

test('default rendering uses the historical model and frozen age reference', () => {
  const { elements } = boot();
  assert.equal(elements.get('pName').textContent, 'Désiré Nonka-Maho Doué');
  assert.equal(elements.get('pDob').textContent, '03 Jun 2005');
  assert.equal(elements.get('kpiMp').textContent, '8');
  assert.equal(elements.get('kpiSdrPct').textContent, '28.0%');
  assert.equal(elements.get('pAge').textContent, '20 (ref: 2026-01-12)');
  assert.equal(elements.get('seasonSelect').children.length, 4);
  assert.match(elements.get('chartSdr').attributes['aria-label'], /2025\/26 28%/);
});

test('season selection updates club, age, metrics and interpretation together', () => {
  const { elements } = boot();
  const select = elements.get('seasonSelect');
  select.value = '2023/24';
  select.events.change();
  assert.equal(elements.get('pClub').textContent, 'Stade Rennais');
  assert.equal(elements.get('pAge').textContent, '18 (ref: 2023-08-01)');
  assert.equal(elements.get('kpiMin').textContent, '1632');
  assert.equal(elements.get('kpiSdrPct').textContent, '67.0%');
  assert.match(elements.get('sdrContext').textContent, /not a validated peer-group benchmark/);
  assert.doesNotMatch(elements.get('sdrContext').textContent, /Typical Ligue 1 winger baseline/);
  assert.doesNotMatch(elements.get('sdrContext').textContent, /Top-club winger \(European level\)/);
});

test('changing the model changes the rendered data without a controller dataset', () => {
  assert.match(html, /<script type="module" src="\.\/app\.js"><\/script>/);
  assert.match(controller, /^import \{ CONFIG, PLAYER, SEASONS, SEASON_ORDER \} from "\.\/data\.js";/);
  const { elements } = boot(model.replace('mp: 8, min: 428', 'mp: 9, min: 428').replace('sdrPct: 69.0', 'sdrPct: 70.0'));
  assert.equal(elements.get('kpiMp').textContent, '9');
  assert.match(elements.get('chartSdr').attributes['aria-label'], /2022\/23 70%/);
});
