import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../actions/users";

const initialState = {
  email: null,
  token: null,
  id: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    })
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(getUser.rejected, (state,  action) => {
      state.isLoading = false;
      state.error = action.payload
    })
  },
})

export const { setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
