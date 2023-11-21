import { postType } from '@/types';
import { atom } from 'recoil';

export const postState = atom<postType[]>({
  key: 'postState',
  default: [],
});

export const postStateWithID = (id: string) =>
  atom<postType | null>({
    key: id,
    default: null,
  });
