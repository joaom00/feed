import { type NextApiRequest, type NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { Prisma } from '@prisma/client';

import prisma from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]';

const postsWithAuthor = Prisma.validator<Prisma.PostFindManyArgs>()({
  orderBy: { createdAt: 'desc' },
  include: {
    author: true,
    comments: {
      orderBy: [
        {
          reactions: { _count: 'desc' }
        },
        {
          createdAt: 'desc'
        }
      ],
      include: {
        author: true,
        _count: {
          select: { reactions: true }
        }
      }
    }
  }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  switch (req.method) {
    case 'GET': {
      const posts = await prisma.post.findMany(postsWithAuthor);
      const reactions = await prisma.reaction.findMany({
        where: {
          user: {
            email: session?.user?.email ?? ''
          }
        }
      });

      const finalPosts = posts.map((post) => {
        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (reactions.some((reaction) => reaction.commentId === comment.id)) {
              return { ...comment, isReacted: true };
            }
            return comment;
          })
        };
      });

      return res.json({ posts: finalPosts });
    }
    case 'POST': {
      if (!session) return res.status(402).send('Unauthorized');
      const body = JSON.parse(req.body);
      const content = body.content;
      const response = await prisma.post.create({
        data: {
          content,
          author: {
            connect: {
              email: session.user?.email ?? ''
            }
          }
        }
      });
      return res.json(response);
    }
    default: {
      return res.setHeader('Allow', ['GET', 'POST']);
    }
  }
}
