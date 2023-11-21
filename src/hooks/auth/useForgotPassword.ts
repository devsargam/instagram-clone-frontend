import { axiosClient } from '@/lib/httpClient';
import { AxiosError, AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export function useForgotPassword() {
  const forgotPassword = useCallback(async (username: string) => {
    const response = (await axiosClient
      .get(`/auth/forgotpass?username=${username}`)
      .catch((error: AxiosError) => {
        const errorResponseData = error.response?.data as {
          message: string;
          error: string;
          statusCode: string;
        };
        toast.error(errorResponseData.message);
      })) as AxiosResponse;

    toast.success(response.data.message);
  }, []);

  return { forgotPassword };
}
