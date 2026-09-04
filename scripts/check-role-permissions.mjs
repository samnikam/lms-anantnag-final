/**
 * Proves the role boundaries hold at the API, not just in the sidebar.
 *
 * Every case here is an attempt to do something through the API that the
 * signed-in role should not be able to do — the sort of thing a hidden menu
 * item does nothing to prevent.
 *
 * Run with the portal running:  node scripts/check-role-permissions.mjs
 */
const BASE = process.env.LMS_API_BASE ?? 'http://localhost:4000/api';
const PASSWORD = 'Password@123';

let pass = 0;
let fail = 0;

const ok = (name, condition, detail = '') => {
  condition ? pass++ : fail++;
  console.log(`  ${condition ? 'PASS' : 'FAIL'}  ${name}${condition ? '' : '   → ' + detail}`);
};

const login = async (identifier) => {
  const res = await fetch(BASE + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password: PASSWORD }),
  });
  const json = await res.json();
  if (!json.accessToken) throw new Error(`Could not sign in as ${identifier}`);
  return json.accessToken;
};

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

const denied = (r) => r.status === 401 || r.status === 403;

const tokens = {
  superAdmin: await login('admin@lms.gov.in'),
  academicAdmin: await login('academic@lms.gov.in'),
  teacher: await login('teacher@lms.gov.in'),
  student: await login('student@lms.gov.in'),
  parent: await login('parent@lms.gov.in'),
};

// Fixtures read as the Super Admin, who may see everything.
const classes = (await call('GET', '/classes', tokens.superAdmin)).json;
const courses = (await call('GET', '/courses?limit=50', tokens.superAdmin)).json.items;
const events = (await call('GET', '/calendar', tokens.superAdmin)).json;
const someClass = classes[0];
const someCourse = courses[0];
const someEvent = events[0];

console.log('\n── The timetable belongs to the academic office ──');
{
  const r = await call('POST', '/calendar', tokens.teacher, {
    title: 'Teacher tries to schedule',
    type: 'CLASS',
    startAt: new Date(Date.now() + 864e5).toISOString(),
    endAt: new Date(Date.now() + 864e5 + 36e5).toISOString(),
  });
  ok('a teacher cannot create a timetable entry', denied(r), r.status);
}
if (someEvent) {
  ok(
    'a teacher cannot edit one',
    denied(await call('PATCH', `/calendar/${someEvent.id}`, tokens.teacher, { title: 'Hijacked' })),
  );
  ok(
    'a teacher cannot delete one',
    denied(await call('DELETE', `/calendar/${someEvent.id}`, tokens.teacher)),
  );
}
ok(
  'a student cannot create one',
  denied(
    await call('POST', '/calendar', tokens.student, {
      title: 'x',
      type: 'CLASS',
      startAt: new Date().toISOString(),
      endAt: new Date().toISOString(),
    }),
  ),
);
ok(
  'a teacher may still read their timetable',
  (await call('GET', '/calendar', tokens.teacher)).status === 200,
);

console.log('\n── The scheme of studies belongs to the academic office ──');
ok(
  'a teacher cannot create a subject',
  denied(await call('POST', '/courses', tokens.teacher, { title: 'Teacher Subject', code: 'TS1' })),
);
if (someCourse) {
  ok(
    'a teacher cannot rename a subject',
    denied(await call('PATCH', `/courses/${someCourse.id}`, tokens.teacher, { title: 'Renamed' })),
  );
  ok(
    'a teacher cannot delete a subject',
    denied(await call('DELETE', `/courses/${someCourse.id}`, tokens.teacher)),
  );
}
ok(
  'an academic admin still can create one',
  (await call('POST', '/courses', tokens.academicAdmin, {
    title: 'Permission probe',
    code: 'PROBE-' + (Date.now() % 10000),
  }).then(async (r) => {
    if (r.json?.id) await call('DELETE', `/courses/${r.json.id}`, tokens.academicAdmin);
    return r;
  })).status === 201,
);

console.log('\n── A class is not a teacher’s to shape ──');
ok(
  'a teacher cannot create a class',
  denied(
    await call('POST', '/classes', tokens.teacher, {
      academicYearId: someClass.academicYearId,
      siteId: someClass.siteId,
      name: 'Teacher Class',
    }),
  ),
);
ok(
  'a teacher cannot put a subject on a class',
  denied(
    await call('POST', `/classes/${someClass.id}/subjects`, tokens.teacher, {
      courseId: someCourse.id,
    }),
  ),
);
ok(
  'a teacher cannot enrol a learner',
  denied(
    await call('POST', `/classes/${someClass.id}/enroll`, tokens.teacher, {
      studentIds: ['whoever'],
    }),
  ),
);
ok(
  'a teacher cannot make themselves the class teacher',
  denied(await call('PATCH', `/classes/${someClass.id}`, tokens.teacher, { classTeacherId: null })),
);

