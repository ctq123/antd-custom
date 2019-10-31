/**
 * 菜单列表
 * path需要保持唯一
 * permKey表示权限Key值
 * permKey: true表示所有用户都有权限
 * transKey表示翻译文本对应的key
 */
export const menus = [
  {
    name: '首页', 
    transKey: 'Home', 
    path: '/app', 
    icon: 'home', 
    permKey: true, 
    children: []
  },
  { 
    name: '系统配置', 
    transKey: 'System Configuration', 
    path: '/app/system', 
    icon: 'laptop', 
    permKey: 'menu.system', 
    children: [] 
  },
  {
    name: '用户管理', 
    transKey: 'User Management', 
    path: '/app/users', 
    icon: 'user', 
    permKey: 'menu.users', 
    children: [
      { 
        name: '用户管理', 
        transKey: 'User Management', 
        path: '/app/users/userManage', 
        permKey: 'menu.userManage', 
        children: [] 
      },
      { 
        name: '角色管理', 
        transKey: 'Role Management', 
        path: '/app/users/roleManage', 
        permKey: 'menu.roleManage', 
        children: [] 
      },
    ]
  },
  { 
    name: 'Example页', 
    transKey: 'Example Page', 
    path: '/app/example', 
    icon: 'laptop', 
    permKey: 'srm.route_example', 
    children: [] 
  },
  {
    name: '运营工具', 
    transKey: 'Operational Tool', 
    path: '/app/optool', 
    icon: 'tool', 
    permKey: 'srm.route_optool', 
    children: [
      { 
        name: '异常处理', 
        transKey: 'Exception Handling', 
        path: '/app/optool/exceptionHandle', 
        permKey: 'srm.route_exception-handle', 
        children: [] 
      },
    ]
  },
]
