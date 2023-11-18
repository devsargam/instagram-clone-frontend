import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {
  ForgotPasswordPage,
  LoginPage,
  SignUpPage,
  VerificationPage,
} from './routes/accounts';
import { ProfilePage } from './routes/profile';
import Home from './routes/Root';
import { Protected } from './Protected';

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
    </>,
  ),
);
