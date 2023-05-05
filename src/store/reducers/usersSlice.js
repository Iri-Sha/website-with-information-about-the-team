import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../../actions/users";
import { toggleStatus } from "../../actions/users";

const initialState = {
  users: [],
  error: '',
  isLoading: false,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.users = action.payload;
    })
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(getUsers.rejected, (state,  action) => {
      state.isLoading = false;
      state.error = action.payload
    })
    builder.addCase(toggleStatus.rejected, (state,  action) => {
      state.isLoading = false;
      state.error = action.payload
    })
  },
})

export default usersSlice.reducer;
