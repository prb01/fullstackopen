import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog: (state, action) => {
      const returnedBlog = action.payload
      state.push({ ...returnedBlog })
    },
    setBlogs: (state, action) => {
      return action.payload
    },
    editBlog: (state, action) => {
      const returnedBlog = action.payload
      const idx = state.findIndex((blog) => blog.id === returnedBlog.id)
      state[idx] = { ...returnedBlog }
    },
    deleteBlog: (state, action) => {
      const id = action.payload
      const idx = state.findIndex((blog) => blog.id === id)
      state.splice(idx, 1)
    },
    createComment: (state, action) => {
      const [comment, blogId] = action.payload
      const idx = state.findIndex((blog) => blog.id === blogId)
      state[idx].comments.push(comment)
    },
  },
})

export const {
  createBlog,
  setBlogs,
  editBlog,
  deleteBlog,
  createComment,
} = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogsSlice.reducer
