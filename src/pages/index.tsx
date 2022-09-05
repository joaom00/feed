import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import { Session, unstable_getServerSession } from 'next-auth';
import { dehydrate, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { authOptions } from './api/auth/[...nextauth]';
import type { NextPageWithLayout } from './_app';

import { Spinner } from '@/icons/Spinner';

import { Avatar } from '@/components/Avatar';
import { Textarea } from '@/components/Textarea';
import { Post } from '@/components/Post';
import { Header } from '@/components/Header';

import { type FeedPost, fetchPosts, useFeedPosts } from '@/queries';
import { api } from '@/lib/api';
import { OnlyAuth } from '@/components/OnlyAuth';
import { ProfileAside } from '@/components/ProfileAside';

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['posts'], fetchPosts);

  return {
    props: {
      user: session ? session.user : null,
      dehydratedState: dehydrate(queryClient)
    }
  };
};

interface HomePageProps {
  user: Session['user'] | null;
}

const HomePage: NextPageWithLayout<HomePageProps> = ({ user }) => {
  const queryClient = useQueryClient();

  const postsQuery = useFeedPosts();
  const postMutation = useMutation((data: Pick<FeedPost, 'content'>) =>
    api.post('/api/posts', data)
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as Pick<FeedPost, 'content'>;

    postMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
      onSettled: () => {
        queryClient.invalidateQueries(['posts']);
      }
    });
  };

  return (
    <main
      className={`mt-8 max-w-[1120px] w-full mx-auto grid gap-8 pb-20 px-3 ${
        user ? 'grid-cols-1 lg:grid-cols-main' : 'grid-cols-[832px] justify-center'
      }`}
    >
      <OnlyAuth>
        <ProfileAside user={user} />
      </OnlyAuth>

      <div className={`space-y-8 ${user ? 'lg:col-start-2' : ''}`}>
        <OnlyAuth>
          <div className="bg-gray-2 rounded-lg p-5 md:p-10">
            <form onSubmit={onSubmit} className="md:grid md:grid-cols-[60px_1fr] gap-4">
              <Avatar
                withBorder
                src={user?.image}
                alt={`Foto de perfil de ${user?.name}`}
                className="hidden md:block"
              />

              <Textarea name="content" required placeholder="Escreva um comentário..." />

              <button
                type="submit"
                className="bg-brand-green pt-4 pb-[14px] px-6 font-bold text-white inline-flex justify-center items-center gap-[10px] rounded-lg leading-none col-start-2 w-max hover:bg-brand-green-light transition-colors ease-linear"
              >
                {postMutation.isLoading ? <Spinner /> : null}
                Publicar
              </button>
            </form>
          </div>
        </OnlyAuth>

        {postsQuery.data?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </main>
  );
};

HomePage.getLayout = (page) => {
  return (
    <>
      <Header />
      {page}
    </>
  );
};

export default HomePage;
