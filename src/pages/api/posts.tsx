import { type NextApiRequest, type NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const content = req.body.content as string;
      const response = await prisma.post.create({
        data: {
          content,
          author: {
            connect: {
              email: 'joao@reppy.app'
            }
          }
        }
      });
      res.json(response);
    }
    default: {
      return res.setHeader('Allow', 'POST');
    }
  }
}
