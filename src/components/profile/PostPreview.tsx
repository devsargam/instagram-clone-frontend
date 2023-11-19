import { Link } from 'react-router-dom';
import { CommentIcon } from '../icons/Comment';
import { LikeIcon } from '../icons/like';

type Props = {
  id: string;
  previewImage: string;
  likeCount: number;
  commentCount: number;
};

export function PostPreview({
  id,
  previewImage,
  likeCount,
  commentCount,
}: Props) {
  return (
    <Link to={`/p/${id}`}>
      <article className="block group h-fit">
        <div className="relative">
          <div className="flex justify-center items-center gap-10 w-full absolute top-[150px] text-center opacity-0 group-hover:opacity-100 transition-all text-xl font-bold z-10 select-none">
            <span className="flex items-center gap-2">
              {likeCount} <LikeIcon />
            </span>
            <span className="flex items-center gap-2">
              {commentCount} <CommentIcon />
            </span>
          </div>
          <img
            src={previewImage}
            alt="Post Image Picture"
            height={309}
            width={309}
            className="group-hover:opacity-50 transition-all"
          />
        </div>
      </article>
    </Link>
  );
}
