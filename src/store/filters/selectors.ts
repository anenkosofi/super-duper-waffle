import { RootState } from '@store';

export const selectStatus = (state: RootState) => state.filters.status;

export const selectPage = (state: RootState) => state.filters.page;

export const selectLimit = (state: RootState) => state.filters.limit;
