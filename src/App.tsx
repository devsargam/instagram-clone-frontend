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
    <main className="bg-black min-h-screen text-white">
      <ToastContainer />
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
