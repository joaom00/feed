import { type NextApiRequest, type NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { postsWithAuthor } from '@/pages';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(402).send('Unauthorized');

  switch (req.method) {
    case 'GET': {
      const posts = await prisma.post.findMany(postsWithAuthor);
      const reactions = await prisma.reaction.findMany({
        where: {
          user: {
            email: session.user?.email ?? ''
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

      return res.json(finalPosts);
    }
    case 'POST': {
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
