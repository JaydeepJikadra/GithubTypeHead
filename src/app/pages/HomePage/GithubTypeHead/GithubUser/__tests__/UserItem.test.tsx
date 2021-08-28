import * as React from 'react';
import { render } from '@testing-library/react';
import { UserItem } from '../UserItem';

const renderUserItem = (props: Parameters<typeof UserItem>[number]) =>
  render(<UserItem {...props} />);

describe('<UserItem />', () => {
  it('should match the snapshot', () => {
    const userItem = renderUserItem({
      login: 'JaydeepJikadra',
      url: 'https://api.github.com/users/JaydeepJikadra',
      avatar_url: 'https://avatars.githubusercontent.com/u/24971844?v=4',
    });
    expect(userItem.container.firstChild).toMatchSnapshot();
  });
});
