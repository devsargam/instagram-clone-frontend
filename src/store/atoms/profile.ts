import { currentProfileType } from '@/types/currentProfile.types';
import { atom } from 'recoil';

export const profileFilterState = atom({
  key: 'profileFilterState',
  default: '',
});

export const currentProfileState = atom<currentProfileType>({
  key: 'currentProfileState',
  default: {
    loading: true,
    id: '',
    username: '',
    displayPictureUrl: '',
    UserPreferences: {
      accountType: 'PUBLIC',
      bio: null,
      gender: 'PREFER_NOT_SAY',
      website: null,
    },
    _count: {
      createdPosts: 0,
      followedBy: 0,
      following: 0,
    },
    isFollowedByUser: false,
  },
});
