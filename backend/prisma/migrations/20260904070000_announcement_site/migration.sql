-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

