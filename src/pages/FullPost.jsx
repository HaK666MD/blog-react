import React from 'react';

import { Post } from '../components/Post';

import { useParams } from 'react-router-dom';
import axios from '../axios';

export const FullPost = () => {
  const { id } = useParams();
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt.replace('T', ' ').substr(0, 16)}
        viewsCount={data.viewsCount}
        commentsCount={0}
        tags={data.tags}
        isFullPost>
        <p>{data.text}</p>
      </Post>
    </>
  );
};
