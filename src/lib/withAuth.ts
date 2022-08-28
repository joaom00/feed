import { authOptions } from '@/pages/api/auth/[...nextauth]';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';

export function withAuth(gssp: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);

    if (!session) {
      return {
        props: {},
        redirect: {
          destination: '/login'
        }
      };
    }

    return await gssp(context);
  };
}
