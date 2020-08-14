import axios from 'axios'
import { baseURL } from '@/config'
import { getToken } from '@/lib/util'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      // 另外还有：
      headers: {
        // "Content-Type": "application/json;charset=utf-8"
      },
      withCredentials: true,

      /*
     timeout: 5000， // request timeout
      responseType: "json",
  */
    }
    return config
  }

  // Destroy the request instance
  destroy (url) {
    delete this.queue[url]

    if (!Object.keys(this.queue).length) {
      // hide loading status
    }
  }

  interceptors (instance, url) {
// Request interceptor---cannot perform any operations during loading
// intercept request
    instance.interceptors.request.use(
      config => {
// Add global loading...
// what to do before sending the request
// config is the parameter requested by axios
// Add the authorization field to the token returned after login
        const token=getToken()
        // config.headers.Authorization = getToken()
        if (token) {  // check token every time
          // If token exists, the token is added to the header of the http request uniformly, so there is no need to manually add it for each request
        config.headers.Authorization = token
                  }
        if (!Object.keys(this.queue).length) {
          // Object.keys    Get the attribute name in the queue If there is no request in the queue, add loading...
          // Spin.show()
        }
        this.queue[url] = true
        // config.method is the request method
        return config // return
      },
      error => {
        // return error
        return Promise.reject(error)
      }
    )
    instance.interceptors.response.use(
      res => {

        this.destroy(url)
        const { data } = res
        return data
      },
      error => {
        this.destroy(url)
        return Promise.reject(error.response.data)
      }
    )
  }

  request (options) {
    const instance = axios.create()
// Combine the attributes of the latter two methods into one, if they are the same, the previous value will be overwritten with the value of the latter attribute name
// Object.assign returns an object after merging the attributes of the parameter object-adding post data, etc., and other additional settings, etc.,
// such as adding request first class
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url) // Incoming instance, using interceptor
    return instance(options) // use this instance
  }
}
export default HttpRequest

/*
When importing: ---Instantiate
import HttpRequest from '@/lib/axios'
const axios = new HttpRequest()
export default axios

*/
