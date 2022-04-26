import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog: (state, action) => {
      state.push(action.payload)
    },
    setBlogs: (state, action) => {
      return action.payload
    },
    editBlog: (state, action) => {
      const { id, returnedBlog } = action.payload
      const idx = state.findIndex(blog => blog.id === id)
      const { user, ...returnedObject } = returnedBlog
      console.log(user)
      state[idx] = { ...state[idx], ...returnedObject }
    },
    deleteBlog: (state, action) => {
      const id = action.payload
      const idx = state.findIndex((blog) => blog.id === id)
      state.splice(idx, 1)
    }
  }
})

export const { createBlog, setBlogs, editBlog, deleteBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogsSlice.reducer