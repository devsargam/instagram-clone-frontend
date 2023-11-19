import { atom } from 'recoil';
import { localStorageEffect } from '../effects/localStorageEffect';
import { accountStateType } from '@/types';

const key = 'accountState';
export const userState = atom<accountStateType>({
  key: key,
  default: {
    token: '',
    loading: true,
  },
  effects: [localStorageEffect<accountStateType>(key)],
});
