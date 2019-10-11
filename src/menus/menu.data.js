// 菜单列表
export const menus = [
  { key: '1', name: '首页', path: '/app', icon: 'home', children: [] },
  { key: '2', name: '系统配置', path: '/app/system', icon: 'laptop', children: []},
  { key: '3', name: '用户管理', path: '/app/users', icon: 'user', children: [
    { key: '31', name: '用户管理', path: '/app/users/userManage', children: [] },
    { key: '32', name: '角色管理', path: '/app/users/roleManage', children: [] },
  ]},
]
