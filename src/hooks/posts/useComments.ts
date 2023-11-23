import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { axiosClient } from '@/lib/httpClient';
import { commentStateWithPostID } from '@/store/atoms/comments';
import { commentType } from '@/types';

export const useComments = (postId: string) => {
  const [comments, setComments] = useRecoilState(
    commentStateWithPostID(postId),
  );

  useEffect(() => {
    const getComments = async () => {
      const response = await axiosClient.get(`/comments/posts/${postId}`);
      const responseData = response.data as commentType[];
      setComments(responseData);
    };

    getComments();
  }, [postId, setComments]);

  const postComment = useCallback(
    async (content: string) => {
      await axiosClient.post(`/comments/${postId}`, {
        content,
      });

      toast.info('Comment was added');
    },
    [postId],
  );

  return { comments, postComment };
};
