import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import type { Post as PostType } from '@/pages/index';
import { Avatar } from './Avatar';
import { Textarea } from './Textarea';

export const Post = ({ author, createdAt, content }: PostType) => {
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

      <div className="mt-6 pt-6 border-t border-gray-3">
        <p className="font-bold mb-4">Deixe seu feedback</p>
        <Textarea placeholder="Escreva um comentário..." />
        <button className="bg-brand-green pt-4 pb-[14px] px-6 font-bold text-white inline-flex justify-center items-center gap-[10px] rounded-lg leading-none mt-4">
          Publicar
        </button>

        <div className="grid grid-cols-[60px_1fr] gap-4 mt-8">
          <Avatar />

          <div className="bg-[#29292E] rounded-lg pt-4 px-4">
            João Pedro Magalhães
            Cerca de 2h
          </div>
        </div>
      </div>
    </div>
  );
};
