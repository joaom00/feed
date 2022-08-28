import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import type { Post as PostType } from '@/pages/index';
import { Avatar } from './Avatar';
import { Textarea } from './Textarea';
import { LikeButton } from '@/icons/LikeIcon';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { Spinner } from '@/icons/Spinner';

export const Post = ({ id, author, createdAt, content, comments }: PostType) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const commentMutation = useMutation(
    (data: { content: string }) =>
      fetch(`http://localhost:3000/api/posts/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    {
      onMutate: async (newComment) => {
        await queryClient.cancelQueries(['posts']);

        const previousPosts = queryClient.getQueryData(['posts']) as Array<PostType>;

        queryClient.setQueryData(['posts'], () =>
          previousPosts.map((post) =>
            post.id === id
              ? {
                  ...post,
                  comments: [
                    {
                      ...newComment,
                      createdAt: new Date().toISOString(),
                      author: { name: session?.user?.name }
                    },
                    ...post.comments
                  ]
                }
              : post
          )
        );
      }
    }
  );

  return (
    <div className="bg-gray-2 rounded-lg p-10">
      <div className="grid grid-cols-[60px_1fr_auto] gap-4 items-center">
        <Avatar />

        <div>
          <p className="font-bold">{author.name}</p>
          <p className="text-sm text-gray-5">Dev Front-End</p>
        </div>

        <span className="text-sm text-gray-5">
          Publicado {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ptBR })}
        </span>
      </div>

      <p className="whitespace-pre-wrap max-w-[75ch] mt-6">{content}</p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const data = Object.fromEntries(formData.entries()) as { content: string };
          commentMutation.mutate(data, {
            onSuccess: () => {
              const form = event.target as HTMLFormElement;
              form.reset();
            }
          });
        }}
        className="mt-6 pt-6 border-t border-gray-3"
      >
        <p className="font-bold mb-4">Deixe seu feedback</p>
        <Textarea name="content" placeholder="Escreva um comentário..." />
        <button
          type="submit"
          disabled={commentMutation.isLoading}
          className="bg-brand-green pt-4 pb-[14px] px-6 font-bold text-white inline-flex justify-center items-center gap-[10px] rounded-lg leading-none mt-4"
        >
          {commentMutation.isLoading ? <Spinner /> : null}
          Publicar
        </button>

        {comments.map((comment) => (
          <div key={comment.id} className="grid grid-cols-[60px_1fr] gap-4 mt-8">
            <Avatar />

            <div className="bg-[#29292E] rounded-lg pt-4 pb-[25px] px-4">
              <p className="text-sm text-gray-7 font-bold">{comment.author.name}</p>
              <p className="text-xs text-gray-5">
                Cerca de {formatDistanceToNow(new Date(comment.createdAt), { locale: ptBR })}
              </p>
              <p className="text-sm mt-4 text-gray-6">{comment.content}</p>
            </div>

            <button className="col-start-2 text-sm font-bold text-gray-5 flex items-center gap-[10px]">
              <LikeButton />
              Aplaudir • 03
            </button>
          </div>
        ))}
      </form>
    </div>
  );
};
