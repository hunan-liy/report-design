import RdDialog from './src/index';

/* istanbul ignore next */
RdDialog.install = function(Vue) {
  Vue.component(RdDialog.name, RdDialog);
};

export default RdDialog;
