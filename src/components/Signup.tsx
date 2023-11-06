'use client';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import Image from 'next/image';
import Link from 'next/link';

export function SignUp() {
  return (
    <main className="flex justify-center flex-col items-center">
      <div className="flex flex-col items-center border border-gray-300 m-3 px-3 py-3">
        <SignUpForm />
      </div>
      <div
        className="
     flex flex-col items-center border border-gray-300 m-3 px-3 py-3 
      "
      >
        <HaveAnAccount />
      </div>
    </main>
  );
}

function SignUpForm() {
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
    console.log(data);
    actions.setSubmitting(false);
  }

  return (
    <>
      <Image
        src="/instagram.png"
        width={175}
        height={51}
        alt="Instagram Logo"
      />
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="flex flex-col gap-5 p-5 max-w-xs items-center">
            {/* Signup to see photos */}
            <div className="text-gray-500 font-semibold text-center">
              Sign up to see photos and videos from your friends.
            </div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <Field
              id="email"
              name="email"
              placeholder="Email"
              className="text-sm w-full border-gray-300 rounded-sm  bg-gray-100"
            />
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <Field
              id="username"
              name="username"
              placeholder="Username"
              className="text-sm w-full border-gray-300 rounded-sm bg-gray-100"
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Field
              id="password"
              name="password"
              placeholder="Password"
              className="text-sm w-full border-gray-300 rounded-sm  bg-gray-100"
            />
            <span className="text-xs text-center">
              People who use our service may have uploaded your contact
              information to Instagram.{' '}
              <Link className="link" href="#">
                Learn More
              </Link>
            </span>
            <span className="text-xs text-center">
              By signing up, you agree to our{' '}
              <Link className="link" href="#">
                Terms
              </Link>
              ,{' '}
              <Link href="#" className="link">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="#" className="link">
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
        </Formik>
      </div>
    </>
  );
}

function HaveAnAccount() {
  return (
    <div className="min-w-xs">
      <p>
        Have an account?{' '}
        <Link href="/accounts/login" className="link">
          Log in
        </Link>
      </p>
    </div>
  );
}
