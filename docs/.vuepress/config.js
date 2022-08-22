const nav = require('./config/nav');
const sidebar = require('./config/sidebar');
const markdown = require('./config/markdown');

module.exports = {
  theme: '',
  title: '汇阳文档平台',
  description: '汇阳UI库、项目组件、工具函数文档教程及示例代码',
  base: '/',
  port: '8089',
  themeConfig: {
    sidebarDepth: 0,
    nav,
    sidebar
  },
  head: [],
  plugins: [
    '@vuepress/nprogress',
    '@vuepress/back-to-top',
    'vuepress-plugin-demo-container'
  ],
  chainWebpack(config) {
    config.resolve.alias
      .set('@packages', './../../packages')
  },
  markdown: markdown
};
