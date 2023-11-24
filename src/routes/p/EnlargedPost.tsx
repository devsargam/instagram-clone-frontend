import { useParams } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Post } from '@/components/common';

function EnlargedPost() {
  const { id } = useParams();
  return (
    <>
      <main className="flex justify-center">
        <Post postID={id!} />
      </main>
    </>
  );
}

export default EnlargedPost;
