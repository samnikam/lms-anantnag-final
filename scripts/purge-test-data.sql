-- Removes records created by the API smoke suites, which were run against the
-- live database. Everything targeted here carries a machine-generated marker:
-- a five-digit run tag, or a fixture name no person would type.
--
-- Records created through the UI are left alone, including subjects whose code
-- ends in a three-digit suffix — those come from the "New subject" quick-create,
-- so they may well be yours. Delete any you do not want from the Subjects page.
--
-- Take a backup first:  npm run db:backup
-- Then run:             npm run db:purge-test-data
BEGIN;

CREATE TEMP TABLE junk_course AS
  SELECT id FROM "Course"
   WHERE code ~ '(TTOWN|TTX|WF[0-9]|PCC?[0-9]|EDIT[0-9]|AAS[0-9]|ATT[0-9]|-[0-9]{5})';

CREATE TEMP TABLE junk_class AS
  SELECT id FROM "SchoolClass"
   WHERE name ~ '[0-9]{5}' OR name ~ '^(AttClass|CT Class|Own )';

CREATE TEMP TABLE junk_site AS
  SELECT id FROM "Site" WHERE code LIKE 'SETUP%';

CREATE TEMP TABLE junk_batch AS
  SELECT id FROM "Batch"
   WHERE name ~ '[0-9]{5}'
      OR "classId" IN (SELECT id FROM junk_class)
      OR "siteId" IN (SELECT id FROM junk_site);

CREATE TEMP TABLE junk_user AS
  SELECT id FROM "User"
   WHERE email ~ '[0-9]{5}@'
      OR "fullName" ~ '[0-9]{5}'
      OR "fullName" IN ('Legit Student', 'Legit Teacher', 'SA Made', 'Payload User',
                        'Scoped Student', 'Att Learner')
      OR "siteId" IN (SELECT id FROM junk_site);

CREATE TEMP TABLE junk_event AS
  SELECT id FROM "CalendarEvent"
   WHERE title ~ '[0-9]{5}'
      OR title ~ '(fixture|Payload|Workflow|Unrelated)'
      OR title IN ('First slot', 'Second slot', 'Own site entry', 'Teacher course entry',
                   'WF Session', 'Smoke test broadcast', 'TT 9947')
      OR "courseId" IN (SELECT id FROM junk_course)
      OR "classId" IN (SELECT id FROM junk_class)
      OR "batchId" IN (SELECT id FROM junk_batch)
      OR "siteId" IN (SELECT id FROM junk_site);

CREATE TEMP TABLE junk_room AS
  SELECT id FROM "Classroom"
   WHERE name ~ '[0-9]{5}' OR "siteId" IN (SELECT id FROM junk_site);

CREATE TEMP TABLE junk_session AS
  SELECT id FROM "LiveSession"
   WHERE "courseId" IN (SELECT id FROM junk_course)
      OR "batchId" IN (SELECT id FROM junk_batch)
      OR title ~ '[0-9]{5}';

-- Leaves first, roots last.
DELETE FROM "Attendance"
 WHERE "studentId" IN (SELECT id FROM junk_user)
    OR "eventId" IN (SELECT id FROM junk_event)
    OR "sessionId" IN (SELECT id FROM junk_session);
DELETE FROM "EnrollmentHistory"
 WHERE "studentId" IN (SELECT id FROM junk_user)
    OR "courseId" IN (SELECT id FROM junk_course)
    OR "batchId" IN (SELECT id FROM junk_batch);
DELETE FROM "Enrollment"
 WHERE "studentId" IN (SELECT id FROM junk_user)
    OR "courseId" IN (SELECT id FROM junk_course)
    OR "batchId" IN (SELECT id FROM junk_batch);
DELETE FROM "ClassSubject"
 WHERE "classId" IN (SELECT id FROM junk_class)
    OR "courseId" IN (SELECT id FROM junk_course);
DELETE FROM "CourseTeacher"
 WHERE "courseId" IN (SELECT id FROM junk_course)
    OR "teacherId" IN (SELECT id FROM junk_user);
DELETE FROM "CalendarEvent" WHERE id IN (SELECT id FROM junk_event);
DELETE FROM "LiveSession" WHERE id IN (SELECT id FROM junk_session);
DELETE FROM "Device" WHERE "classroomId" IN (SELECT id FROM junk_room);
DELETE FROM "Classroom" WHERE id IN (SELECT id FROM junk_room);
DELETE FROM "Batch" WHERE id IN (SELECT id FROM junk_batch);
UPDATE "SchoolClass" SET "classTeacherId" = NULL
 WHERE "classTeacherId" IN (SELECT id FROM junk_user);
DELETE FROM "SchoolClass" WHERE id IN (SELECT id FROM junk_class);
DELETE FROM "Course" WHERE id IN (SELECT id FROM junk_course);
DELETE FROM "User" WHERE id IN (SELECT id FROM junk_user);
DELETE FROM "Site" WHERE id IN (SELECT id FROM junk_site);

COMMIT;
