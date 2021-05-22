import prisma from '../../../lib/prisma'
import { getSession } from "next-auth/client";


// POST /api/episode
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { dateAired, description, episodeNum, showId } = req.body;

  const session = await getSession({ req });
  const result = await prisma.episode.create({
    data: {
      episodeNum: 1,
      showId,
      dateAired, 
      description
    },
  });
  res.json(result);
}