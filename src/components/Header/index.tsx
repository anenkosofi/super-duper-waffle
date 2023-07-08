import React, { FC, useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { BiFilterAlt } from 'react-icons/bi';

import Container from '@components/Container';
import Dropdown from '@components/Dropdown';
import { Pathname } from '@types';

import './Header.scss';

const Header: FC = () => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isDropdownOpened, setisDropdownOpened] = useState(false);

  const openDropdownHandler = () => setisDropdownOpened(true);

  const closeDropdownHandler = () => setisDropdownOpened(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      closeDropdownHandler();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <Container>
        <div className="header__container">
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
          <div className="header__dropdown">
            <button type="button" className="header__filter" onClick={openDropdownHandler}>
              <BiFilterAlt size={24} />
            </button>
            {isDropdownOpened && (
              <Dropdown closeDropdown={closeDropdownHandler} ref={dropdownRef} />
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
