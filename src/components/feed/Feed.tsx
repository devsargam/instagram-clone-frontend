import { useFeed } from '@/hooks/feed/useFeed';
import { Post } from '../common';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export function Feed() {
  const { posts } = useFeed();

  return (
    <section className="flex flex-col w-full justify-center items-center">
      {posts.map((post) => (
        <Post postID={post.id} key={post.id} />
      ))}
    </section>
  );
}
