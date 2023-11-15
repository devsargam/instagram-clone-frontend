export interface IPost {
  id: string;
  title: string;
  caption: string;
  imagesUrl: string[];
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}