console.log('\n── A teacher marks their own register, not the school’s ──');
{
  const mine = (await call('GET', '/attendance/classes', tokens.teacher)).json ?? [];
  const assigned = new Set(
    (await call('GET', '/reports/teacher-workload', tokens.teacher)).json
      ?.filter((r) => r.teacher)
      .map(() => null) ?? [],
  );
  void assigned;

  // Find a class this teacher is demonstrably not assigned to.
  const notMine = [];
  for (const c of mine) {
    const r = await call('GET', `/attendance/classes/${c.id}/roster`, tokens.teacher);
    if (denied(r)) notMine.push(c);
  }
  ok(
    'the class register list is readable',
    Array.isArray(mine),
    'expected an array of classes',
  );
  if (notMine.length) {
    const target = notMine[0];
    ok(`a teacher cannot read the roster of ${target.name}`, true);
    ok(
      `a teacher cannot mark ${target.name}`,
      denied(
        await call('POST', `/attendance/classes/${target.id}/mark`, tokens.teacher, {
          entries: [{ studentId: 'whoever', status: 'PRESENT' }],
        }),
      ),
    );
  } else {
    console.log('  SKIP  no unassigned class to test against (teacher is assigned to all of them)');
  }
}
ok(
  'a student cannot mark a register',
  denied(
    await call('POST', `/attendance/classes/${someClass.id}/mark`, tokens.student, {
      entries: [{ studentId: 'whoever', status: 'PRESENT' }],
    }),
  ),
);
ok(
  'a parent cannot mark a register',
  denied(
    await call('POST', `/attendance/classes/${someClass.id}/mark`, tokens.parent, {
      entries: [{ studentId: 'whoever', status: 'PRESENT' }],
    }),
  ),
);

console.log('\n── System administration belongs to the Super Admin ──');
ok(
  'an academic admin cannot read the audit log',
  denied(await call('GET', '/audit', tokens.academicAdmin)),
);
ok(
  'a teacher cannot read the audit log',
  denied(await call('GET', '/audit', tokens.teacher)),
);
ok(
  'an academic admin cannot create a super admin',
  denied(
    await call('POST', '/users', tokens.academicAdmin, {
      fullName: 'Escalation probe',
      role: 'SUPER_ADMIN',
      password: 'Password@123',
      email: `probe${Date.now()}@t.io`,
    }),
  ),
);
ok(
  'an academic admin cannot create another academic admin',
  denied(
    await call('POST', '/users', tokens.academicAdmin, {
      fullName: 'Escalation probe 2',
      role: 'ACADEMIC_ADMIN',
      password: 'Password@123',
      email: `probe2${Date.now()}@t.io`,
    }),
  ),
);
ok(
  'an academic admin may still add a teacher',
  (await call('GET', '/users/assignable-roles', tokens.academicAdmin)).json?.includes('TEACHER'),
);
ok(
  'a teacher cannot create any account',
  denied(
    await call('POST', '/users', tokens.teacher, {
      fullName: 'x',
      role: 'STUDENT',
      password: 'Password@123',
    }),
  ),
);

console.log('\n── Learners and parents read, they do not write ──');
ok(
  'a student cannot create an assignment',
  denied(
    await call('POST', '/assignments', tokens.student, {
      courseId: someCourse.id,
      title: 'x',
      maxMarks: 10,
    }),
  ),
);
ok(
  'a parent cannot create an assignment',
  denied(
    await call('POST', '/assignments', tokens.parent, {
      courseId: someCourse.id,
      title: 'x',
      maxMarks: 10,
    }),
  ),
);
ok('a student cannot list every user', denied(await call('GET', '/users', tokens.student)));
ok('a parent cannot list every user', denied(await call('GET', '/users', tokens.parent)));

console.log('\n── Cover requests go through the academic office ──');
ok(
  'an academic admin cannot raise a cover request',
  denied(
    await call('POST', '/substitutions', tokens.academicAdmin, {
      eventId: someEvent?.id ?? 'x',
      reason: 'not mine to raise',
    }),
  ),
);
ok(
  'a teacher cannot decide one',
  denied(await call('PATCH', '/substitutions/whatever/decide', tokens.teacher, { approve: true })),
);
ok(
  'a student cannot see the queue',
  denied(await call('GET', '/substitutions', tokens.student)),
);

console.log(`\n${'='.repeat(60)}\n  ${pass} passed, ${fail} failed\n${'='.repeat(60)}`);
process.exit(fail ? 1 : 0);
