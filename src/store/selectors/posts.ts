import { selector } from 'recoil';

import { postState } from '../atoms/posts';

export const previewPostSelector = selector({
  key: 'previewPostSelector',
  get: ({ get }) => {
    const state = get(postState);
    return state.map((post) => ({
      id: post.id,
      commentCount: post._count.comments,
      likeCount: post._count.likes,
      previewImage: post.imagesUrl[0],
    }));
  },
});
