import prisma from '../../../lib/prisma'
import { getSession } from "next-auth/client";


// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { name, description } = req.body;

  const session = await getSession({ req });
  const result = await prisma.show.create({
    data: {
      name: name,
      description: description
    },
  });
  res.json(result);
}
