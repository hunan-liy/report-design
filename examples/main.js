import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import ReportDesign from "../packages/index";
Vue.use(ReportDesign);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
