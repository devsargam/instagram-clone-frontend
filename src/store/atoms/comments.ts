import { RecoilState, atom } from 'recoil';

import { commentType } from '@/types';

//* Since recoil doesn't allow for recreating the same atom keeping the existing atom in cache
const cache: {
  [key: string]: RecoilState<commentType[]>;
} = {};

export const commentStateWithPostID = (postID: string) => {
  if (cache[postID]) {
    return cache[postID];
  }

  cache[postID] = atom<commentType[]>({
    key: `commentState${postID}`,
    default: [],
  });

  return cache[postID];
};
