import { axiosClient } from '@/lib/httpClient';
import { currentProfileState } from '@/store/atoms/profile';
import { currentProfileType } from '@/types/currentProfile.types';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

export function useProfile() {
  const setCurrentUserProfile = useSetRecoilState(currentProfileState);
  const [profileNotFound, setProfileNotFound] = useState(false);

  async function getProfile(username: string) {
    setProfileNotFound(false);
    try {
      const response = await axiosClient(`/users/profile/${username}`);
      const profileData = response.data as currentProfileType;
      setCurrentUserProfile(profileData);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        console.log(e.response?.status);
        if (e.response?.status) {
          setProfileNotFound(true);
        }
      }
    }
  }

  return { getProfile, profileNotFound };
}
