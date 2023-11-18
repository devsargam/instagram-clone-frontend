import { axiosClient } from '@/lib/httpClient';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export function useSignup() {
  async function signup(email: string, password: string, username: string) {
    const response = (await axiosClient
      .post('/auth/signup', {
        email,
        password,
        username,
      })
      .catch((error: AxiosError) => {
        const errorResponseData = error.response?.data as {
          error: string;
          message: string;
          statusCode: number;
        };
        console.log(errorResponseData);
        toast(errorResponseData.message);
      })) as AxiosResponse;

    if (response.status === 201) {
      console.log('Account Created');
    }
  }

  return { signup };
}
