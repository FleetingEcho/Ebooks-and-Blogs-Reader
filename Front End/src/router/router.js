import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/layout.vue'
import Ebook1 from '../components/Ebook1.vue'

Vue.use(VueRouter)

export const routerMap = [
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/ebookUpload1.vue'),
    icon:'ios-timer',
    meta: {
      title: 'Time Diagram'
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:'index',
    icon:'ios-home',
    meta: {
      title: 'Blogs & Ebook'
    },
    children:[

      {
        path: 'upload',
        name: 'upload',
        component: () => import('../views/upload.vue'),
        meta: {
          title: 'Management'
        },
        icon:'ios-folder-open-outline',
      },
      {
        path: '/blogs',
        name: 'blogs',
        component: () => import('../views/blogs.vue'),
        meta: {
          title: 'Blogs List'
        },
        icon:'ios-paper-outline',
      },
      {
        path: '/showMd',
        name: 'showMd',
        component: () => import('../views/showMarkdown.vue'),
        meta: {
          title: 'My Blogs',
          isShow:false,
        },
        icon:'ios-document',
      },
      {
        path: 'write',
        name: 'write',
        component: () => import('../views/feel.vue'),
        meta: {
          title: 'Write Blog',
          keepAlive: true, //This field indicates that the page needs to be cached

        },
        icon:'ios-create',
      },
      {
        path: 'editBlog',
        name: 'editBlog',
        component: () => import('../views/editBlog.vue'),
        meta: {
          title: 'Edit Blog',
          // keepAlive: true, //This field indicates that the page needs to be cached
          isShow:false,
        },
        icon:'ios-create',
      },
      {
        path: 'myBooks',
        name: 'myBooks',
        component: () => import('../views/myBooks.vue'),
        meta: {
          title: 'Ebooks List'
        },
        icon:'ios-list-box',
      },

    ]
  },

  {
    path: '/ebook',
    name: 'Ebook',
    component: Ebook1,
    // icon:'ios-book',
    meta: {
      title: 'Read',
      isShow:false,
    },
  },

  {
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]

export const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login'
    },
    component: () => import('@/views/Login1.vue')
  },
  {
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]
