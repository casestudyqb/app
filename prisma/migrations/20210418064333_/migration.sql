/*
  Warnings:

  - You are about to alter the column `draft` on the `Segment` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Segment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "starRating" INTEGER NOT NULL,
    "draft" BOOLEAN NOT NULL DEFAULT true,
    "episodeId" INTEGER NOT NULL,
    "segmentId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("episodeId") REFERENCES "Episode" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("segmentId") REFERENCES "SegmentType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Segment" ("id", "title", "description", "url", "image", "starRating", "draft", "episodeId", "segmentId", "created_at", "updated_at") SELECT "id", "title", "description", "url", "image", "starRating", "draft", "episodeId", "segmentId", "created_at", "updated_at" FROM "Segment";
DROP TABLE "Segment";
ALTER TABLE "new_Segment" RENAME TO "Segment";
CREATE UNIQUE INDEX "Segment.segmentId_unique" ON "Segment"("segmentId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
