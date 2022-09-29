import React from 'react';

import Pagination from '@mui/material/Pagination';
import { PaginationItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPage } from '../redux/slices/filters';

export const Paginator = (props) => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.filters);
  const { posts } = useSelector((state) => state.posts);
  return (
    <Pagination
      page={page}
      color="secondary"
      count={posts.items.totalPages}
      onChange={(e, curentPage) => dispatch(setPage(curentPage))}
      renderItem={(item) => (
        <PaginationItem component={Link} to={`/?page=${item.page}`} {...item} />
      )}
    />
  );
};
