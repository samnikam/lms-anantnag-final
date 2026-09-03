/**
 * Replaces the subject list with the scheme of studies followed by government
 * schools in Srinagar — JKBOSE, classes 8 to 10.
 *
 * Every existing subject is deleted first, so the portal shows this list and
 * nothing else. Deleting a subject takes its content and enrolments with it;
 * past broadcasts, timetable entries and questions in the bank are detached
 * rather than destroyed.
 *
 * Run:  node scripts/seed-jk-subjects.mjs
 * Back up first:  npm run db:backup
 */
const BASE = process.env.LMS_API_BASE ?? 'http://localhost:4000/api';
const EMAIL = process.env.LMS_ADMIN_EMAIL ?? 'admin@lms.gov.in';
const PASSWORD = process.env.LMS_ADMIN_PASSWORD ?? 'Password@123';

/**
 * Core subjects are taken by every learner in classes 8-10. The languages
 * below them are the school's optional/additional offerings.
 */
const SUBJECTS = [
  { code: 'ENG', title: 'English', description: 'Core language, classes 8 to 10.' },
  { code: 'URD', title: 'Urdu', description: 'Core language, classes 8 to 10.' },
  { code: 'HIN', title: 'Hindi', description: 'Core language, classes 8 to 10.' },
  { code: 'MATH', title: 'Mathematics', description: 'Core subject, classes 8 to 10.' },
  { code: 'SCI', title: 'Science', description: 'Physics, Chemistry and Biology, classes 8 to 10.' },
  {
    code: 'SST',
    title: 'Social Science',
    description: 'History, Geography, Civics and Economics, classes 8 to 10.',
  },
  { code: 'KAS', title: 'Kashmiri', description: 'Regional language.' },
  { code: 'CS', title: 'Computer Science', description: 'Elective, classes 9 and 10.' },
  { code: 'HPE', title: 'Health and Physical Education', description: 'Compulsory activity subject.' },
  { code: 'ART', title: 'Art Education', description: 'Compulsory activity subject.' },
  { code: 'ARB', title: 'Arabic', description: 'Additional language, optional.' },
  { code: 'PER', title: 'Persian', description: 'Additional language, optional.' },
];

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

const login = async () => {
  const res = await call('POST', '/auth/login', null, {
    identifier: EMAIL,
    password: PASSWORD,
  });
  if (!res.json?.accessToken) throw new Error(`Could not sign in as ${EMAIL}: ${res.status}`);
  return res.json.accessToken;
};

const token = await login();

const existing = (await call('GET', '/courses?limit=200', token)).json?.items ?? [];
console.log(`Removing ${existing.length} existing subject(s)…`);
for (const course of existing) {
  const res = await call('DELETE', `/courses/${course.id}`, token);
  console.log(`  ${res.status === 200 ? 'removed' : `FAILED (${res.status})`}  ${course.title}`);
}

console.log(`\nAdding ${SUBJECTS.length} subject(s)…`);
for (const subject of SUBJECTS) {
  const res = await call('POST', '/courses', token, subject);
  console.log(`  ${res.status === 201 ? 'added  ' : `FAILED (${res.status})`}  ${subject.title}`);
}

const after = (await call('GET', '/courses?limit=200', token)).json?.items ?? [];
console.log(`\nThe portal now lists ${after.length} subject(s):`);
for (const c of after) console.log(`  ${c.code.padEnd(6)} ${c.title}`);
