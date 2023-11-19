import { Navigation } from '@/components/common/Navigation';
import { Posts } from '@/components/profile';
import { UpperProfile } from '@/components/profile/UpperProfile';
import { usePosts } from '@/hooks/posts/usePosts';
import { useProfile } from '@/hooks/profile/useProfile';
import { profileFilterState } from '@/store/atoms/profile';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export function ProfilePage() {
  const { userNotFound, getProfile } = useProfile();
  const { getPosts } = usePosts();
  const setProfileFilterState = useSetRecoilState(profileFilterState);
  const param = useParams();

  useEffect(() => {
    setProfileFilterState(param.username!);
    getProfile(param.username!);
    getPosts(param.username!);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.username]);

  return (
    <main className="flex h-screen bg-black text-white">
      {/* Left Side Navigation Bar */}
      <Navigation />
      {/* // TODO: Implement Navigation*/}
      {/* Main Profile Section */}

      {/* Check if user exists */}
      {userNotFound ? (
        <UserNotFound />
      ) : (
        <section className="flex flex-col w-full items-center">
          {/* Profile Section with no of followers, following & posts */}
          {/* Also, includes username, DP & bio */}
          <UpperProfile />
          {/* Separator */}
          <hr className="border-r-[0.2px] border-gray-800 lg:w-4/5 w-full" />
          {/* Posts */}
          <Posts />
        </section>
      )}
    </main>
  );
}

function UserNotFound() {
  return (
    <section className="flex flex-col w-full items-center">
      <h1 className="text-2xl max-w-xl pt-10">
        Sorry, this page isn't available.
      </h1>
      <h3>
        The link you followed may be broken, or the page may have been removed.{' '}
        <NavLink to="/" className="link">
          Go back to Instagram.
        </NavLink>
      </h3>
    </section>
  );
}
