import { axiosClient } from '@/lib/httpClient';
import { postState } from '@/store/atoms/posts';
import { useSetRecoilState } from 'recoil';

export function usePosts() {
  const setPosts = useSetRecoilState(postState);

  async function getPosts(userId: string) {
    const response = await axiosClient.get(`/posts/users/${userId}`);
    console.log(response);

    setPosts((oldPosts) => [...oldPosts, response.data]);
  }
  return { getPosts };
}
