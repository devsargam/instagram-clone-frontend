import { useSetRecoilState } from 'recoil';
import { axiosClient } from '@/lib/httpClient';
import { suggestedUsersState } from '@/store/atoms/suggestedPeople';
import { currentProfileState } from '@/store/atoms/profile';

export function useFollow() {
  const setSuggested = useSetRecoilState(suggestedUsersState);
  const setCurrentProfile = useSetRecoilState(currentProfileState);

  const followFn = async (username: string) => {
    await axiosClient.post(`/users/${username}/follow`);
    setSuggested((oldSuggestions) =>
      oldSuggestions.filter((user) => user.username !== username),
    );
    setCurrentProfile((currentProfile) => ({
      ...currentProfile,
      isFollowedByUser: true,
      _count: {
        ...currentProfile._count,
        followedBy: currentProfile._count.followedBy + 1,
      },
    }));
  };

  const unfollowFn = async (username: string) => {
    await axiosClient.post(`/users/${username}/unfollow`);
    setCurrentProfile((currentProfile) => ({
      ...currentProfile,
      isFollowedByUser: false,
      _count: {
        ...currentProfile._count,
        followedBy: currentProfile._count.followedBy - 1,
      },
    }));
  };

  return { followFn, unfollowFn };
}
