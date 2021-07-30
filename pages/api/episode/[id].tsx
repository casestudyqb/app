import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const episodeId = req.query.id

  if (req.method === 'GET') {
    handleGET(episodeId, res)
//   } else if (req.method === 'DELETE') {
//     handleDELETE(episodeId, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/episode/:id
async function handleGET(episodeId, res) {
  const episode = await prisma.episode.findUnique({
    where: {
      id: Number(episodeId) || -1,
    },
    select:{
      id: true,
      episodeNum: true,
      description: true,
      showId: true,
      segments: {
        select: {
          id: true,
          title: true,
          draft: true,
          url: true,
          segmentId: true,
          like: {
            select: {
              id: true,
              userId: true
            }
          },
          segmentNote: {
            select: {
              id: true,
              noteText: true,
              authorId: true
            }
          },
          segmentType: {
            select: {
              name: true
            }
          },
          description: true,
          image: true,
          //createdAt: true,
          createdBy: {
            select:{
              name: true,
              image: true
            }
          },
          assignedTo: {
            select:{
              name: true,
              image: true
            }
          }
        }
      },
      show: {
        select: {
          name: true,
          picUrl: true
        }
      }
    }
  });

  res.json(episode)
}

// DELETE /api/post/:id
// async function handleDELETE(postId, res) {
//   const post = await prisma.post.delete({
//     where: { id: Number(postId) },
//   })
//   res.json(post)
// }
