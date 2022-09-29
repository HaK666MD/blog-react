import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({ tab, page, tag }) => {
  const last = Boolean(tab === 0);
  let base = `/posts?page=${page}&limit=3`;
  let urlWithFilter = last ? base + '&last=-1' : base + '&rating=-1';

  try {
    const { data } = tag
      ? await axios.get(base + `&tag=${tag}&last=-1`)
      : await axios.get(urlWithFilter);
    return data;
  } catch (error) {
    console.warn(error.message);
  }
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
  await axios.delete(`/posts/${id}`);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: {
      items: [],
      status: 'loading',
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GeT
      .addCase(fetchPosts.pending, (state) => {
        state.posts.items = [];
        state.posts.status = 'loading';
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = 'loaded';
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.posts.items = [];
        state.posts.status = 'error';
      })
      //Delete
      .addCase(fetchRemovePost.pending, (state, action) => {
        state.posts.items.data = state.posts.items.data.filter(
          (obj) => obj._id !== action.meta.arg,
        );
      });
  },
});

export const postsReducer = postsSlice.reducer;
