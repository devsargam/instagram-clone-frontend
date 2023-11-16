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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<h1>hello</h1>} />
      <Route path="/accounts/login" element={<LoginPage />} />
      <Route path="/accounts/signup" element={<SignUpPage />} />
      <Route path="/accounts/verification" element={<VerificationPage />} />
      <Route
        path="/accounts/forgot-password"
        element={<ForgotPasswordPage />}
      />
      <Route path="/:username" element={<ProfilePage />} />
    </>,
  ),
);
