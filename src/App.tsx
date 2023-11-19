import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { userTokenSelector } from './store/selectors/user';
import { setAxiosAuthHeader } from './lib/httpClient';

function App() {
  const token = useRecoilValue(userTokenSelector);
  setAxiosAuthHeader(token);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
