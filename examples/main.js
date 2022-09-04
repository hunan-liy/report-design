import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

import ReportDesign from '../packages/index';
Vue.use(ReportDesign);

ReportDesign.init({
  interceptRequest: (data) => {
    console.log('interceptRequest', data);

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
  interceptResponse: (res) => {
    console.log('interceptResponse');
    let { total, list } = res.data || {};
    let data = {
      tableData: list,
      total: total
    };
    return data;
  }
});

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
