import React from 'react';

import Grid from '@mui/material/Grid';

import { Posts } from '../components/Posts';
import { Category } from '../components/Category';
import { TagsBlock } from '../components/TagsBlock';
import { Paginator } from '../components/Paginator';

import { useArgs } from '../utils/useArgs';

export const Home = () => {
  const [tag, empty, notEmpty] = useArgs();

  return (
    <>
      {tag ? <h1>{`Последние новости по теме ${tag}`}</h1> : notEmpty && <Category />}
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {empty ? <h2>Постов пока нет :(</h2> : <Posts />}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={['Кино', 'Игры', 'Гаджеты']} isLoading={false} />
        </Grid>
      </Grid>
      {notEmpty && <Paginator />}
    </>
  );
};
