import axios from "axios"
const baseUrl = "/api/blogs"

const getAll = (blogId) => {
  const request = axios.get(`${baseUrl}/${blogId}/comments`)
  return request.then((response) => response.data)
}

const create = async (commentObject, blogId) => {
  // const config = {
  //   headers: { Authorization: token },
  // }

  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    commentObject
  )
  return response.data
}

export default { getAll, create }
