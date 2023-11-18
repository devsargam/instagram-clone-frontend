import { useLocalStorage } from '@/hooks/';
import { axiosClient, setAxiosAuthHeader } from '@/lib/httpClient';
import { userState } from '@/store/account';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

export function useLogin() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setToken] = useLocalStorage<string>('accessToken', '');
  const setUser = useSetRecoilState(userState);

  async function login(username: string, password: string) {
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
        setToken(response.data.access_token);
        setAxiosAuthHeader(response.data.access_token);
        setUser({
          loading: false,
          token: response.data.access_token,
        });
      }
    }
  }

  return { login };
}
