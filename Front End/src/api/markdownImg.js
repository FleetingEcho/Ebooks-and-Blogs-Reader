import axios from './index'

export function uploadImg(data) {
  return axios.request({
    url: '/edu/markdown/img',
    method: 'put',
    data
  })
}
