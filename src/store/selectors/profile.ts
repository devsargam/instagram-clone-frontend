import { selector } from 'recoil';

import { currentProfileState } from '../atoms/profile';

export const currentUserProfileSelector = selector({
  key: 'currentUserProfileSelector',
  get: ({ get }) => {
    const state = get(currentProfileState);

    return state;
  },
});
