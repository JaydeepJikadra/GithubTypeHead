import * as React from 'react';
import { NavBar } from 'app/components/NavBar';
import { GithubTypeHead } from './GithubTypeHead';
import { PageWrapper } from 'app/components/PageWrapper';

export function HomePage() {
  return (
    <>
      <NavBar />
      <PageWrapper>
        <GithubTypeHead />
      </PageWrapper>
    </>
  );
}
