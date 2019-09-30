
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
  },
  // saga
  effects: {},
}

export default model
