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

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'public/index.html'),
  filename: './index.html'
})
const cssPlugin = new MiniCssExtractPlugin({
  filename: '[name]-[chunkhash:8].css',
  chunkFilename: '[name]-[chunkhash:8].css'
})
const cleanPlugin = new CleanWebpackPlugin(['dist'])
const copyPlugin = new CopyWebpackPlugin([
  {
    from: path.join(__dirname, './assets'), to: 'assets/'
  }
])
const progressPlugin = new ProgressBarWebpackPlugin({
  format: 'building [:bar] :percent (:elapsed seconds)',
  clear: false,
  width: 30
})

const publishEnv = process.env.npm_lifecycle_event.replace('build:', '')
const { branch } = GetRepoInfo()
const RELEASE = `${publishEnv}__${branch.replace('/', '_')}__${moment().format('MMDDHHmm')}`

const serverHost = 'http://localhost:8080'
const apiPrex = ''

const definePlugin = new webpack.DefinePlugin({
  HOST: publishEnv === 'dev' ? JSON.stringify(serverHost) : JSON.stringify(apiPrex),
  RELEASE: JSON.stringify(RELEASE)
})

// const uglifyjsPlugin = new UglifyJsPlugin({
//   test: /\.js($|\?)/i,
//   exclude: /node_modules/,
//   parallel: true,
//   sourceMap: true
// })

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production'
  return {
    entry: {
      main: [
        'babel-polyfill',
        path.join(__dirname, './public/index.js')
      ],
      vendor: ['react', 'react-dom']
    },
    output: {
      path: path.join(__dirname, './dist/'),
      filename: '[name]-[chunkhash:8].js',
      chunkFilename: '[name]-[chunkhash:8].js'
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            'presets': ['env', 'react', 'stage-0'],
            'plugins': ['transform-runtime', ['import', { 'libraryName': 'antd', 'style': true }]]
          }
        }
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
              localIdentName: '[local]'
            }
          }, {
            loader: 'less-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[local]-[hash:5]',
              javascriptEnabled: true
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
              'primary-color': '#1DA57A',
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
            name: '[name].[ext]',
            limit: 10240
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
      definePlugin
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
      }
    }
  }
}
