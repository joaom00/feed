import { type NextApiRequest, type NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const session = await unstable_getServerSession(req, res, authOptions);
      if (!session) return res.status(402).send('Unauthorized');
      const id = req.query.id as string;
      const body = JSON.parse(req.body);
      const content = body.content;
      const response = await prisma.comment.create({
        data: {
          content,
          author: {
            connect: {
              email: session.user?.email ?? ''
            }
          },
          post: {
            connect: {
              id
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
