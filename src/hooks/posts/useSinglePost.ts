import { axiosClient } from '@/lib/httpClient';
import { postStateWithID } from '@/store/atoms/posts';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

export function useSinglePost(postId: string) {
  const setPost = useSetRecoilState(postStateWithID(postId));

  const getPost = useCallback(
    async (postId: string) => {
      const response = await axiosClient.get(`/posts/${postId}`);
      setPost(response.data);
    },
    [setPost],
  );

  return { getPost };
}
