import { Link } from 'react-router-dom';
import { CreateIcon, HomeIcon } from '../icons';
import InstagramIcon from '../icons/Instagram';
import { useRecoilValue } from 'recoil';
import { loggedInUserProfileState } from '@/store/atoms/profile';

export function Navigation() {
  const loggedInUser = useRecoilValue(loggedInUserProfileState);

  return (
    <nav className="hidden min-h-screen w-80 bg-black border-r-[0.2px] border-gray-800 py-10 px-10 sm:flex flex-col gap-3">
      <Link to={'/'}>
        <InstagramIcon />
      </Link>
      <Link
        to={'/'}
        className="flex items-center gap-3 hover:bg-gray-900 p-2 rounded-lg transition-colors"
      >
        <HomeIcon />
        <span className="text-xl">Home</span>
      </Link>
      <Link
        to={'/create/post'}
        className="flex items-center gap-3 hover:bg-gray-900 p-2 rounded-lg transition-colors"
      >
        <CreateIcon />
        <span className="text-xl">Create</span>
      </Link>
      <Link
        to={`/${loggedInUser.username}`}
        className="flex items-center gap-3 hover:bg-gray-900 p-2 rounded-lg transition-colors"
      >
        <img
          height={24}
          width={24}
          className="rounded-full"
          src={loggedInUser.displayPictureUrl}
          alt={`${loggedInUser.username} photo`}
        />
        <span className="text-xl">Profile</span>
      </Link>
    </nav>
  );
}
