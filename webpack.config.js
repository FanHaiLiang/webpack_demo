const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
const entry = require('./webpack_config/entry_webpack.js');
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./src/env_config');

if(process.env.type == "dev"){
  console.log(process.env.type);
  var website = {
    host:config.host,
    port:config.port,
    publicPath:"http://Localhost:2017/"
  }
}else{
  console.log(process.env.type);
  var website = {
    host:config.host,
    port:config.port,
    publicPath:"http://Localhost:2017/"
  }
}

module.exports = {
  devtool:"eval-source-map",
  entry:{
    entry:'./src/entry.js',
    vue:'vue',
    lodash:'lodash',
    react:'react',
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].js',
    publicPath:website.publicPath
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:extractTextPlugin.extract({
          fallback:'style-loader',
          use:[{
            loader:'css-loader',
            options:{importLoaders:1}},
            "postcss-loader"
          ]
        })
      },{
        test:/\.(png|jpg|gif)/,
        use:[{
          loader:'url-loader',
          options:{
            limit:5000,
            outputPath:'images/',
          }
        }]
      },{
        test:/\.(htm|html)$/i,
        use:['html-withimg-loader']
      },{
        test:/\.less$/,
        use:extractTextPlugin.extract({
          use:[{
            loader:"css-loader"
          },{
            loader:"less-loader"
          }],
          fallback:"style-loader"
        })
      },{
        test:/\.(jsx|js)$/,
        use:{
          loader:"babel-loader",
        },
        exclude:/node_modules/
      }
    ]
  },
  plugins:[
    new htmlPlugin({
      //对文件进行压缩
      minify:{
        removeAttributeQuotes:true
      },
      //为了开发中js有缓存效果，所以加入hash,这样可以有效避免缓存JS.
      hash:true,
      //是要大包的html模板路径和文件名称
      template:'./src/index.html'
    }),
    new extractTextPlugin("/css/index.css"),
    //删除多余的css的样式
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname,'src/*.html')),
    }),
    //全局引入 这样使用不用import引用 适用于第三方插件
    new webpack.ProvidePlugin({
      _:"lodash"
    }),
    //用于在JS中加上我们的版权和开发者声明
    new webpack.BannerPlugin('范海亮的代码'),
    //抽离大的库
    new webpack.optimize.CommonsChunkPlugin({
      //name对应入口文件中的名字，我们起的时jQuery
      name:['vue','react','lodash'],
      //把文件打包到哪里，是一个路径
      filename:'assets/js/[name].js',
      //最小打包的文件模块数，这里直接写2就好
      minChunks:2
    }),
    new copyWebpackPlugin([{
      from:__dirname+'/src/public',
      to:'./public'
    }]),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
    //设置基本目录结构
    contentBase: path.resolve(__dirname,'dist'),
    //服务器的IP地址，可以使用IP也可以使用Localhost
    host:website.host,
    //服务器端压缩是否开启
    compress:true,
    //配置服务器端口号
    port:website.port
  },
  // watchOptions:{
  //   //检测修改的时间 以毫秒为单位
  //   poll:1000,
  //   //放置重复保存而发生编译错误，这里设置的500时秒内重复保存，不进行大包操作
  //   aggregeateTimeout:500,
  //   //不监听的目录
  //   ignored:/node_modules/,
  // },
}
