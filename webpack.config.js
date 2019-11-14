const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const GetRepoInfo = require('git-repo-info')
const moment = require('moment')
const HappyPack = require('happypack')
const os = require('os')
const mock = require('cf-mock-server/express-mw')
const envConfig = require('./my.env.config')

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'XXXX系统',
  template: path.join(__dirname, 'public/index.html'),
  filename: './index.html'
})
const cssPlugin = new MiniCssExtractPlugin({
  filename: 'css/[name]-[chunkhash:8].css',
  chunkFilename: 'css/[name]-[chunkhash:8].css'
})
const cleanPlugin = new CleanWebpackPlugin(['dist'])
const copyPlugin = new CopyWebpackPlugin([
  {
    from: path.join(__dirname, './assets/'), to: './'
  },
  {
    from: path.join(__dirname, './public/favicon.ico'), to: './'
  }
])
const progressPlugin = new ProgressBarWebpackPlugin({
  format: 'building [:bar] :percent (:elapsed seconds)',
  clear: false,
  width: 30
})

const publishEnv = process.env.npm_lifecycle_event.replace('build:', '')
// const { branch } = GetRepoInfo()
const envObj = publishEnv ? envConfig[publishEnv] : {}
// const RELEASE = `${envObj.ENV}__${branch.replace('/', '_')}__${moment().format('MMDDHHmm')}`

// const serverHost = 'http://localhost:8080'
// const apiPrex = ''

// 注意local才是本地开发环境，dev是develop分支环境
const definePlugin = new webpack.DefinePlugin({
  NODE_ENV: JSON.stringify(envObj.ENV),
  CDN_URL: JSON.stringify(envObj.CDN_URL),
  AUTH_SERVICE: JSON.stringify(envObj.AUTH_SERVICE),
  PRODUCT_SERVICE: JSON.stringify(envObj.PRODUCT_SERVICE),
  RELEASE: JSON.stringify('')
})

const providePlugin = new webpack.ProvidePlugin({
  axios: 'axios',
  moment: 'moment',
})

// const uglifyjsPlugin = new UglifyJsPlugin({
//   test: /\.js($|\?)/i,
//   exclude: /node_modules/,
//   parallel: true,
//   sourceMap: true
// })
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const happyPack = new HappyPack({
  id: 'babel',
  loaders: [{
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        ['@babel/plugin-proposal-decorators', { "legacy": true }],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-transform-runtime',
      ],
    }
  }],
  //共享进程池
  threadPool: happyThreadPool,
  //允许 HappyPack 输出日志
  verbose: true,
})

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production'
  return {
    entry: {
      main: [
        '@babel/polyfill',
        path.join(__dirname, './public/index.js')
      ],
      vendor: ['react', 'react-dom']
    },
    output: {
      path: path.join(__dirname, './dist/'),
      publicPath: envObj.CDN_URL,
      filename: 'js/[name]-[chunkhash:8].js',
      chunkFilename: 'js/[name]-[chunkhash:8].js'
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['happypack/loader?id=babel'],
      }, {
        test: /\.(css|less)$/,
        include: /src|public/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:8]',
            }
          }, {
            loader: 'less-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:8]',
              javascriptEnabled: true,
            }
          }, {
            loader: 'postcss-loader'
          }
        ]
      }, {
        test: /\.(less|css)$/,
        include: /node_modules/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader',
          options: {
            modifyVars: {
              'primary-color': '#F5222D',
              'border-radius-base': '2px'
            },
            javascriptEnabled: true
          }
        }]
      }, {
        test: /\.(png|jpeg|jpg|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'img/[name].[ext]',
            limit: 10240,
          }
        }]
      }]
    },
    devtool: publishEnv !== 'prod' ? 'source-map' : '',
    plugins: [
      htmlPlugin,
      cssPlugin,
      cleanPlugin,
      copyPlugin,
      progressPlugin,
      definePlugin,
      happyPack,
      providePlugin,
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000, // 大于30K才会抽离到公共模块
        minChunks: Infinity,
        name: 'vendor'
      }
    },
    resolve: {
      alias: {
        '@assets': path.join(__dirname, 'assets'),
        '@src': path.join(__dirname, 'src'),
        '@components': path.join(__dirname, 'src/components'),
        '@utils': path.join(__dirname, 'src/utils'),
        '@menus': path.join(__dirname, 'src/menus'),
        '@locales': path.join(__dirname, 'src/locales'),
      },
      extensions: ['.js', '.jsx', '.html', '.css', '.less']
    },
    performance: {
      hints: false
    },
    stats: {
      entrypoints: false,
      children: false,
      modules: false,
      errors: true,
      errorDetails: true,
      warnings: true
    },
    devServer: {
      open: true,
      stats: {
        assets: false,
        entrypoints: false,
        children: false,
        modules: false,
        errors: true,
        errorDetails: true,
        warnings: true
      },
      // https://webpack.js.org/configuration/dev-server/#devserverbefore
      after: (app, server) => {
        app.use(mock({
          config: path.join(__dirname, './mock-server/config.js')
        }))
      },
    }
  }
}
