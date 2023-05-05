import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async function(page, {rejectWithValue}) {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);

      if (!response.ok) {
        throw new Error('Server Error');
      }
      const res = await response.json();

      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const toggleStatus = createAsyncThunk(
  'users/toggleStatus',
  async function (id, {rejectWithValue, dispatch, getState}) {
      const user = getState().users.users.find(user => user.id === id);
      toggleComplete = (state, action) => {
        const toggledLike = state.users.find(user => user.id === action.payload.id);
        toggledLike.completed = !toggledLike.completed;
      }

      try {
          const response = await fetch(`https://reqres.in/api/users/${id}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  completed: !user.completed,
              })
          });

          if (!response.ok) {
              throw new Error('Can\'t toggle status. Server error.');
          }

          dispatch(toggleComplete({id}));

      } catch (error) {
          return rejectWithValue(error.message)
      }
  }
);

export const getUser = createAsyncThunk(
  'users/getUser',
  async function(id, {rejectWithValue}) {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`);

      if (!response.ok) {
        throw new Error('Server Error');
      }
      const res = await response.json();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)
