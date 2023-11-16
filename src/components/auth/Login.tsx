import { useLocalStorage } from '@/hooks';
import { axiosClient, setAxiosAuthHeader } from '@/lib/httpClient';
import { LoginSchema } from '@/schema';
import { AxiosError, AxiosResponse } from 'axios';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
  return (
    <main className="flex justify-center items-center h-screen">
      <img
        src="/screenshot.png"
        height={500}
        width={760}
        alt="screenshot of the application"
        className="h-3/4 w-auto md:block hidden"
      />
      <div className="flex flex-col">
        <div className="flex flex-col items-center border border-gray-300 m-3 p-5">
          <LoginForm />
        </div>
        <div
          className="
     flex flex-col items-center border border-gray-300 m-3 px-3 py-3 
      "
        >
          <DontHaveAnAccount />
        </div>
      </div>
    </main>
  );
}

function LoginForm() {
  const [_, setToken] = useLocalStorage<string>('accessToken', '');
  const navigate = useNavigate();

  interface ISignUpFormValues {
    username: string;
    password: string;
  }

  const initialValues: ISignUpFormValues = {
    password: '',
    username: '',
  };

  async function handleSubmit(
    data: ISignUpFormValues,
    actions: FormikHelpers<ISignUpFormValues>,
  ) {
    const response = (await axiosClient
      .post('/auth/login', {
        ...data,
      })
      .catch((error: AxiosError) => {
        console.error(error.response);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast(error.response?.data.message);
      })) as AxiosResponse;

    if (response.status === 201) {
      if (response.data.access_token) {
        setToken(response.data.access_token);
        setAxiosAuthHeader(response.data.access_token);
      }
      console.log(response);
      console.log('Logged in');
      navigate('/');
    }
    actions.setSubmitting(false);
  }

  return (
    <>
      <img src="/instagram.png" width={175} height={51} alt="Instagram Logo" />
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={toFormikValidationSchema(LoginSchema)}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-2 p-5 max-w-xs min-w-full items-center">
              <div className="w-full">
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <Field
                  id="username"
                  name="username"
                  placeholder="Username"
                  className="text-sm w-full border-gray-300 rounded-sm bg-gray-100"
                />
                {errors.username && touched.username ? (
                  <FormError error={errors.username} />
                ) : null}
              </div>
              <div className="w-full">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="text-sm w-full border-gray-300 rounded-sm bg-gray-100"
                />
                {errors.password && touched.password ? (
                  <FormError error={errors.password} />
                ) : null}
              </div>
              <button
                type="submit"
                className="bg-blue-400 focus:bg-blue-500 hover:bg-blue-500 w-full p-1 rounded-md text-white transition-colors"
              >
                Log In
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex justify-center">
          <Link
            to="/accounts/password/forgot"
            className="link text-xs my-3 relative"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </>
  );
}

function FormError({ error }: { error: string }) {
  return (
    <div className="w-full text-center">
      <span className="text-red-500 py-0 text-xs">{error}</span>
    </div>
  );
}

function DontHaveAnAccount() {
  return (
    <div className="min-w-xs">
      <p>
        Don&apos;t Have an account?{' '}
        <Link to="/accounts/signup" className="link">
          Sign up
        </Link>
      </p>
    </div>
  );
}
