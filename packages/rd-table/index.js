import RdTable from './src/index';

/* istanbul ignore next */
RdTable.install = function(Vue) {
  Vue.component(RdTable.name, RdTable);
};

export default RdTable;
