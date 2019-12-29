const path = require('path')

const resolve = dir => path.join(__dirname, dir)

const BASE_URL = process.env.NODE_ENV !== 'development' ? '/iview-admin' : '/'
module.exports = {
  lintOnSave: false,
	publicPath: BASE_URL,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components')),
		config.module
			.rule('vue')
			.use('iview')
			.loader('iview-loader')
			.options({prefix: false})
  },
  // 打包时不生成.map文件
	productionSourceMap: false,
  devServer: {
		port: 8081,
		open: true, //自动打开浏览器
		disableHostCheck: true,
		hotOnly: false,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
    proxy: {
			'/api':{
				target: 'http://localhost:8090',
				changeOrigin:true,
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
  }

}
