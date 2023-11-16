import { Navigation } from '@/components/common/Navigation';
import { Posts } from '@/components/profile';
import { UpperProfile } from '@/components/profile/UpperProfile';
import { useParams } from 'react-router-dom';

export function ProfilePage() {
  const { username } = useParams();
  console.log(username);
  return (
    <main className="flex h-screen bg-black text-white">
      {/* Left Side Navigation Bar */}
      <Navigation />
      {/* // TODO: Implement Navigation*/}
      {/* Main Profile Section */}
      <section className="flex flex-col w-full items-center">
        {/* Profile Section with no of followers, following & posts */}
        {/* Also, includes username, DP & bio */}
        <UpperProfile />
        {/* Separator */}
        <hr className="border-r-[0.2px] border-gray-800 lg:w-4/5 w-full" />
        {/* Posts */}
        <Posts />
      </section>
    </main>
  );
}
