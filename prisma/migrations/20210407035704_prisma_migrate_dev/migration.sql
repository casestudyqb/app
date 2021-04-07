/*
  Warnings:

  - Added the required column `picUrl` to the `Show` table without a default value. This is not possible if the table is not empty.

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
    "draft" TEXT NOT NULL,
    "episodeId" INTEGER NOT NULL,
    "segmentId" INTEGER NOT NULL,
    FOREIGN KEY ("episodeId") REFERENCES "Episode" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("segmentId") REFERENCES "SegmentType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Segment" ("id", "title", "description", "url", "image", "starRating", "draft", "episodeId", "segmentId") SELECT "id", "title", "description", "url", "image", "starRating", "draft", "episodeId", "segmentId" FROM "Segment";
DROP TABLE "Segment";
ALTER TABLE "new_Segment" RENAME TO "Segment";
CREATE UNIQUE INDEX "Segment.segmentId_unique" ON "Segment"("segmentId");
CREATE TABLE "new_Show" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "picUrl" TEXT NOT NULL
);
INSERT INTO "new_Show" ("id", "name", "description") SELECT "id", "name", "description" FROM "Show";
DROP TABLE "Show";
ALTER TABLE "new_Show" RENAME TO "Show";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
