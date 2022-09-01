import type { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';

import { GitHubIcon } from '@/icons/GitHub';
import { GoogleIcon } from '@/icons/GoogleIcon';
import { IgniteIcon } from '@/icons/Ignite';

export default function LoginPage() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] min-h-screen">
      <img className="w-full h-full object-cover hidden lg:block" src="/login.jpg" alt="" />

      <div className="pt-[62px] px-16 bg-gray-2">
        <p className="text-2xl font-bold text-gray-7 flex items-center gap-4">
          <IgniteIcon />
          Ignite Feed
        </p>

        <h1 className="text-[40px] font-bold max-w-[17ch] text-white mt-20">
          Escolha uma opção para entrar
        </h1>

        <p className="mt-4 mb-14 text-gray-5">
          Utilize algum dos serviços abaixo para entrar na nossa plataforma.
        </p>

        <div className="space-y-6">
          <button
            onClick={() => signIn('google')}
            className="py-3.5 bg-[#EA4335] rounded-lg w-full text-white font-bold inline-flex justify-center items-center gap-2"
          >
            <GoogleIcon width="24px" height="24px" />
            Entrar com o Google
          </button>
          <button
            onClick={() => signIn('github')}
            className="py-3.5 bg-[#171515] rounded-lg w-full text-white font-bold inline-flex justify-center items-center gap-2"
          >
            <GitHubIcon width="24px" height="24px" />
            Entrar com o GitHub
          </button>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return { props: {} };
}
