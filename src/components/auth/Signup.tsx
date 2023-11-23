import { Field, Form, Formik, FormikHelpers } from 'formik';
import { SignupSchema } from '@/schema';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '@/hooks';

export function SignUp() {
  return (
    <main className="flex justify-center flex-col items-center">
      <div className="flex flex-col items-center border border-gray-300 m-3 px-3 py-3">
        <SignUpForm />
      </div>
      <div className="flex flex-col items-center border border-gray-300 m-3 px-3 py-3">
        <HaveAnAccount />
      </div>
    </main>
  );
}

function SignUpForm() {
  const navigate = useNavigate();
  const { signup } = useSignup();
  interface ISignUpFormValues {
    email: string;
    username: string;
    password: string;
  }

  const initialValues: ISignUpFormValues = {
    email: '',
    password: '',
    username: '',
  };

  async function handleSubmit(
    data: ISignUpFormValues,
    actions: FormikHelpers<ISignUpFormValues>,
  ) {
    await signup(data.email, data.password, data.username);
    navigate('/accounts/verification');
    actions.setSubmitting(false);
  }

  return (
    <>
      <img src="/instagram.png" width={175} height={51} alt="Instagram Logo" />
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={toFormikValidationSchema(SignupSchema)}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-2 p-5 max-w-xs items-center">
              {/* Signup to see photos */}
              <div className="text-gray-500 font-semibold text-center">
                Sign up to see photos and videos from your friends.
              </div>
              <div className="w-full">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="text-sm w-full rounded-sm bg-gray-100 border-gray-300"
                />
                {errors.email && touched.email ? (
                  <FormError error={errors.email} />
                ) : null}
              </div>
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
              <span className="text-xs text-center">
                People who use our service may have uploaded your contact
                information to Instagram.{' '}
                <Link className="link" to="#">
                  Learn More
                </Link>
              </span>
              <span className="text-xs text-center">
                By signing up, you agree to our{' '}
                <Link className="link" to="#">
                  Terms
                </Link>
                ,{' '}
                <Link to="#" className="link">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link to="#" className="link">
                  Cookies Policy
                </Link>
                .
              </span>
              <button
                type="submit"
                className="bg-blue-400 focus:bg-blue-500 hover:bg-blue-500 w-full p-1 rounded-md text-white transition-colors"
              >
                Sign up
              </button>
            </Form>
          )}
        </Formik>
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

function HaveAnAccount() {
  return (
    <div className="min-w-xs">
      <p>
        Have an account?{' '}
        <Link to="/accounts/login" className="link">
          Log in
        </Link>
      </p>
    </div>
  );
}
