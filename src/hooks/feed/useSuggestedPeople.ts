import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

import { axiosClient } from '@/lib/httpClient';
import { suggestedUsersState } from '@/store/atoms/suggestedPeople';

export function useSuggestedPeople() {
  const [suggestedUsers, setSuggestedUsers] =
    useRecoilState(suggestedUsersState);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axiosClient.get(`/feed/suggestions`);
      setSuggestedUsers([...response.data]);
    };

    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { suggestedUsers };
}
