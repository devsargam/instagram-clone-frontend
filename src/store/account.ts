import { atom } from 'recoil';

export const userState = atom({
  key: 'accountState',
  default: {
    token: '',
    loading: true,
  },
});
