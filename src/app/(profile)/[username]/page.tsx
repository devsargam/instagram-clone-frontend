'use client';

import InstagramIcon from '@/components/icons/Instagram';
import { IUserProfile } from '@/interfaces';
import { axiosClient } from '@/lib/httpClient';
import { AxiosError, AxiosResponse } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const router = useRouter();
  const [profile, setProfile] = useState<IUserProfile | undefined>();

  useEffect(() => {
    async function fetchUserProfile() {
      const response = (await axiosClient
        .get(`/users/profile/${params.username}`, {
          headers: {
            Authorization:
              'Bearer ' +
              JSON.parse(localStorage.getItem('accessToken') as string),
          },
        })
        .catch((error: AxiosError) => {
          console.error(error.response);
          if (error.response?.status === 401) {
            router.push('/accounts/login');
          }
        })) as AxiosResponse;

      console.log(JSON.stringify(response));
      setProfile(response.data);
    }
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex h-screen bg-black text-white">
      {/* Left Side Navigation Bar */}
      <nav className="h-full w-60 bg-black border-r-[0.2px] border-gray-800 py-10 px-5">
        <InstagramIcon />
      </nav>
      {/* // TODO: Implement Navigation*/}
      {/* Main Profile Section */}

      <Profile />
    </main>
  );
}

const userProfile = {
  username: 'srgamcods',
  displayPictureUrl:
    'https://sargams-bucket.s3.eu-north-1.amazonaws.com/dd2f9f7a-2289-445e-9bee-fad7095e403a.png',
  UserPreferences: {
    bio: 'I write colorful text on dark screen',
  },
};

function Profile() {
  const { username, displayPictureUrl, UserPreferences } = userProfile;
  return (
    <section className="flex flex-col w-full items-center">
      <div className="flex gap-12 pt-20 pb-10">
        {/* DP */}
        <Image
          src={displayPictureUrl}
          alt="Display Picture"
          height={150}
          width={150}
          className="rounded-full"
        />
        {/* Username, Following or Follow & Message */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <h2 className="text-xl">{username}</h2>
            <button className="w-auto bg-blue-500 focus:bg-blue-600 hover:bg-blue-600 py-1 px-3 rounded-md text-white transition-colors">
              Follow
            </button>
          </div>
          {/* DP & Profile Info */}
          <div>
            <div>
              {/* Posts Count, Follower Count, Following Count */}

              {/* Bio */}
              <h1>{UserPreferences.bio}</h1>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-r-[0.2px] border-gray-800 lg:w-4/5 w-full" />
      {/* Separator */}
      {/* Posts */}
    </section>
  );
}
