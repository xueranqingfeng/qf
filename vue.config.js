const path = require('path')
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    outputDir: 'html',
    indexPath: 'index.html',
    lintOnSave: false, // 是否开启eslint
    devServer: {
        host: 'localhost', // 也可以直接写IP地址这样方便真机测试
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: false // 配置自动启动浏览器
    },
    configureWebpack: (config) => {
        config.resolve.alias["@"] = path.resolve('src');
        config.resolve.alias["@a"] = path.resolve('./src/assets');
    },
}
