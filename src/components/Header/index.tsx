import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import Container from '@components/Container';
import { Pathname } from '@types';

import './Header.scss';

const Header: FC = () => {
  return (
    <header className="header">
      <Container>
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__item">
              <NavLink className="header__link" to={Pathname.HOME}>
                Home
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink className="header__link" to={Pathname.TWEETS}>
                Tweets
              </NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
