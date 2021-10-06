import type { NextApiRequest, NextApiResponse } from 'next';
import { Puzzle } from '../../../src/Models/index';
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
        const puzzle = await Puzzle.findOne({ puzzleId: id }, {_id: 0,  __v: 0});
        res.status(200).json({ puzzle });
      } catch(err) {
        res.status(500).json({ message: 'unexpectedError' });
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
