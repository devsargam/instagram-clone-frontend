import { selector } from 'recoil';

import { userState } from '../atoms/user';

export const userTokenSelector = selector({
  key: 'accountToken',
  get: ({ get }) => {
    const state = get(userState);

    return state.token;
  },
});
