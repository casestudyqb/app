import prisma from '../../../lib/prisma'
import { getSession } from "next-auth/client";

// POST /api/segment
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { url } = req.body;

  const session = await getSession({ req });

  const ogs = require('open-graph-scraper');
  const options = { url };
  ogs(options)
    .then((data) => {
      const { error, result, response } = data;
      console.log('error:', error);  // This is returns true or false. True if there was a error. The error it self is inside the results object.
      //console.log('result:', result); // This contains all of the Open Graph results
      console.log('response:', response); // This contains the HTML of page

      res.json(result);
    })

}