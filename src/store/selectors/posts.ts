import { selector } from 'recoil';
import { postState } from '../atoms/posts';
import { profileFilterState } from '../atoms/profile';

export const getPostsByUsername = selector({
  key: 'getPostByUsername',
  get: ({ get }) => {
    const state = get(postState);
    const currentProfileFilterState = get(profileFilterState);

    return state.filter((post) => post.authorId === currentProfileFilterState);
  },
});
