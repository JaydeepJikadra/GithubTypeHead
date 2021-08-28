import { PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/User';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { githubUserSaga } from './saga';
import { GithubUserState, UserErrorType } from './types';

export const initialState: GithubUserState = {
  username: 'JaydeepJikadra',
  user: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'githubUser',
  initialState,
  reducers: {
    changeUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    loadUser(state) {
      state.loading = true;
      state.error = null;
      state.user = null;
    },
    userLoaded(state, action: PayloadAction<User>) {
      const user = action.payload;
      state.user = user;
      state.loading = false;
    },
    userError(state, action: PayloadAction<UserErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: githubRepoFormActions, reducer } = slice;

export const useGithubRepoFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: githubUserSaga });
  return { actions: slice.actions };
};
