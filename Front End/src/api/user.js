import axios from './index'
export const getUserInfo = () => {
  return axios.request({
    // url: '/index/getDataAction',
    url: '/getUserInfo',
    method: 'post',
  })
}

export const login = ({ userName, password }) => {
  return axios.request({
    url: '/index/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export const authorization = () => {
  return axios.request({
    url: '/users/authorization',
    method: 'get'
  })
}
