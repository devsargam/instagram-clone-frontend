import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import {
  Edit,
  ForgotPasswordPage,
  LoginPage,
  SignUpPage,
  VerificationPage,
} from '@/routes/accounts';
import { ProfilePage } from '@/routes/profile';
import Home from '@/routes/Root';
import { Protected } from '@/Protected';
import EnlargedPost from '@/routes/p/EnlargedPost';
import { CreatePost } from './routes/create';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/accounts/login" element={<LoginPage />} />
      <Route path="/accounts/signup" element={<SignUpPage />} />
      <Route path="/accounts/verification" element={<VerificationPage />} />
      <Route
        path="/accounts/forgot-password"
        element={<ForgotPasswordPage />}
      />
      <Route
        path="/accounts/edit"
        element={
          <Protected>
            <Edit />
          </Protected>
        }
      />
      <Route
        path="/"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />
      <Route
        path="/:username"
        element={
          <Protected>
            <ProfilePage />
          </Protected>
        }
      />
      <Route
        path="/p/:id"
        element={
          <Protected>
            <EnlargedPost />
          </Protected>
        }
      />
      <Route
        path="/create/post"
        element={
          <Protected>
            <CreatePost />
          </Protected>
        }
      />
    </>,
  ),
);
