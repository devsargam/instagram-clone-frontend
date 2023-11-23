export interface ICurrentProfile {
  loading: boolean;
  id: string;
  username: string;
  displayPictureUrl: string;
  UserPreferences: {
    accountType: 'PUBLIC' | 'PRIVATE';
    bio: string | null;
    gender: 'PREFER_NOT_SAY' | 'MALE' | 'FEMALE';
    website: null | string;
  };
  _count: {
    createdPosts: number;
    followedBy: number;
    following: number;
  };
  isFollowedByUser: boolean;
}
