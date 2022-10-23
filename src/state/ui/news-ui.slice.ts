import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const newsUISlice = createSlice({
  name: 'newsUI',
  initialState: {
    savedNewsListScrollY: 0,
  },
  reducers: {
    setSavedNewsListScrollY: (state, action: PayloadAction<number>) => {
      state.savedNewsListScrollY = action.payload;
    },
  },
});

export const newsUIActions = newsUISlice.actions;

export default newsUISlice.reducer;
