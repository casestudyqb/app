import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id

  if (req.method === 'GET') {
    handleGET(postId, res)
  } else if (req.method === 'DELETE') {
    handleDELETE(postId, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/like/:id
async function handleGET(segmentId, res) {
  const post = await prisma.segment.findUnique({
    where: { id: Number(segmentId) },
    select: { 
      like: {
      select: {
        userId: true
        } 
      } 
    },
  })
  res.json(post)
}

// DELETE /api/post/:id
async function handleDELETE(postId, res) {
  const post = await prisma.post.delete({
    where: { id: Number(postId) },
  })
  res.json(post)
}
