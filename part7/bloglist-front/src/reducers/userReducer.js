import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const userSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    users: []
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
    },
    setUsers: (state, action) => {
      state.users = action.payload
    }
  }
})

export const { setUser, setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default userSlice.reducer