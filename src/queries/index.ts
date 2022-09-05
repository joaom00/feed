import { api } from '@/lib/api';
import { Prisma } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

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
  const { data } = await api.get<{ posts: Array<FeedPost> }>('/api/posts');
  return data.posts;
}

export function useFeedPosts() {
  return useQuery(['posts'], fetchPosts);
}

interface CommentMutationPayload {
  content: string;
}

export function useCommentMutation(id: string) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation(
    (payload: CommentMutationPayload) =>
      api.post(`/api/posts/${id}/comments`, { content: payload.content }),
    {
      onMutate: async (newComment) => {
        await queryClient.cancelQueries(['posts']);

        const previousPosts = queryClient.getQueryData(['posts']) as Array<FeedPost>;

        const newPosts = previousPosts.map((post) => {
          if (post.id === id) {
            return {
              ...post,
              comments: [
                {
                  id: new Date().getTime(),
                  createdAt: new Date().toISOString(),
                  author: { name: session?.user?.name, image: session?.user?.image },
                  _count: { reactions: 0 },
                  ...newComment
                },
                ...post.comments
              ]
            };
          }
          return post;
        });

        queryClient.setQueryData(['posts'], newPosts);
      }
    }
  );
}

export function useReactionMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation(
    (commentId: string) => api.post(`/api/posts/${id}/comments/${commentId}/reaction`),
    {
      onMutate: async (commentId) => {
        await queryClient.cancelQueries(['posts']);

        const previousPosts = queryClient.getQueryData(['posts']) as Array<FeedPost>;

        queryClient.setQueryData(['posts'], () =>
          previousPosts.map((post) =>
            post.id === id
              ? {
                  ...post,
                  comments: post.comments.map((comment) => {
                    if (comment.id === commentId) {
                      return {
                        ...comment,
                        _count: {
                          reactions: comment.isReacted
                            ? comment._count.reactions - 1
                            : comment._count.reactions + 1
                        },
                        isReacted: !comment.isReacted
                      };
                    }
                    return comment;
                  })
                }
              : post
          )
        );
      }
    }
  );
}
