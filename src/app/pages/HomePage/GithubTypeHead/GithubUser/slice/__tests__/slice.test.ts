import * as slice from '..';
import { ContainerState, UserErrorType } from '../types';
import { User } from 'types/User';

describe('GithubUser slice', () => {
  let state: ContainerState;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should handle changeUsername', () => {
    const text = 'test';
    expect(
      slice.reducer(state, slice.githubRepoFormActions.changeUsername(text)),
    ).toEqual<ContainerState>({
      ...slice.initialState,
      username: text,
    });
  });

  it('should handle loadUser', () => {
    expect(
      slice.reducer(state, slice.githubRepoFormActions.loadUser()),
    ).toEqual<ContainerState>({
      ...slice.initialState,
      loading: true,
      user: null,
      error: null,
    });
  });

  it('should handle userError', () => {
    const userError = UserErrorType.USER_NOT_FOUND;
    expect(
      slice.reducer(state, slice.githubRepoFormActions.userError(userError)),
    ).toEqual<ContainerState>({
      ...slice.initialState,
      error: userError,
    });
  });
});
