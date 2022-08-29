import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'PUT': {
      const session = await unstable_getServerSession(req, res, authOptions);
      if (!session) return res.send('Unauthorized');
      const body = JSON.parse(req.body);
      await prisma.user.update({
        where: {
          email: session.user?.email ?? ''
        },
        data: {
          name: body.name,
          bio: body.bio
        }
      });
      return res.send('ok')
    }
    default: {
      res.setHeader('Allow', 'PUT');
      return res.send('Method not allowed');
    }
  }
}
