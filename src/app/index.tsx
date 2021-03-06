import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from '../styles/global-styles';
import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
