import type { NextApiRequest, NextApiResponse } from 'next';
import ILevel from '../../../src/interfaces/ILevel';
import { Level } from '../../../src/Models/index';
import { connectToDatabase } from "../../../src/utils";

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
      const newLevel = new Level(body);
      const saved: ILevel = await newLevel.save()
      res.status(200).json({ data: saved ? { levelId: saved.levelId } : null })
    } catch(err) {
      res.status(500).json({ message: 'unexpectedError' });
    }
  } else if (method === 'GET') {
    try {
      await connectToDatabase();
      const levels = await Level.find({}, {_id: 0, name: 1, levelId: 1});
      res.status(200).json({ levels });
    } catch(err) {
      res.status(500).json({ message: 'unexpectedError' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
