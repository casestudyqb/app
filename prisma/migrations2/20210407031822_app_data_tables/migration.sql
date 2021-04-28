-- CreateTable
CREATE TABLE "Show" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "episodeNum" INTEGER NOT NULL,
    "showId" INTEGER NOT NULL,
    FOREIGN KEY ("showId") REFERENCES "Show" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Segment" (
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

-- CreateTable
CREATE TABLE "SegmentType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SegmentNote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "noteText" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SegmentPicUrl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "segmentId" INTEGER NOT NULL,
    FOREIGN KEY ("segmentId") REFERENCES "Segment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_EpisodeParticipants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Episode" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Segment_segmentId_unique" ON "Segment"("segmentId");

-- CreateIndex
CREATE UNIQUE INDEX "_EpisodeParticipants_AB_unique" ON "_EpisodeParticipants"("A", "B");

-- CreateIndex
CREATE INDEX "_EpisodeParticipants_B_index" ON "_EpisodeParticipants"("B");
