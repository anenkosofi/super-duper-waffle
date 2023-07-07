import React, { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@components/Header';
import Loader from '@components/Loader';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
