import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { userTokenSelector } from './store/selectors/user';

interface ProtectedProps {
  children: React.ReactNode;
}

export function Protected({ children }: ProtectedProps) {
  // Checks if user has token in the browser localstorage
  const userToken = useRecoilValue(userTokenSelector);

  if (userToken) {
    return children;
  } else {
    return <Navigate to={'/accounts/login'} />;
  }
}
