# 快速开始

引导您如何在项目中使用 ReportDesign

### Vue 版本

当前支持的 Vue2 版本

### npm 安装

```shell
npm i report-design -S
```

### 引入 ReportDesign

在 main.js 中写入以下内容：

```js
import Vue from 'vue';
import ReportDesign from 'report-design';
import 'report-design/lib/ReportDesign.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```


### 初始化接口模块
请务必认真理解以下说明以及设置（结合report组件使用文档），不然report组件可能无法正常使用！

因为report展示数据需要从接口请求，所以要将请求模块统一起来，与后端接口协商约束好所有report页面的数据请求接口

必须统一入参形式，通过interceptRequest去处理，主要是三个部分：
- 第一部分是查询条件，这个可以根据实际业务去定义
- 第二部分是分页参数，这个必须统一
- 第三部分是排序参数，这个也必须统一

接口返回数据也需要统一处理，通过interceptResponse处理，并在处理完成之后按interceptResponse要求的格式return数据

至于report内部使用的接口请求方式，report提供了三种方式:
- 第一种是外部直接请求好数据，通过tableData设置report的值
- 第二种是通过内置的ajax进行数据请求，url(完整路径，必填)、method、header三个配置就是给这种方式使用的
- 第三种是通过传一个封装好的请求，这个请求需要返回一个Promise

使用第一种不会涉及到interceptRequest和interceptResponse这两个配置功能；
提供第二种的主要原因是给没有引入类似于axios等http库的项目使用的；
推荐使用第三种方式，在自己的项目中处理好请求拦截（接口报错的统一提示之类的），使用report去加载数据时也会走这个拦截


```js
import ReportDesign from 'report-design';

ReportDesign.init({
  // 请求入参的统一处理方式
  interceptRequest: (data) => {
    // 这里只是作者示例接口的处理方式，实际开发中根据自己与后端定义的数据格式去处理
    let { filters, page, orderParams } = data;
    let { currentPage, pageSize, isPaging } = page;
    let { order, prop } = orderParams;
    let params = {  
      ...filters,
      page: {
        pageNum: currentPage,
        pageSize: pageSize,
        sort: order,
        orderBy: prop,
        isPaging: isPaging
      }
    };
    return params;
  },
  // 接口出参统一处理方式
  interceptResponse: (res) => {
    let { total, list } = res.data || {};
    let data = {
      tableData: list,
      total: total
    };
    return data;
  }
});
```
