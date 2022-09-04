import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/style.scss'

let ReportDesign = null;
export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
  isServer,
}) => {
  Vue.use(Element);
  Vue.mixin({
    mounted() {
      if (!ReportDesign) {
        // 开发时使用开发中的组件
        ReportDesign = require('@packages/index').default;

        // 使用打包后的组件
        // ElComponent = require('@lib/jUI.umd.min').default;
        // import('@lib/jUI.css');
      }
      
      ReportDesign.init({
        interceptRequest: (data) => {
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
          let { total, list } = res.data || {};
          let data = {
            tableData: list,
            total: total
          };
          return data;
        }
      });
      Vue.use(ReportDesign);
    },
  });
};
