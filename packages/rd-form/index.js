import RdForm from './src/index';

/* istanbul ignore next */
RdForm.install = function(Vue) {
  Vue.component(RdForm.name, RdForm);
};

export default RdForm;
