import { RecoilState, atom } from 'recoil';

import { IPost } from '@/interfaces';

export const postState = atom<IPost[]>({
  key: 'postState',
  default: [],
});

export const postUrlsState = atom<{ id: string }[]>({
  key: 'postUrlsState',
  default: [],
});

//* Since recoil doesn't allow for recreating the same atom keeping the existing atom in cache
const cache: {
  [key: string]: RecoilState<IPost | null>;
} = {};

export const postStateWithID = (id: string) => {
  if (cache[id]) {
    return cache[id];
  }

  cache[id] = atom<IPost | null>({
    key: `postState_${id}`,
    default: null,
  });

  return cache[id];
};
