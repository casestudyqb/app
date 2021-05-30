import prisma from '../../../lib/prisma'
import { getSession } from "next-auth/client";

// POST /api/note
export default async function handle(req, res) {
  const { content, segmentId, segmentNoteId } = req.body;

  console.log("content", content, "segID", segmentId, "segNoteId", segmentNoteId)

  const { userId } = await getSession({ req });
  const result = await prisma.segmentNote.upsert({
    where: {id: segmentNoteId},
    update: {noteText: content},
    create: {noteText: content, authorId: Number(userId), segmentId}
  });
  res.json(result);
}