import * as React from 'react';
import styled from 'styled-components/macro';
import { GithubUser } from './GithubUser';

export function GithubTypeHead() {
  return (
    <Content>
      <GithubUser />
    </Content>
  );
}

const Content = styled.div`
  flex: 1;
  margin: 1.25rem 0 6.25rem 2.25rem;

  .feature-icon {
    width: 6.25rem;
    height: 6.25rem;
    margin-right: 2.25rem;
    flex-shrink: 0;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: ${p => p.theme.text};
  margin: 1rem 0;
`;
