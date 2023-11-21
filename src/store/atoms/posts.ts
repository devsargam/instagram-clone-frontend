import { postType } from '@/types';
import { atom } from 'recoil';

export const postState = atom<postType[]>({
  key: 'postState',
  default: [],
});

export const singlePostState = atom<postType>({
  key: 'singlePostState',
  default: {
    author: {
      displayPictureUrl: '',
      id: '',
      username: '',
    },
    caption: '',
    title: '',
    imagesUrl: [],
    id: '',
    _count: {
      comments: 0,
      likes: 0,
    },
    createdAt: '',
    updatedAt: '',
  },
});
