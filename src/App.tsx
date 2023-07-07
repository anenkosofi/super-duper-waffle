import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '@components/Layout';
import { Pathname } from '@types';
const HomePage = lazy(() => import('@pages/Home'));
const TweetsPage = lazy(() => import('@pages/Tweets'));

const App = () => {
  return (
    <Routes>
      <Route path={Pathname.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={Pathname.TWEETS} element={<TweetsPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
