import { axiosClient } from '@/lib/httpClient';
import { postStateWithID } from '@/store/atoms/posts';
import { postType } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

export function useLike(postId: string) {
  const [postState, setPostState] = useRecoilState(postStateWithID(postId));
  const [isLiked, setIsLiked] = useState(false);

  const isPostLiked = useCallback(async () => {
    try {
      const response = await axiosClient.get(`/posts/${postId}/isLiked`);
      return response.data.liked as boolean;
    } catch {
      toast.error('Error happened while fetching likes');
    }
  }, [postId]);

  useEffect(() => {
    isPostLiked().then((value) => {
      setIsLiked(value!);
    });
  }, [isPostLiked]);

  const like = useCallback(async () => {
    try {
      await axiosClient.post(`/posts/${postId}/like`);
      if (postState !== null) {
        // Update the likes property
        const updatedPost: postType = {
          ...postState,
          _count: {
            ...postState._count,
            likes: postState._count.likes + 1,
          },
        };
        // Set the updated state
        setPostState(updatedPost);
        setIsLiked(true);
      }
    } catch {
      toast.error('Unable to like the post');
    }
  }, [postId, postState, setPostState]);

  const unLike = useCallback(async () => {
    try {
      await axiosClient.post(`/posts/${postId}/removeLike`);
      if (postState !== null) {
        // Update the likes property
        const updatedPost: postType = {
          ...postState,
          _count: {
            ...postState._count,
            likes: postState._count.likes - 1,
          },
        };
        // Set the updated state
        setPostState(updatedPost);
        setIsLiked(false);
      }
    } catch {
      toast.error('Unable to remove like from the post');
    }
  }, [postId, postState, setPostState]);

  return { like, unLike, isLiked };
}
