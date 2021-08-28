import * as React from 'react';
import styled from 'styled-components/macro';
import { ThemeSwitch } from '../ThemeSwitch';

export function Nav() {
  return (
    <Wrapper>
      <ThemeSwitch />
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;
