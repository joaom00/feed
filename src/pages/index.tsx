import React from 'react';
import { useSession } from 'next-auth/react';
import { dehydrate, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import type { NextPageWithLayout } from './_app';

import { EditIcon } from '@/icons/EditIcon';
import { Spinner } from '@/icons/Spinner';

import { Avatar } from '@/components/Avatar';
import { Textarea } from '@/components/Textarea';
import { Post } from '@/components/Post';

import { type FeedPost, fetchPosts, useFeedPosts } from '@/queries';
import { withAuth } from '@/lib/withAuth';
import { api } from '@/lib/api';
import Link from 'next/link';
import { Header } from '@/components/Header';

export const getServerSideProps = withAuth(async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['posts'], fetchPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
});

const Home: NextPageWithLayout = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const postsQuery = useFeedPosts();
  const postMutation = useMutation((data: Pick<FeedPost, 'content'>) => api.post('/posts', data));

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Pick<FeedPost, 'content'>;

    postMutation.mutate(data, {
      onSuccess: () => {
        formElement.reset();
      },
      onSettled: () => {
        queryClient.invalidateQueries(['posts']);
      }
    });
  };

  return (
    <main className="mt-8 max-w-[1120px] w-full mx-auto grid grid-cols-main gap-8 pb-20">
      <aside className="bg-gray-2 rounded-lg grid grid-rows-profile-aside overflow-hidden text-center h-max">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1661336581000-b0c41a876950?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
          alt="Capa de perfil de João Pedro"
        />
        <Avatar
          withBorder
          src={session?.user?.image}
          alt={`Foto de perfil de ${session?.user?.name}`}
          className="mx-auto -mt-[30px]"
        />
        <p className="font-bold mt-4">{session?.user?.name}</p>
        <p className="text-sm text-gray-5">{session?.user.bio}</p>
        <div className="pt-6 pb-8 border-t border-gray-3 mt-6">
          <Link href="/profile">
            <a className="bg-transparent pt-4 pb-[14px] px-6 font-bold text-brand-green-light inline-flex justify-center items-center gap-[10px] rounded-lg border border-brand-green-light leading-none hover:bg-brand-green hover:text-white hover:border-brand-green transition-colors ease-linear">
              <EditIcon />
              Editar seu perfil
            </a>
          </Link>
        </div>
      </aside>

      <div className="space-y-8">
        <div className="bg-gray-2 rounded-lg p-10">
          <form onSubmit={onSubmit} className="grid grid-cols-[60px_1fr] gap-4">
            <Avatar
              withBorder
              src={session?.user?.image}
              alt={`Foto de perfil de ${session?.user?.name}`}
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

        {postsQuery.data?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </main>
  );
};

Home.getLayout = (page) => {
  return (
    <>
      <Header />
      {page}
    </>
  );
};

export default Home;
