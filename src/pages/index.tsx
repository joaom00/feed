import React from 'react';
import { useSession } from 'next-auth/react';
import { Prisma } from '@prisma/client';

import { Avatar } from '@/components/Avatar';
import { Textarea } from '@/components/Textarea';

import { EditIcon } from '../icons/EditIcon';
import { IgniteIcon } from '../icons/Ignite';
import { Spinner } from '@/icons/Spinner';
import { Post } from '@/components/Post';
import { unstable_getServerSession } from 'next-auth';
import { GetServerSideProps } from 'next';
import { authOptions } from './api/auth/[...nextauth]';
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';

export const postsWithAuthor = Prisma.validator<Prisma.PostFindManyArgs>()({
  orderBy: {
    createdAt: 'desc',
  },
  include: {
    author: true,
    comments: {
      orderBy: {createdAt: 'desc'},
      include: { author: true }
    }
  }
});

export type Post = Prisma.PostGetPayload<typeof postsWithAuthor> & { createdAt: string };

async function fetchPosts() {
  const response = await fetch('http://localhost:3000/api/posts');
  const posts = await response.json();
  return posts as Array<Post>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: '/login'
      }
    };
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['posts'], fetchPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

const Home = () => {
  const queryClient = useQueryClient();
  const session = useSession();

  const postsQuery = useQuery(['posts'], fetchPosts);
  const commentMutation = useMutation((data: Pick<Post, 'content'>) =>
    fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Pick<Post, 'content'>;

    commentMutation.mutate(data, {
      onSuccess: () => {
        formElement.reset();
      },
      onSettled: () => {
        queryClient.invalidateQueries(['posts']);
      }
    });
  };

  return (
    <>
      <header className="bg-gray-2 py-5 flex justify-center items-center">
        <p className="text-2xl font-bold text-gray-7 flex items-center gap-4">
          <IgniteIcon />
          Ignite Feed
        </p>
      </header>
      <main className="mt-8 max-w-[1120px] w-full mx-auto grid grid-cols-main gap-8 pb-20">
        <aside className="bg-gray-2 rounded-lg grid grid-rows-profile overflow-hidden text-center h-max">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1661336581000-b0c41a876950?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
            alt="Capa de perfil de João Pedro"
          />
          <Avatar className="mx-auto -mt-[30px]" />
          <p className="font-bold mt-4">{session.data?.user?.name}</p>
          <p className="text-sm text-gray-5">Front-End Developer</p>
          <div className="pt-6 pb-8 border-t border-gray-3 mt-6">
            <button className="bg-transparent pt-4 pb-[14px] px-6 font-bold text-brand-green-light inline-flex justify-center items-center gap-[10px] rounded-lg border border-brand-green-light leading-none">
              <EditIcon />
              Editar seu perfil
            </button>
          </div>
        </aside>
        <div className="space-y-8">
          <div className="bg-gray-2 rounded-lg p-10">
            <form onSubmit={onSubmit} className="grid grid-cols-[60px_1fr] gap-4">
              <Avatar />

              <Textarea name="content" required placeholder="Escreva um comentário..." />

              <button
                type="submit"
                className="bg-brand-green pt-4 pb-[14px] px-6 font-bold text-white inline-flex justify-center items-center gap-[10px] rounded-lg leading-none col-start-2 w-max"
              >
                {commentMutation.isLoading ? <Spinner /> : null}
                Publicar
              </button>
            </form>
          </div>

          {postsQuery.data?.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
