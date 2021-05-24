import { createSlice } from '@reduxjs/toolkit'

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    search: '',
  },
  reducers: {
    changeSearch: (state,{payload}) => {
        state.search = payload;
    },
    clearSearch: (state) => {
        state.search = '';
    },
  },
})

export const { changeSearch, clearSearch } = commonSlice.actions

export default commonSlice.reducer