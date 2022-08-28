const nav = require('./config/nav');
const sidebar = require('./config/sidebar');
const markdown = require('./config/markdown');

module.exports = {
  theme: '',
  title: 'report-design',
  description:
    '报表设计器，通过数据驱动生成页面，300行代码生成一个功能完整的报表页',
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
    config.resolve.alias.set('@packages', './../../packages');
  },
  markdown: markdown
};
