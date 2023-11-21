import { axiosClient } from '@/lib/httpClient';
import { singlePostState } from '@/store/atoms/posts';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

export function useSinglePost() {
  const setPost = useSetRecoilState(singlePostState);

  const getPost = useCallback(
    async (postId: string) => {
      const response = await axiosClient.get(`/posts/${postId}`);
      setPost(response.data);
    },
    [setPost],
  );

  return { getPost };
}
