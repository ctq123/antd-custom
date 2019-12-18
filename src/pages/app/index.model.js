import { menus } from '@menus/menu.data'
import { getUserPermList } from './index.api'
import { getMenuListByPermission } from '@menus/menu.permission'
import { getValidMenuList } from '@menus/menu.route'
import usaImg from '@assets/img/usa.svg'
import chinaImg from '@assets/img/china.svg'

const model = {
  // model名称，view层用于提取state的key，需要保证唯一
  name: 'app',
  // 初始state状态
  state: {
    language: localStorage.getItem('language') || 'zh-CN',
    languages: [
      {
        key: 'en-US',
        title: 'English',
        flag: usaImg,
      },
      {
        key: 'zh-CN',
        title: '中文',
        flag: chinaImg,
      },
    ],
    menuList: [],
    existRoute: {}, // 用户路由列表
    isNeedPermission: false, /** 是否需要菜单-路由权限控制，默认需要true; 若设置为false，所有的permKey可以去掉 */
  },
  // reducer
  reducers: {
    'app/language': (state, action) => {
      const { language } = action.payload || {}
      if (language) {
        localStorage.setItem('language', language)
      }
      return { 
        ...state, 
        language
      }
    },
    'app/get/menus': (state, action) => {      
      sessionStorage.setItem('username', '开发者')
      if (menus) {
        // 过滤无效菜单
        const validMenus = getValidMenuList('path', menus)
        return {
          ...state,
          menuList: validMenus,
        }
      }
      return { ...state }
    },
    'app/get/permission/success': (state, action) => {
      const { permList, username } = action.payload || {}
      
      sessionStorage.setItem('username', username)
      if (permList) {
        // 过滤无效菜单
        const validMenus = getValidMenuList('path', menus)
        // 根据用户权限生成新的菜单目录
        const menuList = getMenuListByPermission(validMenus, permList)
        // tips: 若只有菜单权限，没有其他按钮权限，就没必要存sessionStorage
        sessionStorage.setItem('permission', JSON.stringify(permList))
        return {
          ...state,
          menuList
        }
      }
      return { ...state }
    },
    'app/reset/state': (state, action) => {
      const { payload } = action
      if (payload) {
        return {
          ...state,
          ...payload
        }
      }
      return { ...state }
    }
  },
  // saga
  effects: {
    'app/get/permission': function*({ payload }, { call, put }) {
      const resp = yield call(getUserPermList, payload)
      const { is_success, username, perms } = resp && resp.data || {}
      if (resp && is_success) {
        yield put({ type: 'app/get/permission/success', payload: { permList: perms, username }})
      }
    },
  },
}

export default model
