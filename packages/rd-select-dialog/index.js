import RdSelectDialog from './src/index';

/* istanbul ignore next */
RdSelectDialog.install = function(Vue) {
  Vue.component(RdSelectDialog.name, RdSelectDialog);
};

export default RdSelectDialog;
