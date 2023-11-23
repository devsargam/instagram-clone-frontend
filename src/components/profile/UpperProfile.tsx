import { currentUserProfileSelector } from '@/store/selectors/profile';
import { useRecoilValue } from 'recoil';

export function UpperProfile() {
  const {
    username,
    displayPictureUrl,
    UserPreferences,
    _count,
    isFollowedByUser,
  } = useRecoilValue(currentUserProfileSelector)!;

  return (
    <div className='flex gap-12 pt-20 pb-10'>
      {/* DP */}
      <img
        src={
          displayPictureUrl !== null
            ? displayPictureUrl
            : '/default-profile.png'
        }
        alt='Display Picture'
        height={150}
        width={150}
        className='rounded-full'
      />
      {/* Username, Following or Follow & Message */}
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <h2 className='text-xl'>{username}</h2>
          {isFollowedByUser ? (
            <button className='w-auto bg-blue-500 focus:bg-blue-600 hover:bg-blue-600 py-1 px-3 rounded-md text-white transition-colors'>
              Unfollow
            </button>
          ) : (
            <button className='w-auto bg-blue-500 focus:bg-blue-600 hover:bg-blue-600 py-1 px-3 rounded-md text-white transition-colors'>
              Follow
            </button>
          )}
        </div>
        {/* DP & Profile Info */}
        <div>
          <div className='flex flex-col gap-5'>
            {/* Posts Count, Follower Count, Following Count */}
            <ul className='flex gap-5'>
              <li>
                {_count.createdPosts === 1
                  ? `${_count.createdPosts} post`
                  : `${_count.createdPosts} posts`}
              </li>
              <li>
                {_count.followedBy === 1
                  ? `${_count.followedBy} follower`
                  : `${_count.followedBy} followers`}
              </li>
              <li>{_count.following} following</li>
            </ul>
            {/* Bio */}
            <h1 className='w-64 text-sm'>{UserPreferences.bio}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
