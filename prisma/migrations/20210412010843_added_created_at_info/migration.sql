-- CreateTable
CREATE TABLE "_SegmentCreatedBy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Segment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Episode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "episodeNum" INTEGER NOT NULL,
    "showId" INTEGER NOT NULL,
    "description" TEXT,
    "dateAired" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("showId") REFERENCES "Show" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Episode" ("id", "episodeNum", "showId", "description", "dateAired") SELECT "id", "episodeNum", "showId", "description", "dateAired" FROM "Episode";
DROP TABLE "Episode";
ALTER TABLE "new_Episode" RENAME TO "Episode";
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
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("episodeId") REFERENCES "Episode" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("segmentId") REFERENCES "SegmentType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Segment" ("id", "title", "description", "url", "image", "starRating", "draft", "episodeId", "segmentId") SELECT "id", "title", "description", "url", "image", "starRating", "draft", "episodeId", "segmentId" FROM "Segment";
DROP TABLE "Segment";
ALTER TABLE "new_Segment" RENAME TO "Segment";
CREATE UNIQUE INDEX "Segment.segmentId_unique" ON "Segment"("segmentId");
CREATE TABLE "new_SegmentNote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "noteText" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SegmentNote" ("id", "noteText", "authorId") SELECT "id", "noteText", "authorId" FROM "SegmentNote";
DROP TABLE "SegmentNote";
ALTER TABLE "new_SegmentNote" RENAME TO "SegmentNote";
CREATE TABLE "new_SegmentPicUrl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "segmentId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("segmentId") REFERENCES "Segment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SegmentPicUrl" ("id", "url", "segmentId") SELECT "id", "url", "segmentId" FROM "SegmentPicUrl";
DROP TABLE "SegmentPicUrl";
ALTER TABLE "new_SegmentPicUrl" RENAME TO "SegmentPicUrl";
CREATE TABLE "new_Show" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "picUrl" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Show" ("id", "name", "description", "picUrl") SELECT "id", "name", "description", "picUrl" FROM "Show";
DROP TABLE "Show";
ALTER TABLE "new_Show" RENAME TO "Show";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_SegmentCreatedBy_AB_unique" ON "_SegmentCreatedBy"("A", "B");

-- CreateIndex
CREATE INDEX "_SegmentCreatedBy_B_index" ON "_SegmentCreatedBy"("B");
