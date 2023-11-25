import { atom } from 'recoil';

import { ISuggestedUser } from '@/interfaces';

export const suggestedUsersState = atom<ISuggestedUser[]>({
  key: 'suggestedUsersState',
  default: [],
});
