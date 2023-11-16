import { axiosClient } from '@/lib/httpClient';
import { ForgotPasswordSchema } from '@/schema';
import { AxiosError, AxiosResponse } from 'axios';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export function ForgotPassword() {
  interface IForgotPasswordFormValues {
    username: string;
  }

  const initialValues: IForgotPasswordFormValues = {
    username: '',
  };

  async function handleSubmit(
    data: IForgotPasswordFormValues,
    actions: FormikHelpers<IForgotPasswordFormValues>,
  ) {
    const response = (await axiosClient
      .get(`/auth/forgotpass?username=${data.username}`)
      .catch((error: AxiosError) => {
        console.error(error.response);
        toast.error(error.response?.data.message);
      })) as AxiosResponse;

    toast.success(response.data.message);
    actions.setSubmitting(false);
  }

  return (
    <main className="flex justify-center flex-col items-center">
      <div className="flex flex-col items-center border border-gray-300 m-3 px-3 py-3">
        <h1 className="w-96 text-center text-4xl font-semibold">
          Forgot Password
        </h1>
        <p className="pt-2">Please provide your username</p>
        <Formik
          validationSchema={toFormikValidationSchema(ForgotPasswordSchema)}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-2 p-5 max-w-xs min-w-full items-center">
              <Field
                id="username"
                name="username"
                placeholder="Username"
                className="text-sm w-full border-gray-300 rounded-sm bg-gray-100"
              />
              {errors.username && touched.username ? (
                <FormError error={errors.username} />
              ) : null}

              <button
                type="submit"
                className="bg-blue-400 focus:bg-blue-500 hover:bg-blue-500 w-full p-1 rounded-md text-white transition-colors"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <Link to="/accounts/login" className="link">
          Login
        </Link>
      </div>
    </main>
  );
}

function FormError({ error }: { error: string }) {
  return (
    <div className="w-full text-center">
      <span className="text-red-500 py-0 text-xs">{error}</span>
    </div>
  );
}
