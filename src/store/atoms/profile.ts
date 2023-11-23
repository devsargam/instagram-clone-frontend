import { atom } from 'recoil';

import { ICurrentProfile } from '@/interfaces';

export const profileFilterState = atom({
  key: 'profileFilterState',
  default: '',
});

export const currentProfileState = atom<ICurrentProfile>({
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
