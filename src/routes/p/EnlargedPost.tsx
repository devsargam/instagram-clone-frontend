import { useSinglePost } from '@/hooks/posts/useSinglePost';
import { singlePostState } from '@/store/atoms/posts';
import { Suspense, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

function EnlargedPost() {
  const { id } = useParams();
  const { getPost } = useSinglePost();

  useEffect(() => {
    (async () => {
      await getPost(id!);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="flex justify-center">
        <Post />
      </main>
    </>
  );
}

function Post() {
  const post = useRecoilValue(singlePostState);
  const { id, author, caption, _count, imagesUrl, createdAt } = post;
  /*
  TODO: Implement image carousel
  TODO: Implement Likes
  TODO: Implement Comments
  TODO: Implement view comments
  TODO: Implement save
  */

  return (
    <div className=" rounded overflow-hidden border-gray-800 border w-full lg:w-4/12 md:w-6/12 bg-black mx-3 md:mx-0 lg:mx-0 my-10">
      <div className="w-full flex justify-between p-3">
        <Link to={`/${author.username}`} className="flex">
          <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
            <img src={author.displayPictureUrl} alt="profilepic" />
          </div>
          <span className="pt-1 ml-2 font-bold text-sm">{author.username}</span>
        </Link>
        <span className="px-2 hover:bg-gray-300 cursor-pointer rounded">
          <i className="fas fa-ellipsis-h pt-2 text-lg" />
        </span>
      </div>
      <img className="w-full bg-cover" src={imagesUrl[0]} />
      <div className="px-3 pb-2">
        <div className="pt-2">
          <i className="far fa-heart cursor-pointer" />
          <span className="text-sm text-gray-400 font-medium">
            {_count.likes} likes
          </span>
        </div>
        <div className="pt-1">
          <div className="mb-2 text-sm">
            <span className="font-medium mr-2">{author.username}</span>
            {caption}
          </div>
        </div>
        {_count.comments !== 0 && (
          <div className="text-sm mb-2 text-gray-400 cursor-pointer font-medium">
            View all {_count.comments} comments
          </div>
        )}
      </div>
    </div>
  );
}

export default EnlargedPost;
