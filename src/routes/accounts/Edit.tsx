import { Navigation } from '@/components/common';
import { axiosClient } from '@/lib/httpClient';
import { EditProfileSchema } from '@/schema';
import { loggedInUserProfileState } from '@/store/atoms/profile';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export function Edit() {
  return (
    <main className="flex h-screen bg-black text-white">
      {/* Left Side Navigation Bar */}
      <Navigation />
      <div className="sm:m-20 mx-auto">
        <h1 className="font-semibold text-xl w-full pb-3">Edit Profile</h1>
        <ChangeDP />

        <Formik
          initialValues={{
            website: '',
            bio: '',
            gender: '',
            receiveMarkettingEmails: false,
            accountType: '',
          }}
          onSubmit={async (values) => {
            try {
              const res = await axiosClient.post('/users/preferences', {
                ...values,
              });
              toast.info(res.data.message);
            } catch {
              toast.error('Something wrong happened');
            }
          }}
          validationSchema={toFormikValidationSchema(EditProfileSchema)}
        >
          {(formik) => (
            <Form className="flex flex-col gap-2">
              <label>Website</label>
              <Field
                type="text"
                id="website"
                name="website"
                onChange={formik.handleChange}
                value={formik.values.website}
                className="focus:ring-transparent border-gray-900 bg-gray-950 rounded-lg"
              />
              <ErrorMessage name="website" component="div" />
              <label>Bio</label>
              <Field
                type="text"
                id="bio"
                name="bio"
                onChange={formik.handleChange}
                value={formik.values.bio}
                className="focus:ring-transparent border-gray-900 bg-gray-950 rounded-lg"
              />
              <ErrorMessage name="bio" component="div" />
              <label>Gender</label>
              <Field
                name="gender"
                as="select"
                className="bg-gray-950 rounded-lg"
                required
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="RATHER_NOT_SAY">Rather Not Say</option>
              </Field>
              <ErrorMessage name="gender" component="div" />

              <label>Account Type</label>

              <Field
                name="accountType"
                as="select"
                className="bg-gray-950 rounded-lg"
              >
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
              </Field>
              <ErrorMessage name="accountType" component="div" />

              <button
                type="submit"
                className="w-auto bg-blue-500 focus:bg-blue-600 hover:bg-blue-600 py-1 px-3 rounded-md text-white transition-colors"
              >
                Done
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}

function ChangeDP() {
  const { displayPictureUrl, username } = useRecoilValue(
    loggedInUserProfileState,
  );

  return (
    <div className="flex w-96 justify-between items-center bg-gray-900 px-4 py-2 rounded-2xl">
      <div className="flex items-center gap-2">
        <img
          height={50}
          width={50}
          className="rounded-full"
          src={displayPictureUrl}
          alt={`${username}'s photo`}
        />
        <span className="text-md font-semibold">{username}</span>
      </div>
      <button className="bg-white text-black font-semibold p-2 rounded-md h-fit">
        Change Photo
      </button>
    </div>
  );
}
