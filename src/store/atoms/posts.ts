import { postType } from '@/types';
import { RecoilState, atom } from 'recoil';

export const postState = atom<postType[]>({
  key: 'postState',
  default: [],
});

//* Since recoil doesn't allow for recreating the same atom keeping the existing atom in cache
const cache: {
  [key: string]: RecoilState<postType | null>;
} = {};

export const postStateWithID = (id: string) => {
  if (cache[id]) {
    return cache[id];
  }

  cache[id] = atom<postType | null>({
    key: `postState_${id}`,
    default: null,
  });

  return cache[id];
};
