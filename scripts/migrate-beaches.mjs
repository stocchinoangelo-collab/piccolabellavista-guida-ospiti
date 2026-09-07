import fs from 'node:fs';
import path from 'node:path';

const sourcePath = path.resolve('js/data.js');
const outDir = path.resolve('data/concierge');
const outPath = path.join(outDir, 'beaches.generated.json');

const source = fs.readFileSync(sourcePath, 'utf8');

function extractArrayConst(code, constName) {
  const marker = `const ${constName} =`;
  const start = code.indexOf(marker);
  if (start < 0) throw new Error(`Missing ${marker}`);
  const arrayStart = code.indexOf('[', start + marker.length);
  if (arrayStart < 0) throw new Error(`Missing array start for ${constName}`);

  let depth = 0;
  let inString = false;
  let quote = '';
  let escaped = false;

  for (let i = arrayStart; i < code.length; i += 1) {
    const ch = code[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'") {
      inString = true;
      quote = ch;
      continue;
    }
    if (ch === '[') depth += 1;
    if (ch === ']') {
      depth -= 1;
      if (depth === 0) return code.slice(arrayStart, i + 1);
    }
  }
  throw new Error(`Unclosed array for ${constName}`);
}

function i18n(value, fallback = '') {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return {
      it: String(value.it ?? fallback),
      ...(value.en ? { en: String(value.en) } : {}),
      ...(value.de ? { de: String(value.de) } : {})
    };
  }
  return { it: String(value ?? fallback) };
}

const raw = extractArrayConst(source, 'BEACHES');
const beaches = JSON.parse(raw);

const migrated = beaches.map((b) => ({
  id: b.id,
  type: 'beach',
  status: 'draft',
  access: 'guest',
  name: b.name,
  summary: i18n(b.desc, b.name),
  description: i18n(b.go),
  tags: Array.isArray(b.tags) ? [...b.tags] : [],
  audience: [],
  location: {
    ...(Array.isArray(b.coords) && b.coords.length === 2
      ? { lat: b.coords[0], lng: b.coords[1] }
      : {})
  },
  mobility: {
    carRequired: true,
    publicTransportFriendly: false,
    walkingFriendly: false,
    ...(Number.isInteger(b.driveMin) ? { driveMin: b.driveMin } : {})
  },
  budget: 'variable',
  timeOfDay: ['any'],
  weather: {
    ...(b.wind && typeof b.wind === 'object' ? { windSuitability: b.wind } : {})
  },
  editorial: {
    whyWeRecommend: i18n(b.desc, b.name),
    guestNote: i18n(b.avoid)
  },
  verification: {
    status: 'unverified',
    notes: 'Migrated mechanically from legacy js/data.js. Operational claims, wind advice, access rules, parking, services and timings require human/source verification before publication.'
  },
  migration: {
    source: 'js/data.js#BEACHES',
    reviewRequired: true,
    legacy: {
      facing: b.facing ?? null,
      driveKm: b.driveKm ?? null,
      crowd: b.crowd ?? null,
      beachType: b.type ?? null,
      bestSeason: b.best ?? null,
      parking: b.parking ?? null,
      services: b.services ?? null,
      access: b.access ?? null,
      food: b.food ?? null,
      trails: b.trails ?? null,
      go: b.go ?? null,
      avoid: b.avoid ?? null
    }
  }
}));

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(migrated, null, 2)}\n`, 'utf8');

const ids = new Set();
const duplicates = [];
for (const item of migrated) {
  if (ids.has(item.id)) duplicates.push(item.id);
  ids.add(item.id);
}

console.log(`Legacy beaches found: ${beaches.length}`);
console.log(`Migrated draft records: ${migrated.length}`);
console.log(`Duplicate IDs: ${duplicates.length ? duplicates.join(', ') : 'none'}`);
console.log(`Output: ${path.relative(process.cwd(), outPath)}`);
