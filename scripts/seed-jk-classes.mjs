/**
 * Replaces the class list with classes 8, 9 and 10.
 *
 * By default the classes are created at one school. Pass a site code to choose
 * a different one, or "all" to roll them out to every school:
 *
 *   node scripts/seed-jk-classes.mjs             # SITE-01
 *   node scripts/seed-jk-classes.mjs SITE-03
 *   node scripts/seed-jk-classes.mjs all
 *
 * Back up first:  npm run db:backup
 */
const BASE = process.env.LMS_API_BASE ?? 'http://localhost:4000/api';
const EMAIL = process.env.LMS_ADMIN_EMAIL ?? 'admin@lms.gov.in';
const PASSWORD = process.env.LMS_ADMIN_PASSWORD ?? 'Password@123';

const CLASSES = [
  { name: 'Class 8', level: 8 },
  { name: 'Class 9', level: 9 },
  { name: 'Class 10', level: 10 },
];

const target = process.argv[2] ?? 'SITE-01';

const call = async (method, path, token, body) => {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  let json = null;
  try {
    json = await res.json();
  } catch {}
  return { status: res.status, json };
};

const auth = await call('POST', '/auth/login', null, { identifier: EMAIL, password: PASSWORD });
if (!auth.json?.accessToken) throw new Error(`Could not sign in as ${EMAIL}: ${auth.status}`);
const token = auth.json.accessToken;

const sites = (await call('GET', '/sites', token)).json ?? [];
const chosen =
  target === 'all' ? sites : sites.filter((s) => s.code === target);
if (!chosen.length) throw new Error(`No school with code ${target}.`);

const years = (await call('GET', '/academic-years', token)).json ?? [];
const year = years.find((y) => y.isCurrent) ?? years[0];
if (!year) throw new Error('Add an academic year first, under Academic Structure.');

const existing = (await call('GET', '/classes', token)).json ?? [];
const allBatches = (await call('GET', '/batches', token)).json ?? [];

console.log(`Removing ${existing.length} existing class(es)…`);
for (const cls of existing) {
  // A class cannot go while it still has sections, so clear the empty ones
  // first. A section holding learners is left alone and reported below.
  for (const batch of allBatches.filter((b) => b.classId === cls.id)) {
    const gone = await call('DELETE', `/batches/${batch.id}`, token);
    if (gone.status !== 200) {
      console.log(`  kept section ${batch.name}  ${JSON.stringify(gone.json?.message)}`);
    }
  }

  const res = await call('DELETE', `/classes/${cls.id}`, token);
  const where = cls.site?.name ? ` (${cls.site.name})` : '';
  console.log(
    `  ${res.status === 200 ? 'removed' : `FAILED (${res.status})`}  ${cls.name}${where}` +
      (res.status === 200 ? '' : `  ${JSON.stringify(res.json?.message)}`),
  );
}

console.log(`\nAdding classes at ${chosen.length} school(s)…`);
for (const site of chosen) {
  for (const cls of CLASSES) {
    const res = await call('POST', '/classes', token, {
      academicYearId: year.id,
      siteId: site.id,
      name: cls.name,
      level: cls.level,
    });
    console.log(
      `  ${res.status === 201 ? 'added  ' : `FAILED (${res.status})`}  ${cls.name} — ${site.name}`,
    );
  }
}

const after = (await call('GET', '/classes', token)).json ?? [];
console.log(`\nThe portal now lists ${after.length} class(es):`);
for (const c of after) console.log(`  ${c.name.padEnd(10)} ${c.site?.name ?? ''}`);
