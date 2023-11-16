import { IUserProfile } from '@/interfaces';

const userProfile: IUserProfile = {
  id: '4c91ff9f-8687-4d8b-915d-bab50999d33f',
  username: 'sargam',
  displayPictureUrl:
    'https://sargams-bucket.s3.eu-north-1.amazonaws.com/dd2f9f7a-2289-445e-9bee-fad7095e403a.png',
  UserPreferences: {
    accountType: 'PUBLIC',
    bio: 'I write colorful text on dark screen',
    gender: 'PREFER_NOT_SAY',
    website: null,
  },
  _count: {
    createdPosts: 1,
    followedBy: 1,
    following: 0,
  },
  isFollowedByUser: true,
};

export function UpperProfile() {
  const { username, displayPictureUrl, UserPreferences, _count } = userProfile;
  return (
    <div className="flex gap-12 pt-20 pb-10">
      {/* DP */}
      <img
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
          <div className="flex flex-col gap-5">
            {/* Posts Count, Follower Count, Following Count */}
            <ul className="flex gap-5">
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
            <h1 className="w-64 text-sm">{UserPreferences.bio}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
