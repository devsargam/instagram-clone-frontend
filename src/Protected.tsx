import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Navigate, useNavigate } from 'react-router-dom';
import { userTokenSelector } from './store/selectors/user';
import { loggedInUserProfileState } from './store/atoms/profile';
import { axiosClient } from './lib/httpClient';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';

interface ProtectedProps {
  children: React.ReactNode;
}

export function Protected({ children }: ProtectedProps) {
  // Checks if user has token in the browser localstorage
  const userToken = useRecoilValue(userTokenSelector);
  const setLoggedInUserProfile = useSetRecoilState(loggedInUserProfileState);

  const navigate = useNavigate();

  useEffect(() => {
    const profile = async () => {
      const response = (await axiosClient
        .get('/users/me')
        .catch((err: AxiosError) => {
          if (err.response?.status) {
            localStorage.removeItem('accountState');
            navigate('/accounts/login');
          }
        })) as AxiosResponse;
      const data = response.data;
      setLoggedInUserProfile({
        id: data.id,
        username: data.username,
        displayPictureUrl: data.displayPictureUrl,
      });
    };

    profile();
  }, [navigate, setLoggedInUserProfile]);

  if (userToken) {
    return children;
  } else {
    return <Navigate to={'/accounts/login'} />;
  }
}
