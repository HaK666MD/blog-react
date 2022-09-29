import { useEffect } from 'react';
import { fetchPosts } from '../redux/slices/posts';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const useArgs = () => {
  const dispatch = useDispatch();

  const { tag } = useParams();
  const { posts } = useSelector((state) => state.posts);
  const { page, tab } = useSelector((state) => state.filters);

  const notEmpty = posts.items.data?.length > 0;
  const empty = posts.status === 'loaded' && posts.items.data?.length === 0;

  useEffect(() => {
    dispatch(fetchPosts({ page, tab, tag }));
  }, [page, tab, tag]);

  return [tag, empty, notEmpty];
};
