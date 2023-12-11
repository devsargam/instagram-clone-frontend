import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { CommentIcon, PostLikeIcon } from '../icons';
import { Carousel } from 'react-responsive-carousel';

import { useComments, useSinglePost } from '@/hooks';
import { useLike } from '@/hooks';
import { postStateWithID } from '@/store/atoms/posts';

type PostProps = {
  postID: string;
};

export function Post({ postID }: PostProps) {
  const [showComments, setShowComments] = useState(false);
  const commentRef = useRef<HTMLInputElement>(null);
  const post = useRecoilValue(postStateWithID(postID));
  const { like, unLike, isLiked } = useLike(postID);

  const { getPost } = useSinglePost(postID!);

  useEffect(() => {
    (async () => {
      await getPost(postID!);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async () => {
    if (isLiked) {
      await unLike();
    } else {
      await like();
    }
  };

  if (!post) {
    // Return some sort of loading component;
    return <>Loading ...</>;
  }

  const { author, caption, _count, imagesUrl } = post;
  /*
  TODO: Implement save
  */

  return (
    <div className="h-fit rounded overflow-hidden border-gray-800 border w-11/12 mx-auto md:min-w-[30rem] lg:w-4/12 md:w-6/12 bg-black sm:mx-3 md:mx-0 lg:mx-0  my-1 flex flex-col">
      <div className="w-full flex justify-between p-3">
        <Link to={`/${author.username}`} className="flex">
          <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
            <img src={author.displayPictureUrl} alt="profilepic" />
          </div>
          <span className="pt-1 ml-2 font-bold text-sm">{author.username}</span>
        </Link>
      </div>
      <Carousel emulateTouch showThumbs={false}>
        {imagesUrl.map((url) => (
          <img key={url} className="w-full bg-cover select-none" src={url} />
        ))}
      </Carousel>
      <div className="px-3 pb-2">
        <div className="pt-2">
          <div className="pt-1 flex gap-2">
            <button onClick={handleClick}>
              <PostLikeIcon isLiked={isLiked} />
            </button>
            <button onClick={() => commentRef.current?.focus()}>
              <CommentIcon />
            </button>
          </div>{' '}
          <i className="far fa-heart cursor-pointer" />
          <span className="text-sm text-gray-400 font-medium">
            {_count.likes} likes
          </span>
        </div>
        <div className="pt-1">
          <div className="mb-2 text-sm">
            <NavLink to={`/${author.username}`} className="font-medium mr-2">
              {author.username}
            </NavLink>
            {caption}
          </div>
        </div>

        {_count.comments !== 0 &&
          (!showComments ? (
            <div
              onClick={() => {
                setShowComments(!showComments);
              }}
              className="text-sm mb-2 text-gray-400 cursor-pointer font-medium"
            >
              View all {_count.comments} comments
            </div>
          ) : (
            <Comments postID={postID} />
          ))}
        <WriteComment commentRef={commentRef} postID={postID} />
      </div>
    </div>
  );
}

type CommentsProps = {
  postID: string;
};

function Comments({ postID }: CommentsProps) {
  const { comments } = useComments(postID);

  if (!comments) {
    <span>Loading ...</span>;
  }

  return (
    <>
      {comments.map((comment, i) => (
        <Comment comment={comment} key={i} />
      ))}
    </>
  );
}

type CommentProps = {
  comment: {
    content: string;
    commenedBy: {
      username: string;
      displayPictureUrl: string;
    };
  };
};

function Comment({ comment }: CommentProps) {
  const {
    content,
    commenedBy: { username },
  } = comment;

  return (
    <>
      <div className="mb-2">
        <div className="mb-2 text-sm flex items-center">
          <NavLink
            to={`/${username}`}
            className="mr-2 flex items-center gap-2 font-semibold text-sm"
          >
            <span>{username}</span>
          </NavLink>
          <div>{content}</div>
        </div>
      </div>
    </>
  );
}

type WriteCommentProps = {
  postID: string;
  commentRef: React.RefObject<HTMLInputElement>;
};

function WriteComment({ postID, commentRef }: WriteCommentProps) {
  const { postComment } = useComments(postID);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Check if the comment input is null or empty
    if (!commentRef.current?.value) return;
    postComment(commentRef.current?.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        placeholder="Add a comment"
        className="text-gray-300 text-sm p-1 w-full rounded-sm bg-transparent border-none focus:ring-transparent"
        type="text"
        ref={commentRef}
      />
      {commentRef.current?.value && <button type="submit">Post</button>}
    </form>
  );
}
