import { put, takeLatest } from 'redux-saga/effects';
import * as slice from '..';

import { githubUserSaga, getUser } from '../saga';
import { UserErrorType } from '../types';

describe('getUser Saga', () => {
  let username: any;
  let user: any;
  let getReposIterator: ReturnType<typeof getUser>;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getReposIterator = getUser();
    const delayDescriptor = getReposIterator.next().value;
    expect(delayDescriptor).toMatchSnapshot();

    const selectDescriptor = getReposIterator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should return error if username is empty', () => {
    username = '';
    const putDescriptor = getReposIterator.next(username).value;
    expect(putDescriptor).toEqual(
      put(slice.githubRepoFormActions.userError(UserErrorType.USERNAME_EMPTY)),
    );

    const iteration = getReposIterator.next();
    expect(iteration.done).toBe(true);
  });

  it('should dispatch the userLoaded action if it requests the data successfully', () => {
    username = 'JaydeepJikadra';
    user = {
      login: 'JaydeepJikadra',
      url: 'https://api.github.com/users/JaydeepJikadra',
      avatar_url: 'https://avatars.githubusercontent.com/u/24971844?v=4',
    };

    const requestDescriptor = getReposIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getReposIterator.next(user).value;
    expect(putDescriptor).toEqual(
      put(slice.githubRepoFormActions.userLoaded(user)),
    );
  });

  it('should dispatch the user not found error', () => {
    username = 'xxx12356465';

    const requestDescriptor = getReposIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getReposIterator.throw({
      response: { status: 404 },
    }).value;
    expect(putDescriptor).toEqual(
      put(slice.githubRepoFormActions.userError(UserErrorType.USER_NOT_FOUND)),
    );
  });

  it('should dispatch the github rate limit error', () => {
    username = 'xxx12356465';

    const requestDescriptor = getReposIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getReposIterator.throw(
      new Error('Failed to fetch'),
    ).value;
    expect(putDescriptor).toEqual(
      put(
        slice.githubRepoFormActions.userError(UserErrorType.GITHUB_RATE_LIMIT),
      ),
    );
  });

  it('should dispatch the response error', () => {
    username = 'xxx12356465';

    const requestDescriptor = getReposIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getReposIterator.throw(new Error('some error')).value;
    expect(putDescriptor).toEqual(
      put(slice.githubRepoFormActions.userError(UserErrorType.RESPONSE_ERROR)),
    );
  });
});

describe('githubUserSaga Saga', () => {
  const githubRepoFormIterator = githubUserSaga();
  it('should start task  for loadUser action', () => {
    const takeLatestDescriptor = githubRepoFormIterator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(slice.githubRepoFormActions.loadUser.type, getUser),
    );
  });
});
