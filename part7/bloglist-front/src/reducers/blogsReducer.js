import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog: (state, action) => {
      const  [returnedBlog, user]  = action.payload
      const { token, ...userParams } = user
      console.log(token)
      state.push({ ...returnedBlog, user: { ...userParams } })
    },
    setBlogs: (state, action) => {
      return action.payload
    },
    editBlog: (state, action) => {
      const [returnedBlog, user] = action.payload
      const { token, ...userParams } = user
      console.log(token)
      const idx = state.findIndex((blog) => blog.id === returnedBlog.id)
      state[idx] = { ...returnedBlog, user: { ...userParams } }
    },
    deleteBlog: (state, action) => {
      const id = action.payload
      const idx = state.findIndex((blog) => blog.id === id)
      state.splice(idx, 1)
    },
  },
})

export const { createBlog, setBlogs, editBlog, deleteBlog } =
  blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogsSlice.reducer
