import { api } from '@/lib/api';
import { Prisma } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

type PrismaPost = Prisma.PostGetPayload<{
  include: { author: true };
}>;

type PrismaComment = Prisma.CommentGetPayload<{
  include: {
    author: true;
    _count: { select: { reactions: true } };
  };
}>;

export interface FeedPost extends PrismaPost {
  comments: Array<PrismaComment & { isReacted: boolean }>;
}

export async function fetchPosts() {
  const data = await api.get<{posts: Array<FeedPost>}>('/posts');
  return data.posts;
}

export function useFeedPosts() {
  return useQuery(['posts'], fetchPosts);
}
