/* 引入下面三行 */
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 导入组件
import RdDialog from "./rd-dialog";
import RdForm from "./rd-form";

// 存储组件列表
const components = [RdDialog, RdForm];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return;

  Vue.use(ElementUI);

  // 遍历注册全局组件
  components.forEach((component) => {
    Vue.component(component.componentName || component.name, component);
  });
};

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  ...components,
};
