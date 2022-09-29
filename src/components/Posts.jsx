import React from 'react';
import { useSelector } from 'react-redux';

import { Post } from './Post';

export const Posts = () => {
  const { data } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const isPostLoading = posts.status === 'loading';

  return (
    <>
      {(isPostLoading ? [...Array(5)] : posts.items.data).map((obj, index) =>
        isPostLoading ? (
          <Post key={index} isLoading={true} />
        ) : (
          <Post
            id={obj._id}
            key={obj._id}
            title={obj.title}
            imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
            user={obj.user}
            createdAt={obj.createdAt.replace('T', ' ').substr(0, 16)}
            viewsCount={obj.viewsCount}
            commentsCount={0}
            tags={obj.tags}
            isEditable={data?._id === obj.user._id}
          />
        ),
      )}
    </>
  );
};
