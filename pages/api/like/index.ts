import prisma from '../../../lib/prisma'
import { getSession } from "next-auth/client";

// POST /api/like
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { likes, segmentId } = req.body;

  const session = await getSession({ req });
  const { userId } = session;

  // const numOfLikes = await prisma.like.groupBy({
  //   by: ['segmentId'],
  //     where: {
  //       segmentId: {
  //         in: segmentId,
  //       },
  //     },
  //     _sum: {
  //       userId: true,
  //     }
  // })

  const getLikes = await prisma.like.groupBy({
    by: ['segmentId', 'userId', 'createdAt', 'id'],
    where: {
      segmentId: {
        in: segmentId
      }
    }
  })

  const oneLike = getLikes.filter(oneLike => oneLike.userId === userId)

  if (oneLike.length >= 1) {
    const result = await prisma.like.delete({
        where: {
          id: oneLike[0].id
        }
      }).then(async () => await prisma.like.groupBy({
        by: ['segmentId', 'userId', 'createdAt', 'id'],
        where: {
          segmentId: {
            in: segmentId
          }
        }
      }));

    //console.log("result", result)
    res.json(result)

  } else {
    const result = await prisma.like.create({
        data: {
          segmentId,
          userId: Number(userId)
        }
    }).then(async () => await prisma.like.groupBy({
      by: ['segmentId', 'userId', 'createdAt', 'id'],
      where: {
        segmentId: {
          in: segmentId
        }
      }
    }));

    //console.log("result", result)
    res.json(result)
  }
}