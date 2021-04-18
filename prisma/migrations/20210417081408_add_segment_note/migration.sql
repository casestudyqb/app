/*
  Warnings:

  - Added the required column `segmentId` to the `SegmentNote` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SegmentNote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "noteText" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "segmentId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("segmentId") REFERENCES "Segment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SegmentNote" ("id", "noteText", "authorId", "created_at", "updated_at") SELECT "id", "noteText", "authorId", "created_at", "updated_at" FROM "SegmentNote";
DROP TABLE "SegmentNote";
ALTER TABLE "new_SegmentNote" RENAME TO "SegmentNote";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
