import { atom } from 'recoil';

import { localStorageEffect } from '../effects/localStorageEffect';
import { IAccountState } from '@/interfaces';

const key = 'accountState';
export const userState = atom<IAccountState>({
  key: key,
  default: {
    token: '',
    loading: true,
  },
  effects: [localStorageEffect<IAccountState>(key)],
});
