import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const createBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const likeBlog = async (id, blog) => {
  const url = `${baseUrl}/${id}`
  const request = await axios.put(url, blog)
  return request.data
}

const deleteBlog = async (id) => {
  const url = `${baseUrl}/${id}`
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(url, config)
}

export default { deleteBlog, likeBlog, getAll, setToken, createBlog }