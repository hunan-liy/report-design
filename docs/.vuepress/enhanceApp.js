import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

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

      // ReportDesign.init({
      //   upload: 'https://obs-dev-test-public.obs.cn-east-2.myhuaweicloud.com',
      //   upLoadKey: 'http://10.88.130.98/server/third/obs/getSign/obs-dev-test-public',
      //   directory: 'images/custom_refashion/',
      //   uploadSelf: 'http://10.88.130.98/server/third/fastDFS/doUpload',
      //   serverSelf: 'http://10.88.130.64/',
      // });
      Vue.use(ReportDesign);
    },
  });
};
