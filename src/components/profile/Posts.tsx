import { previewPostSelector } from '@/store/selectors/posts';
import { useRecoilValue } from 'recoil';
import CameraIcon from '../icons/Camera';
import { PostPreview } from './PostPreview';

export function Posts() {
  const userPosts = useRecoilValue(previewPostSelector);

  if (!userPosts.length) {
    return (
      <>
        <span className="text-sm font-bold pt-5">POSTS</span>
        <div className="w-full h-full flex justify-center text-white flex-col items-center">
          <CameraIcon />
          <h1 className="text-3xl">No Posts Yet</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <span className="text-sm font-bold py-5">POSTS</span>
      <div className="lg:w-4/5 h-full grid grid-cols-1 gap-5 md:grid-cols-3 justify-center">
        {userPosts.map((post) => (
          <PostPreview
            previewImage={post.previewImage}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            key={post.id}
            id={post.id}
          />
        ))}
      </div>
    </>
  );
}
