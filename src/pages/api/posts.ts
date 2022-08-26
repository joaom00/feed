import { type NextApiRequest, type NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const body = JSON.parse(req.body);
      const content = body.content;
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
      return res.json(response);
    }
    default: {
      return res.setHeader('Allow', 'POST');
    }
  }
}
