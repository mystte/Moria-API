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

  console.log('Body = ', body);
  if (method === 'POST') {
    try {
      if (!body.name || !body.mineMapGridObjectArray)
        return res.status(400).json({ message: 'errMissingParameter' });
      if (body.name && body.name.length > 30)
        return res.status(400).json({ message: 'errNameTooLong' });
      await connectToDatabase();
      const newLevel = new Level(body);
      const saved: ILevel = await newLevel.save();
      res.status(200).json(saved ? { levelId: saved.levelId, name: saved.name} : {})
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
