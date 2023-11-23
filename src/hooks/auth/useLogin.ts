import { AxiosError, AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { axiosClient, setAxiosAuthHeader } from '@/lib/httpClient';
import { userState } from '@/store/atoms/user';

export function useLogin() {
  const setUser = useSetRecoilState(userState);

  const login = useCallback(
    async (username: string, password: string) => {
      const response = (await axiosClient
        .post('/auth/login', {
          username,
          password,
        })
        .catch((error: AxiosError) => {
          const errorResponseData = error.response?.data as {
            error: string;
            message: string;
            statusCode: number;
          };
          toast(errorResponseData.message);
          console.log(errorResponseData);
        })) as AxiosResponse;

      if (response.status === 201) {
        if (response.data.access_token) {
          setAxiosAuthHeader(response.data.access_token);
          // Sets user state in memory and localstorage
          setUser({
            loading: false,
            token: response.data.access_token,
          });
        }
      }
    },
    [setUser],
  );

  return { login };
}
