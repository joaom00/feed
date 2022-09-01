import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { LikeButton } from '@/icons/LikeIcon';
import { Spinner } from '@/icons/Spinner';

import { Avatar } from '@/components/Avatar';
import { Textarea } from '@/components/Textarea';

import { FeedPost, useCommentMutation, useReactionMutation } from '@/queries';
import { useSession } from 'next-auth/react';
import { LoginDialog } from './LoginDialog';

export const Post = ({ id, author, createdAt, content, comments }: FeedPost) => {
  const { data: session } = useSession();
  const commentMutation = useCommentMutation(id);
  const reactionMutation = useReactionMutation(id);

  const [open, setOpen] = React.useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session) {
      return setOpen(true);
    }
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as { content: string };
    commentMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

  const onReaction = (commentId: string) => {
    if (!session) {
      return setOpen(true);
    }
    reactionMutation.mutate(commentId);
  };

  return (
    <>
      <LoginDialog open={open} onOpenChange={setOpen} />

      <div className="bg-gray-2 rounded-lg p-10 transform animate-slideDownAndFade">
        <div className="grid grid-cols-1 sm:grid-cols-[60px_1fr_auto] gap-4 items-center">
          <Avatar
            withBorder
            src={author.image}
            alt={`Foto de perfil de ${author.name}`}
            className=""
          />

          <div className="col-start-2">
            <p className="font-bold">{author.name}</p>
            <p className="text-sm text-gray-5">{author.bio}</p>
          </div>

          <span className="text-sm text-gray-5 col-span-2 sm:col-span-1">
            Publicado {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ptBR })}
          </span>
        </div>

        <p className="whitespace-pre-wrap max-w-[75ch] mt-6">{content}</p>

        <form onSubmit={onSubmit} className="mt-6 pt-6 border-t border-gray-3">
          <p className="font-bold mb-4">Deixe seu feedback</p>
          <Textarea name="content" placeholder="Escreva um comentário..." required />
          <button
            type="submit"
            disabled={commentMutation.isLoading}
            className="bg-brand-green pt-4 pb-[14px] px-6 font-bold text-white inline-flex justify-center items-center gap-[10px] rounded-lg leading-none mt-4 hover:bg-brand-green-light transition-colors ease-linear"
          >
            {commentMutation.isLoading ? <Spinner /> : null}
            Publicar
          </button>

          {comments.map((comment) => (
            <div key={comment.id} className="grid grid-cols-[60px_1fr] gap-4 mt-8 break-all">
              <Avatar src={comment.author.image} alt={`Foto de perfil de ${comment.author.name}`} />

              <div className="bg-[#29292E] rounded-lg pt-4 pb-[25px] px-4">
                <p className="text-sm text-gray-7 font-bold">{comment.author.name}</p>
                <p className="text-xs text-gray-5">
                  Cerca de {formatDistanceToNow(new Date(comment.createdAt), { locale: ptBR })}
                </p>
                <p className="text-sm mt-4 text-gray-6">{comment.content}</p>
              </div>

              <button
                type="button"
                onClick={() => onReaction(comment.id)}
                className={`col-start-2 text-sm font-bold text-gray-5 flex items-center gap-[10px] transition-colors ease-linear  ${
                  comment.isReacted ? 'text-brand-green-light' : 'hover:text-gray-7'
                }`}
              >
                <LikeButton />
                Aplaudir • {comment._count.reactions}
              </button>
            </div>
          ))}
        </form>
      </div>
    </>
  );
};
