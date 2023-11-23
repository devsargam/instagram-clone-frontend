export interface IComment {
  content: string;
  commenedBy: {
    username: string;
    displayPictureUrl: string;
  };
}
