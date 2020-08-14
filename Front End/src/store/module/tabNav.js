import { routeHasExist, getRouteById, routeEqual, localSave, localRead } from '@/lib/util'

const state = {
  // tabList: JSON.parse(localRead('tabList') || [])
  tabList: []
}

const getTabListToLocal = tabList => {
  return tabList.map(item => {
    return {
      name: item.name,
      path: item.path,
      meta: item.meta,
      params: item.params,
      query: item.query
    }
  })
}

const mutations = {
  // router object
  UPDATE_ROUTER (state, route) {
    if (!routeHasExist(state.tabList, route) && route.name !== 'login') state.tabList.push(route)
    // localSave('tabList', JSON.stringify(getTabListToLocal(state.tabList)))
  },
  REMOVE_TAB (state, index) {
    state.tabList.splice(index, 1)
    // localSave('tabList', JSON.stringify(getTabListToLocal(state.tabList)))
  }
}

const actions = {
  handleRemove ({ commit }, { id, $route }) {
    return new Promise((resolve) => {
      let route = getRouteById(id)
      let index = state.tabList.findIndex(item => {
        return routeEqual(route, item)
      })
      let len = state.tabList.length
      let nextRoute = {}
      if (routeEqual($route, state.tabList[index])) {
        // If there are still labels on the right
        if (index < len - 1) nextRoute = state.tabList[index + 1]
        else nextRoute = state.tabList[index - 1]
        // console.log('nextRoot是'+nextRoute);
      }
      const { name, params, query } = nextRoute || { name: 'Home' }
      commit('REMOVE_TAB', index)
      resolve({
        name, params, query
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
