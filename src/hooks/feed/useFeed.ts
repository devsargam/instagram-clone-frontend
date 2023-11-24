import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

import { axiosClient } from '@/lib/httpClient';
import { postUrlsState } from '@/store/atoms/posts';

export function useFeed() {
  const [postUrls, setPostUrls] = useRecoilState(postUrlsState);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axiosClient.get(`/feed`);
      setPostUrls([...response.data]);
    };

    getPosts();
  }, [setPostUrls]);

  return { posts: postUrls };
}
