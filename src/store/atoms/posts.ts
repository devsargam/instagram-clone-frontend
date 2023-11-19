import { postType } from '@/types';
import { atom } from 'recoil';

export const postState = atom<postType[]>({
  key: 'postState',
  default: [],
});
