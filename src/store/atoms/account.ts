import { atom } from 'recoil';
import { localStorageEffect } from '../effects/localStorageEffect';

type accountStateType = {
  token: string;
  loading: boolean;
};

const key = 'accountState';
export const userState = atom<accountStateType>({
  key: key,
  default: {
    token: '',
    loading: true,
  },
  effects: [localStorageEffect<accountStateType>(key)],
});
