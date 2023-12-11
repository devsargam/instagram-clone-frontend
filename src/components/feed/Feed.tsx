import { useFeed } from '@/hooks/feed/useFeed';
import { Navigation, Post } from '../common';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { RightPanel } from '.';

export function Feed() {
  const { posts } = useFeed();

  return (
    <div className="flex w-full justify-between bg-black text-white">
      <Navigation />
      <div className="flex flex-col justify-center items-center">
        {posts.map((post) => {
          console.log(post);
          return <Post postID={post.id} key={post.id} />;
        })}
      </div>
      <RightPanel />
    </div>
  );
}
