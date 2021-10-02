import type { NextApiRequest, NextApiResponse } from 'next'
import { Level } from '../../../src/Models/index';
import { connectToDatabase } from "../../../src/utils"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
  } = req

  if (method === 'POST') {
    try {
      await connectToDatabase();
      const newPost = new Level(body);
      const saved = await newPost.save()
      res.status(200).json({ data: saved })
    } catch(err) {
      res.status(500).json({ message: 'unexpectedError' });
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
