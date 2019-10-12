/**
 * 菜单列表
 * key, path需要保持唯一
 * permKey表示权限Key值
 */
export const menus = [
  { key: '1', name: '首页', path: '/app', icon: 'home', permKey: 'menu.home', children: [] },
  { key: '2', name: '系统配置', path: '/app/system', icon: 'laptop', permKey: 'menu.system', children: [] },
  { key: '3', name: '用户管理', path: '/app/users', icon: 'user', permKey: 'menu.users', children: [
    { key: '31', name: '用户管理', path: '/app/users/userManage', permKey: 'menu.userManage', children: [] },
    { key: '32', name: '角色管理', path: '/app/users/roleManage', permKey: 'menu.roleManage', children: [] },
  ]},
]
