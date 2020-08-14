// export const baseURL='https://www.fastmock.site/mock/94ef39e97b8b1d8c1f7f222de620d3fa/jake'
// export const baseURL=''
/*
The default request address requested by axios, distinguishing between production environment and development environment
The default address of axios here will be spliced ​​after the base address of the proxy configuration item
So, set the default request address of axios based on the actual situation

 */

export const baseURL = process.env.NODE_ENV === 'production'
  ? ''
  : ''
