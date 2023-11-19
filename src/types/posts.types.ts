export type postType = {
  id: string;
  title: string;
  caption: string;
  imagesUrl: string[];
  author: {
    id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  _count: {
    comments: number;
    likes: number;
  };
};
