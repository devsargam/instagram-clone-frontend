import { axiosClient } from '@/lib/httpClient';
import { currentProfileState } from '@/store/atoms/profile';
import { currentProfileType } from '@/types/currentProfile.types';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

export function useProfile() {
  const setCurrentUserProfile = useSetRecoilState(currentProfileState);
  const [userNotFound, setUserNotFound] = useState(false);

  async function getProfile(username: string) {
    setUserNotFound(false);
    try {
      const response = await axiosClient(`/users/profile/${username}`);
      const profileData = response.data as currentProfileType;
      setCurrentUserProfile(profileData);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        console.log(e.response?.status);
        if (e.response?.status) {
          setUserNotFound(true);
        }
      }
    }
  }

  return { getProfile, userNotFound };
}
