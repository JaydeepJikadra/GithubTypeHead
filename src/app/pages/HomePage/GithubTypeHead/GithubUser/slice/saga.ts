import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { selectUsername } from './selectors';
import { githubRepoFormActions as actions } from '.';
import { User } from 'types/User';
import { UserErrorType } from './types';

/**
 * Github repos request/response handler
 */
export function* getUser() {
  yield delay(500);
  // Select username from store
  const username: string = yield select(selectUsername);
  if (username.length === 0) {
    yield put(actions.userError(UserErrorType.USERNAME_EMPTY));
    return;
  }
  const requestURL = `https://api.github.com/users/${username}`;

  try {
    // Call our request helper (see 'utils/request')
    const user: User = yield call(request, requestURL);
    console.log(
      '🚀 ~ file: saga.ts ~ line 24 ~ function*getRepos ~ user',
      user,
    );
    if (user !== null) {
      yield put(actions.userLoaded(user));
    } else {
      yield put(actions.userError(UserErrorType.USER_NOT_FOUND));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.userError(UserErrorType.USER_NOT_FOUND));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.userError(UserErrorType.GITHUB_RATE_LIMIT));
    } else {
      yield put(actions.userError(UserErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubUserSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadUser.type, getUser);
}
