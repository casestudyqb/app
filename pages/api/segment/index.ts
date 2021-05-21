import prisma from '../../../lib/prisma'
import { getSession } from "next-auth/client";


// POST /api/segment
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, description, url, image, episodeId, segmentId } = req.body;

  console.log("episode id", episodeId)

  const session = await getSession({ req });
  const { userId } = session;

  const result = await prisma.segment.create({
    data: {
      title,
      description,
      url,
      image,
      starRating: 1,//deleate and add default 0 value
      episode: { connect: { id: 1 }},
      segmentType: { connect: { id: segmentId }},
      createdBy: { connect: { id: Number(userId)}}
    },
  });
  res.json(result);
}