import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth';
import { filtersReducer } from './slices/filters';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    filters: filtersReducer,
  },
});

export default store;
