import { menus } from '@menus/menu.data'
import { getUserPermList } from './index.api'
import { getMenuListByPermission } from '@menus/menu.permission'

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
        flag: '../../../assets/img/usa.svg',
      },
      {
        key: 'zh-CN',
        title: '中文',
        flag: '../../../assets/img/china.svg',
      },
    ],
    menuList: [],
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
    'app/get/permission/success': (state, action) => {
      const { permList } = action.payload || {}
      if (permList) {
        // 根据用户权限生成新的菜单目录
        const menuList = getMenuListByPermission(menus, permList)
        // tips: 若只有菜单权限，没有其他按钮权限，就没必要存sessionStorage
        sessionStorage.setItem('permission', JSON.stringify(permList))
        return {
          ...state,
          menuList
        }
      }
    },
  },
  // saga
  effects: {
    'app/get/permission': function*({ payload }, { call, put }) {
      const resp = yield call(getUserPermList, payload)
      const { success, model } = resp && resp.data || {}
      if (resp && success) {
        yield put({ type: 'app/get/permission/success', payload: { permList: model }})
      }
    },
  },
}

export default model
