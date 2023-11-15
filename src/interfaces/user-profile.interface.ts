export interface IUserProfile {
  id: string;
  username: string;
  displayPictureUrl: string;
  UserPreferences: {
    accountType: 'PUBLIC' | 'PRIVATE';
    bio?: string;
    gender: 'PREFER_NOT_SAY' | 'MALE' | 'FEMALE';
    website?: string | null;
  };
  _count: {
    createdPosts: number;
    followedBy: number;
    following: number;
  };
  isFollowedByUser: true;
}
