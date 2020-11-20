import axios from 'axios'
const baseUrl = '/api/login'
const userUrl = '/api/users'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  console.log(response)
  return response.data
}

const register = async (credentials) => {
  try {
    const res = await axios.post(userUrl, credentials)
    console.log(res.data)
    return res.data
  } catch (exception) {
    console.log(exception.response)
    return exception.response
  }
}

export default { login, register }