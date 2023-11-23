import { useSetRecoilState } from 'recoil';
import { useCallback } from 'react';

import { axiosClient } from '@/lib/httpClient';
import { postState } from '@/store/atoms/posts';

export function usePosts() {
  const setPosts = useSetRecoilState(postState);

  const getPosts = useCallback(
    async (userId: string) => {
      const response = await axiosClient.get(`/posts/users/${userId}`);
      setPosts([...response.data]);
    },
    [setPosts],
  );

  return { getPosts };
}
