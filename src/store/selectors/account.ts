import { selector } from 'recoil';
import { userState } from '../atoms/account';

export const accountTokenSelector = selector({
  key: 'accountToken',
  get: ({ get }) => {
    const state = get(userState);

    return state.token;
  },
});
