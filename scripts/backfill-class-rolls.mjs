/**
 * Puts existing learners onto their class rolls.
 *
 * Class membership used to be inferred from per-subject enrolments. Now it is
 * recorded directly, so learners enrolled before that change belong to no
 * class and cannot appear on a register. This reconstructs the membership from
 * the enrolments they already hold: a learner actively enrolled in a subject
 * that a class studies belongs to that class.
 *
 * Safe to re-run — it only adds what is missing.
 *
 * Run:  node scripts/backfill-class-rolls.mjs
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const classes = await prisma.schoolClass.findMany({
  include: {
    subjects: { select: { courseId: true } },
    site: { select: { name: true } },
  },
});

let added = 0;

for (const cls of classes) {
  if (cls.subjects.length === 0) {
    console.log(`  ${cls.site.name} / ${cls.name}: no subjects, nothing to infer`);
    continue;
  }

  const enrolled = await prisma.enrollment.findMany({
    where: {
      status: 'ACTIVE',
      courseId: { in: cls.subjects.map((s) => s.courseId) },
    },
    select: { studentId: true, batchId: true },
    distinct: ['studentId'],
  });

  let forThisClass = 0;
  for (const e of enrolled) {
    const result = await prisma.classEnrollment.upsert({
      where: { classId_studentId: { classId: cls.id, studentId: e.studentId } },
      create: { classId: cls.id, studentId: e.studentId, batchId: e.batchId },
      update: {},
    });
    if (result) forThisClass++;
  }

  added += forThisClass;
  console.log(`  ${cls.site.name} / ${cls.name}: ${forThisClass} learner(s) on the roll`);
}

const total = await prisma.classEnrollment.count();
console.log(`\nClass rolls now hold ${total} membership record(s).`);

await prisma.$disconnect();
