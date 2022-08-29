import React from 'react';
import Link from 'next/link';
import { type DefaultSession, unstable_getServerSession } from 'next-auth';
import { useMutation } from '@tanstack/react-query';

import type { NextPageWithLayout } from './_app';
import { authOptions } from './api/auth/[...nextauth]';

import { ArrowLeftIcon } from '@/icons/ArrowLeftIcon';
import { Spinner } from '@/icons/Spinner';

import { Avatar } from '@/components/Avatar';
import { Header, HeaderPortal } from '@/components/Header';

import { withAuth } from '@/lib/withAuth';
import { api } from '@/lib/api';

export const getServerSideProps = withAuth(async (ctx) => {
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);
  return {
    props: {
      user: session?.user
    }
  };
});

interface ProfilePageProps {
  user: DefaultSession['user'] & { bio: string | null };
}

const ProfilePage: NextPageWithLayout<ProfilePageProps> = ({ user }) => {
  const profileMutation = useMutation((data: ProfilePageProps['user']) => api.put('/user', data));

  const stringifiedUserData = JSON.stringify({ name: user?.name, bio: user.bio });
  const [userData, setUserData] = React.useState({ name: user?.name, bio: user.bio });

  const onValueChange =
    (field: keyof typeof userData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserData((currentUserData) => ({ ...currentUserData, [field]: event.target.value }));
    };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (profileMutation.isLoading) return;
    profileMutation.mutate(userData);
  };

  return (
    <>
      <HeaderPortal>
        <Link href="/">
          <a className="text-sm flex items-center gap-2 transition-colors ease-linear hover:text-gray-7">
            <ArrowLeftIcon />
            Voltar para home
          </a>
        </Link>
      </HeaderPortal>

      <main className="max-w-[928px] w-full mx-auto bg-gray-2 rounded-lg grid grid-rows-profile overflow-hidden h-max mt-8 mb-8 pb-10">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1661336581000-b0c41a876950?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
          alt="Capa de perfil de João Pedro"
        />

        <Avatar
          withBorder
          src={user?.image}
          alt={`Foto de perfil de ${user?.name}`}
          className="mx-auto -mt-[40px] w-20 h-20 !p-1.5 mb-16"
        />

        <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
          <div className="space-y-1.5 max-w-[352px] w-full mx-auto">
            <label htmlFor="name" className="font-bold">
              Nome
            </label>
            <input
              id="name"
              type="text"
              value={userData.name ?? ''}
              onChange={onValueChange('name')}
              className="w-full rounded-lg bg-gray-1 px-4 py-2.5 placeholder:text-gray-4 text-gray-6 focus:outline-none focus:outline-brand-green-light"
            />
          </div>

          <div className="space-y-1.5 max-w-[352px] w-full mx-auto mt-5">
            <label htmlFor="bio" className="font-bold">
              Bio
            </label>
            <input
              id="bio"
              type="text"
              value={userData.bio ?? ''}
              onChange={onValueChange('bio')}
              className="w-full rounded-lg bg-gray-1 px-4 py-2.5 placeholder:text-gray-4 text-gray-6 focus:outline-none focus:outline-brand-green-light"
            />
          </div>

          <button
            type="submit"
            disabled={stringifiedUserData === JSON.stringify(userData)}
            className="bg-brand-green pt-4 pb-[14px] px-6 font-bold text-white inline-flex justify-center items-center gap-[10px] rounded-lg leading-none max-w-[352px] w-full mx-auto mt-10 disabled:bg-gray-4 disabled:opacity-50 hover:bg-brand-green-light transition-colors ease-linear"
          >
            {profileMutation.isLoading ? <Spinner /> : null}
            Atualizar perfil
          </button>
        </form>
      </main>
    </>
  );
};

ProfilePage.getLayout = (page) => {
  return (
    <>
      <Header />
      {page}
    </>
  );
};

export default ProfilePage;
