import type { NextApiRequest, NextApiResponse } from 'next';
import IPuzzle from '../../../src/interfaces/IPuzzle';
import { Puzzle } from '../../../src/Models/index';
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
      const newPuzzle = new Puzzle(body);
      const saved: IPuzzle = await newPuzzle.save()
      res.status(200).json({ data: saved ? { puzzleId: saved.puzzleId } : null })
    } catch(err) {
      res.status(500).json({ message: 'unexpectedError' });
    }
  } else if (method === 'GET') {
    try {
      await connectToDatabase();
      const puzzles = await Puzzle.find({}, {_id: 0, name: 1, puzzleId: 1});
      res.status(200).json({ puzzles });
    } catch(err) {
      res.status(500).json({ message: 'unexpectedError' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
