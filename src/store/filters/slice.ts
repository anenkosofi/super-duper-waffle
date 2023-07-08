import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Status } from '@types';

const INITIAL_PAGE = 1;
const LIMIT = 5;

export interface FiltersState {
  status: Status;
  page: number;
  limit: number;
}

const filtersInitialState = {
  status: Status.SHOW_ALL,
  page: INITIAL_PAGE,
  limit: LIMIT,
} as FiltersState;

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setStatus(state, { payload }: PayloadAction<Status>) {
      return { ...state, page: INITIAL_PAGE, status: payload };
    },
    setPage(state, { payload }: PayloadAction<number>) {
      return { ...state, page: payload };
    },
    setNextPage(state) {
      return { ...state, page: state.page + 1 };
    },
  },
});

export const { setStatus, setPage, setNextPage } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
