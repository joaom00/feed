import React from 'react';
import { useSession } from 'next-auth/react';
import { Prisma } from '@prisma/client';

import prisma from '@/lib/prisma';

import { Avatar } from '@/components/Avatar';
import { Textarea } from '@/components/Textarea';

import { EditIcon } from '../icons/EditIcon';
import { IgniteIcon } from '../icons/Ignite';
import { Spinner } from '@/icons/Spinner';
import { Post } from '@/components/Post';

const postsWithAuthor = Prisma.validator<Prisma.PostFindManyArgs>()({
  orderBy: {
    createdAt: 'desc'
  },
  include: { author: true }
});

export type Post = Prisma.PostGetPayload<typeof postsWithAuthor> & { createdAt: string };

export const getServerSideProps = async () => {
  const posts = await prisma.post.findMany(postsWithAuthor);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
};

const Home = ({ posts }: { posts: Array<Post> }) => {
  const session = useSession();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setIsLoading(true);
    await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    setIsLoading(false);
    formElement.reset();
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
                {isLoading ? <Spinner /> : null}
                Publicar
              </button>
            </form>
          </div>

          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
