import { RecoilState, atom } from 'recoil';

import { IComment } from '@/interfaces';

//* Since recoil doesn't allow for recreating the same atom keeping the existing atom in cache
const cache: {
  [key: string]: RecoilState<IComment[]>;
} = {};

export const commentStateWithPostID = (postID: string) => {
  if (cache[postID]) {
    return cache[postID];
  }

  cache[postID] = atom<IComment[]>({
    key: `commentState${postID}`,
    default: [],
  });

  return cache[postID];
};
