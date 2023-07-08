import React, { FC, forwardRef, ForwardedRef, RefAttributes } from 'react';

import { useAppDispatch } from '@hooks';
import { Status } from '@types';
import { setStatus } from '@store/filters/slice';

import './Dropdown.scss';

type DropdownProps = {
  closeDropdown: () => void;
} & RefAttributes<HTMLDivElement>;

const Dropdown: FC<DropdownProps> = forwardRef(function Dropdown(
  { closeDropdown },
  ref: ForwardedRef<HTMLDivElement>
) {
  const dispatch = useAppDispatch();

  const options = Object.values(Status);

  const setOptionHandler = (option: Status) => {
    dispatch(setStatus(option));
    closeDropdown();
  };

  return (
    <div className="dropdown" ref={ref}>
      <ul className="dropdown__list">
        {options.map(option => (
          <li key={option} className="dropdown__item" onClick={() => setOptionHandler(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Dropdown;
