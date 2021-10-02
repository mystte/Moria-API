import type { NextApiRequest, NextApiResponse } from 'next'

export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({
        message: `GET Level ${id}`
      })
      break
    case 'PUT':
      // Update data in your database
      res.status(200).json({
        message: `PUT Level ${id}`
      })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
