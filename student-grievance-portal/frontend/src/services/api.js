import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000,
})

// Add auth header to every request
api.interceptors.request.use(config => {
  const auth = localStorage.getItem('auth')
  if (auth) {
    config.headers.Authorization = 'Basic ' + auth
  }
  return config
})

export default api
