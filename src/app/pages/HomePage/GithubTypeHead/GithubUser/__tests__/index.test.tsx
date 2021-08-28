import * as React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styles/theme/ThemeProvider';

import { GithubUser, repoErrorText } from '..';
import { configureAppStore } from 'store/configureStore';
import { githubRepoFormActions as actions, initialState } from '../slice';
import { UserErrorType } from '../slice/types';

function* mockGithubUserSaga() {}

jest.mock('../slice/saga', () => ({
  githubUserSaga: mockGithubUserSaga,
}));

const renderGithubUser = (store: Store) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <GithubUser />
      </ThemeProvider>
    </Provider>,
  );

describe('<GithubUser />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderGithubUser>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderGithubUser(store);
    store.dispatch(actions.userLoaded(null));
    expect(store.getState().githubUser).toEqual(initialState);
  });
  afterEach(() => {
    component.unmount();
  });

  it("should fetch user on mount if username isn't empty", () => {
    component.unmount();
    component = renderGithubUser(store);
    expect(initialState.username.length).toBeGreaterThan(0);
    expect(store.getState().githubUser.loading).toBe(true);
  });

  it("shouldn't fetch user on mount if username is empty", () => {
    store.dispatch(actions.changeUsername(''));
    store.dispatch(actions.userLoaded([]));
    component.unmount();
    component = renderGithubUser(store);
    expect(store.getState().githubUser.loading).toBe(false);
  });

  it('should dispatch action on username change', () => {
    const input = component.container.querySelector('input');
    fireEvent.change(input!, { target: { value: 'test' } });
    expect(store.getState().githubUser.loading).toBe(true);
  });

  it('should change username field value on action', () => {
    const value = 'test';
    const form = renderGithubUser(store);

    const input = form.container.querySelector('input');
    fireEvent.change(input!, { target: { value: value } });

    expect(form.container.querySelector('input')?.value).toBe(value);
  });

  it('should display loading indicator when state is loading', () => {
    store.dispatch(actions.loadUser());
    expect(component.container.querySelector('circle')).toBeInTheDocument();
  });

  it('should display user when not empty', () => {
    store.dispatch(
      actions.userLoaded({
        id: 24971844,
        name: 'Jaydeep Jikadra',
        login: 'JaydeepJikadra',
        html_url: 'https://api.github.com/users/JaydeepJikadra',
        avatar_url: 'https://avatars.githubusercontent.com/u/24971844?v=4',
      }),
    );
    expect(component.queryByText('JaydeepJikadra')).toBeInTheDocument();
  });

  it('should display error when userError fired', () => {
    let error = UserErrorType.USER_NOT_FOUND;
    store.dispatch(actions.userError(error));
    expect(component.queryByText(repoErrorText(error))).toBeInTheDocument();

    error = UserErrorType.USERNAME_EMPTY;
    store.dispatch(actions.userError(error));
    expect(component.queryByText(repoErrorText(error))).toBeInTheDocument();

    error = UserErrorType.RESPONSE_ERROR;
    store.dispatch(actions.userError(error));
    expect(component.queryByText(repoErrorText(error))).toBeInTheDocument();

    error = UserErrorType.GITHUB_RATE_LIMIT;
    store.dispatch(actions.userError(error));
    expect(component.queryByText(repoErrorText(error))).toBeInTheDocument();
  });
});
