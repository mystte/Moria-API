import type { NextApiRequest, NextApiResponse } from 'next';
import { Level } from '../../../src/Models/index';
import { connectToDatabase } from "../../../src/utils";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        await connectToDatabase();
        const level = await Level.findOne({ levelId: id }, {_id: 0, __v: 0});
        res.status(200).json({ level });
      } catch(err) {
        res.status(500).json({ message: 'unexpectedError' });
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
