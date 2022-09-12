const getPath = function (path) {
  return `/comps/${path}`;
}

module.exports = [
  // {
  //   title: '更新日志',
  //   path: getPath('log/CHANGELOG.md'),
  //   collapsable: false,
  // },
  {
    title: '开发指南',
    collapsable: false,
    children: [
      { title: '介绍', path: '/', collapsable: false },
      { title: '快速开始', path: getPath(''), collapsable: false },
      // { title: '国际化', path: getPath('i18n'), collapsable: false },
      // { title: '自定义主题', path: getPath('custom-theme'), collapsable: false },
      // { title: '内置过渡动画', path: getPath('transition'), collapsable: false },
    ]
  },
  {
    title: '组件',
    collapsable: false,
    children: [
      { title: 'Dialog 对话框', path: getPath('dialog'), collapsable: false },
      { title: 'Form 表单', path: getPath('form'), collapsable: false },
      { title: 'Table 表格', path: getPath('table'), collapsable: false },
      { title: 'Report 报表', path: getPath('report'), collapsable: false },
      { title: 'DialogSelect 弹窗选择器', path: getPath('dialog-select'), collapsable: false },
    ],
  },
];
