-- An unselected school dropdown once posted '' rather than nothing, and the
-- empty string was stored as-is. Such a row is neither at a school nor
-- division-wide, so it matched neither arm of the teacher/learner scoping
-- clause (`siteId = mine OR siteId IS NULL`) and vanished from the timetable
-- of the very class it was scheduled for, while remaining visible to an admin.
--
-- Blank the strings back to NULL, which is what "every school" already means
-- everywhere else in this column.
UPDATE "CalendarEvent" SET "siteId" = NULL WHERE "siteId" = '';
