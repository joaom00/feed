import { type NextApiRequest, type NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const session = await unstable_getServerSession(req, res, authOptions);
      if (!session) return res.status(402).send('Unauthorized');
      const id = req.query.commentId as string;

      const hasReaction = await prisma.reaction.findFirst({
        where: {
          comment: {
            id
          }
        }
      });

      if (hasReaction) {
        await prisma.reaction.delete({
          where: { id: hasReaction.id }
        });
        return res.send(true);
      }

      await prisma.reaction.create({
        data: {
          user: {
          connect: {
          email: session.user?.email ?? ''
          }
          },
          comment: {
            connect: {
              id
            }
          }
        }
      });
      return res.send(true);
    }
    default: {
      return res.setHeader('Allow', 'POST');
    }
  }
}
