import prisma from '../../../lib/prisma'
import { getSession } from "next-auth/client";

// POST /api/like
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { segmentId } = req.body;

  const session = await getSession({ req });
  const { userId } = session;

  const isAssigned = await prisma.segment.findUnique({
    where: {
      id: segmentId,
    },
  })

  let result;

  if (!isAssigned.assignedId ){
     result = await prisma.segment.update({
      where: { id: segmentId },
      data: { assignedId: userId},
      include: {
        assignedTo: {
          select: {
            name: true,
            image: true
          }
        }
      },
    })
  } else {
     result = await prisma.segment.update({
      where: { id: segmentId },
      data: { assignedId: null},
    })
  }

    res.json(result)
}