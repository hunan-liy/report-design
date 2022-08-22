import RdReport from './src/index';

/* istanbul ignore next */
RdReport.install = function(Vue) {
  Vue.component(RdReport.name, RdReport);
};

export default RdReport;
