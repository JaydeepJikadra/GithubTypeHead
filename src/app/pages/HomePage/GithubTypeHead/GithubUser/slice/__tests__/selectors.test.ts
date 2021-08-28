import * as selectors from '../selectors';
import { RootState } from 'types';
import { UserErrorType } from '../types';
import { initialState } from '..';
import { User } from 'types/User';

describe('GithubUser selectors', () => {
  let state: RootState = {};

  beforeEach(() => {
    state = {};
  });

  it('should select the initial state', () => {
    expect(selectors.selectUsername(state)).toEqual(initialState.username);
  });

  it('should select username', () => {
    const username = 'test';
    state = {
      githubUser: { ...initialState, username: username },
    };
    expect(selectors.selectUsername(state)).toEqual(username);
  });

  it('should select username', () => {
    const user = { name: 'test' } as User;
    state = {
      githubUser: { ...initialState, user: user },
    };
    expect(selectors.selectUser(state)).toEqual(user);
  });

  it('should select error', () => {
    const error = UserErrorType.USER_NOT_FOUND;
    state = {
      githubUser: { ...initialState, error: error },
    };
    expect(selectors.selectError(state)).toEqual(error);
  });

  it('should select loading', () => {
    const loading = true;
    state = {
      githubUser: { ...initialState, loading: loading },
    };
    expect(selectors.selectLoading(state)).toEqual(loading);
  });
});
