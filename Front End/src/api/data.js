import axios from './index'

export const getMdVal = (userKey) => {
  return axios.request({
    url: '/data/getThisMd',
    method: 'post',
    data: {
      userKey
    },
  })
}

export const getTableData = () => {
  return axios.request({
    url: '/getTableData',
    method: 'get'
  })
}


export const fetchBlogs = (clickPage,searchVal) => {
  return axios.request({
    url: '/data/fetchBlogs',
    method: 'post',
    data: {
      clickPage,
      searchVal
    },
  })
}

export const fetchEbooks = (clickPage,searchVal) => {
  return axios.request({
    url: '/data/fetchEbooks',
    method: 'post',
    data: {
      clickPage,
      searchVal
    },
  })
}

export const fetchMyBook = (userKey) => {
  return axios.request({
    url: '/data/fetchMyBook',
    method: 'post',
    data: {
      userKey
    },
  })
}


// =========================

export const getFolderList = () => {
  return axios.request({
    url: '/getFolderList',
    method: 'get'
  })
}

export const getFileList = (clickPage,searchVal) => {
  return axios.request({
    url: '/data/getFileList',
    method: 'post',
    data: {
      clickPage,
      searchVal
    },
  })
}


export const getFile = ({ key, type }) => {
  return axios.request({
    url: 'get_file',
    data: {
      key,
      type
    },
    method: 'post'
  })
}

export const deleteFile = key => {
  return axios.request({
    url: 'delete_file',
    data: {
      key
    },
    method: 'delete'
  })
}

export const sentFormData = ({ url, data }) => {
  return axios.request({
    // url,
    url:"/data/formData",
    data:{
      data:data
    },
    method: 'post'
  })
}
export const editBlogs = ({ url, data }) => {
  return axios.request({
    // url,
    url:"/data/editBlogs",
    data:{
      data:data
    },
    method: 'post'
  })
}
export const delBlogs = (id ) => {
  return axios.request({
    // url,
    url:"/data/delBlogs",
    data:{
      userKey:id
    },
    method: 'post'
  })
}
