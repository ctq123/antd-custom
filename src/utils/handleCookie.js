/**
 * 获取当前文档的指定cookie的值
 * @param  {string} cname - cookie的名称
 * @return {string} - cookie的值
 */
export function getCookie(cname) {
  var name = cname + '=',
    decodedCookie = decodeURIComponent(document.cookie),
    ca = decodedCookie.split(';')

  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

// 设置、编辑cookie
export function setCookie(cname, cvalue, exdays, domain) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + (domain ? ";domain=" + domain : "");
}

// 删除cookie
export function clearCookie(cname) {
  setCookie(cname, "", -1)
}

// 设置localhost环境的cookie
export function devSetCookieToken() {
  console.log("NODE_ENV", NODE_ENV)
  // 注意local才是本地开发环境，dev是develop分支环境
  if (NODE_ENV === 'local') {// 本地开发环境
    setCookie('token', '123456', 1)
  }
}
