import { axiosClient } from '@/lib/httpClient';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export function useLike(postId: string) {
  const like = useCallback(async () => {
    try {
      await axiosClient.post(`/posts/${postId}/like`);
    } catch {
      toast.error('Unable to like the post');
    }
  }, [postId]);

  const unLike = useCallback(async () => {
    try {
      await axiosClient.post(`/posts/${postId}/removeLike`);
    } catch {
      toast.error('Unable to remove like from the post');
    }
  }, [postId]);

  const isLiked = async () => {
    try {
      const response = await axiosClient.get(`/posts/${postId}/isLiked`);
      return response.data.liked as boolean;
    } catch {
      toast.error('Error happened while fetching likes');
    }
  };

  return { like, unLike, isLiked };
}
