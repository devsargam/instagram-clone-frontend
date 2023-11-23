import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Post } from '@/components/common';
import { useSinglePost } from '@/hooks';

function EnlargedPost() {
  const { id } = useParams();
  const { getPost } = useSinglePost(id!);

  useEffect(() => {
    (async () => {
      await getPost(id!);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!id) {
    return null;
  }

  return (
    <>
      <main className="flex justify-center">
        <Post postID={id} />
      </main>
    </>
  );
}

export default EnlargedPost;
