import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./reducers/usersSlice";
import userSlice from "./reducers/userSlice";

export default configureStore({
  reducer: {
    users: usersSlice,
    user: userSlice,
  },
});
