import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { axiosClient } from '@/lib/httpClient';
import { currentProfileState } from '@/store/atoms/profile';
import { ICurrentProfile } from '@/interfaces';

export function useProfile() {
  const setCurrentUserProfile = useSetRecoilState(currentProfileState);
  const [userNotFound, setUserNotFound] = useState(false);

  const getProfile = useCallback(
    async (username: string) => {
      setUserNotFound(false);
      try {
        const response = await axiosClient(`/users/profile/${username}`);
        const profileData = response.data as ICurrentProfile;
        setCurrentUserProfile(profileData);
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          console.log(e.response?.status);
          if (e.response?.status) {
            setUserNotFound(true);
            localStorage.removeItem('token');
          }
        }
      }
    },
    [setCurrentUserProfile],
  );

  return { getProfile, userNotFound };
}
