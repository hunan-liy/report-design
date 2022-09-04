<template>
  <div ref="rdReport" class="rd-report">
    <div ref="filter" class="rd-report-header">
      <filters
        :filters="filters"
        @flodClick="flodClick"
        @merge="mergeSearchParams"
        @submit="searchSubmit"
        @reset="resetFields"
      >
        <template v-for="item in filtersSlots" v-slot:[item.slotName]="scope">
          <slot :name="item.slotName" v-bind="scope"></slot>
        </template>
      </filters>
    </div>
    <div class="rd-report-body">
      <rd-table
        ref="rdTable"
        :table="table_"
        :headers="headers_"
        :tableColumns="tableColumns"
        :tableData="tableData_"
        @header-click="tableClick"
        @row-item-click="rowItemClick"
        @row-change="rowChange"
        @selection-change="selectionChange"
        @sort-change="sortChange"
        @cell-click="cellClick"
        @cell-dblclick="cellDblclick"
        @row-click="rowClick"
        @row-contextmenu="rowContextmenu"
        @row-dblclick="rowDblclick"
        @expand-change="expandChange"
      >
        <!-- 只有v-for和slot-scope放在同一层级时才可以正常使用 -->
        <template
          v-for="item in tableSlotArray"
          :slot="item.slotName"
          slot-scope="scope"
        >
          <slot :name="item.slotName" v-bind="scope" />
        </template>
      </rd-table>
    </div>
    <div ref="footer" v-if="isPaging" class="rd-report-footer">
      <el-pagination
        v-bind="pagination_"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash';
import ajax from './ajax';

import RdTable from '../../rd-table';
// import search from './components/search.vue';
import Filters from './components/filters';

export default {
  name: 'RdReport',
  components: {
    RdTable,
    Filters
  },
  props: {
    /**
     * 表格配置
     */
    table: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /** filters配置 */
    filters: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /** 表头部配置 */
    headers: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /**
     * 表格列配置
     */
    tableColumns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /**
     * 表格数据
     */
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /** 请求配置 */
    httpConfig: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /** 分页配置 */
    pagination: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      headers_: {},
      /** 过滤条件插槽数组 */
      filtersSlots: [],
      /** 表格插槽数组 */
      tableHeaderSlots: [],
      tableSlots: [],
      table_: {},
      tableData_: [],
      pagination_: {},
      /** 查询条件参数 */
      searchParams: {},
      /** 排序数据 */
      orderParams: {
        order: null,
        prop: null
      },
      /** 是否父组件传值过来的 */
      isParentData: false,
      /** 是否在请求中 */
      httpLoading: false
    };
  },
  computed: {
    /** 是否分页 */
    isPaging() {
      let { isPaging = true } = this.httpConfig;
      return isPaging;
    },
    tableSlotArray() {
      let ary = this.tableHeaderSlots.concat(this.tableSlots);
      return ary;
    },
    /** 拦截请求 */
    interceptRequest() {
      let interceptRequest_g =
        window.$ReportDesign && window.$ReportDesign.interceptRequest;
      let { interceptRequest } = this.httpConfig;
      return interceptRequest || interceptRequest_g || null;
    },
    /** 响应拦截 */
    interceptResponse() {
      let interceptResponse_g =
        window.$ReportDesign && window.$ReportDesign.interceptResponse;
      let { interceptResponse } = this.httpConfig;
      return interceptResponse || interceptResponse_g || null;
    }
  },
  mounted() {
    const { immediate = true } = this.httpConfig;
    // 是否立即执行请求
    if (immediate) {
      // 初始化表格数据
      this.loadData();
    }
    this.initHeight();
  },
  activated() {
    this.$refs.rdTable.doLayout();
  },
  methods: {
    /** 初始化页面表格高度 */
    initHeight() {
      this.$nextTick(() => {
        let rdReport = this.$refs.rdReport;
        let rdFilter = this.$refs.filter || { clientHeight: 0 }; // 条件查询区域高度
        let rdTable = this.$refs.rdTable;
        let footer = this.$refs.footer || { clientHeight: 0 };
        let table_header = rdTable.$el.querySelector('.rd-table-header') || {
          clientHeight: 0
        };
        let height = rdReport.clientHeight - 16; // 总高度 - padding16
        let height_filters = rdFilter.clientHeight;
        let height_table_header = table_header.clientHeight + 10 + 10; // table组件的头部高度 + 头部padding + 底部margin
        let height_footer = footer.clientHeight + 10; // 底部高度
        // console.log(height, height_filters);

        let height_table =
          height - height_filters - height_table_header - height_footer;
        this.$set(this.table_, 'height', height_table);
      });
    },

    // 展开/收起 按钮点击事件
    flodClick() {
      this.$nextTick(() => {
        this.initHeight();
      });
    },

    /** 处理表配置 */
    handleTable(data) {
      this.table_ = cloneDeep(data);
    },

    /** 处理过滤条件配置 */
    handleFilters(data) {
      let filters = cloneDeep(data);
      let { formConfig = {} } = filters;

      Object.entries(formConfig).map(([prop, ele]) => {
        let { type, slotName } = ele;
        if (type === 'slot') {
          if (!slotName) {
            ele.slotName = prop;
          }
          this.filtersSlots.push(ele);
        }
      });
    },

    /** 处理头部配置 */
    handleHeaders(data) {
      this.tableHeaderSlots = [];
      let headers = cloneDeep(data);
      Object.entries(headers).map(([prop, ele]) => {
        let { type, slotName } = ele;

        if (type === 'slot') {
          if (!slotName) {
            ele.slotName = prop;
          }
          this.tableHeaderSlots.push(ele);
        }
        return ele;
      });
      this.headers_ = headers;
    },

    // 初始化TableColumns
    handleTableColumns(data) {
      this.tableSlots = [];
      let data_ = cloneDeep(data);
      this.tableColumns_ = [];
      data_.forEach((ele) => {
        let { type, headerSlotName } = ele;
        // 解析slot
        if (type === 'slot') {
          if (!ele.slotName) {
            ele.slotName = ele.prop;
          }
          this.tableSlots.push(ele);
        }
        if (headerSlotName) {
          this.tableSlots.push({
            ...ele,
            slotName: headerSlotName
          });
        }
        this.tableColumns_.push(ele);
      });
    },

    /**
     * 处理表数据
     */
    handleTableData(data) {
      if (data && !this.httpConfig.url && !this.httpConfig.requestMethod) {
        this.isParentData = true;
        this.tableData_ = cloneDeep(data || []);
      }
    },

    /** 处理分页配置 */
    handlePagination(data) {
      let data_ = cloneDeep(data || {});
      let {
        background = true,
        currentPage = 1,
        pageSize = 10,
        pageSizes = [10, 20, 50, 100],
        layout = 'total, sizes, ->, prev, pager, next, jumper',
        total = 0
      } = data_;

      this.pagination_ = {
        background,
        currentPage,
        pageSize,
        pageSizes,
        layout,
        total,
        ...data_
      };
    },

    /** 合并search的值到全局的变量中 */
    mergeSearchParams(params) {
      Object.keys(params).forEach((key) => {
        if (Object.hasOwn(this.searchParams, key)) {
          // if (this.searchParams.hasOwnProperty(key)) {
          this.searchParams[key] = params[key];
        } else {
          this.$set(this.searchParams, key, params[key]);
        }
      });
    },

    // 通过prop获取tableLabel中的item
    getTableColumnByProp(prop) {
      let item = null;
      this.tableColumns_.forEach((ele) => {
        if (ele.prop === prop) {
          item = ele;
        }
      });
      return item;
    },

    /** 表格点击事件 */
    tableClick(params) {
      this.$emit('header-click', params);
    },
    /** 表格行点击事件 */
    rowItemClick(params) {
      this.$emit('row-item-click', params);
    },
    /** 表格行数据change事件 */
    rowChange(params) {
      this.$emit('row-change', params);
    },
    /** 表格行选中事件 */
    selectionChange(params) {
      this.$emit('selection-change', params);
    },
    /** 当某个单元格被点击时会触发该事件 */
    cellClick(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event);
    },

    /** 当某个单元格被双击击时会触发该事件 */
    cellDblclick(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event);
    },

    /** 当某一行被点击时会触发该事件 */
    rowClick(row, column, event) {
      this.$emit('row-click', row, column, event);
    },

    /** 当某一行被鼠标右键点击时会触发该事件 */
    rowContextmenu(row, column, event) {
      this.$emit('row-contextmenu', row, column, event);
    },

    /** 当某个单元格被双击击时会触发该事件 */
    rowDblclick(row, column, event) {
      this.$emit('row-dblclick', row, column, event);
    },

    /** 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded） */
    expandChange(row, params) {
      this.$emit('expand-change', row, params);
    },

    /** 排序事件 */
    sortChange(params) {
      // 只有当是自定义排序的时候才走接口去请求数据
      if (params.column.sortable === 'custom') {
        // 升序
        if (params.order === 'ascending') {
          this.orderParams.order = params.order;
        } else if (params.order === 'descending') {
          // 降序
          this.orderParams.order = params.order;
        } else {
          // 初始化
          this.orderParams.order = null;
        }
        if (this.orderParams.order !== null) {
          let item = this.getTableColumnByProp(params.prop);
          if (item.sortProp) {
            this.orderParams.prop = item.sortProp;
          } else {
            this.orderParams.prop = params.prop;
          }
        } else {
          this.orderParams.prop = null;
        }
        this.loadData();
      }
      this.$emit('sort-change', params);
    },

    /** 查询事件 */
    searchSubmit(params) {
      this.mergeSearchParams(params);
      // 重置到第一页
      this.pagination_.currentPage = 1;
      this.loadData();
    },

    /** 重置事件 */
    resetFields() {
      this.$emit('reset');
    },

    /** pageSize 改变时会触发 */
    sizeChange(pageSize) {
      this.pagination_.pageSize = pageSize;
      // pageSize 变化时将currentPage设为1
      this.pagination_.currentPage = 1;
      this.loadData();
    },

    /** currentPage 改变时会触发 */
    currentChange(currentPage) {
      this.pagination_.currentPage = currentPage;
      this.loadData();
    },

    /** 加载数据 */
    loadData() {
      if (this.isParentData) {
        // 如果是通过父组件传递过来数据的形式来展示数据的话，则通知父组件去请求数据
        let data = this.getHttpParams();
        this.$emit('loadData', data);
      } else {
        if (this.httpLoading) {
          return;
        }
        this.httpLoading = true;
        let {
          method = 'post',
          url,
          header,
          requestMethod,
          requestConfig
        } = this.httpConfig;
        let data = this.getHttpParams();

        if (requestMethod) {
          requestMethod(data, requestConfig, this.httpLoading)
            .then((res) => {
              console.log(res);

              this.handelResponse(res);
              this.httpLoading = false;
            })
            .catch(() => {
              this.httpLoading = false;
            });
        } else {
          ajax({
            type: method,
            url,
            data,
            header: {
              Accept: 'application/json, */*',
              'Content-Type': 'application/json;charset=UTF-8',
              ...header
            },
            success: (res) => {
              this.handelResponse(res);
              this.httpLoading = false;
            },
            error: () => {
              this.httpLoading = false;
            }
          });
        }
      }
    },

    /** 处理请求结果 */
    handelResponse(res) {
      if (this.interceptResponse) {
        let { dataFormatter } = this.httpConfig;
        let { tableData, total } = this.interceptResponse(res, this.httpConfig);
        this.pagination_.total = total || 0;
        if (dataFormatter) {
          tableData = dataFormatter(tableData, res);
        }
        this.tableData_ = tableData || [];
      }
      this.loadDataSuccess();
    },

    /** 获取组装完成后的接口请求参数 - 给外部使用 */
    getRequestParams() {
      return this.getHttpParams();
    },

    /** 获取组装完成后的接口请求参数 */
    getHttpParams() {
      let data = null;
      if (this.interceptRequest) {
        data = this.interceptRequest(
          {
            filters: this.searchParams,
            page: {
              currentPage: this.isPaging ? this.pagination_.currentPage : null,
              pageSize: this.isPaging ? this.pagination_.pageSize : null,
              isPaging: this.isPaging
            },
            orderParams: {
              ...this.orderParams
            }
          },
          this.httpConfig
        );
      }
      // let data = {
      //   page: {
      //     pageNum: this.currentPage_,
      //     pageSize: this.pageSize_,
      //     sort: null,
      //     orderBy: null,
      //     isPaging: true
      //   }
      // };
      // // 组装排序数据
      // if (this.sortParams.sortOrder !== null) {
      //   data.page.sort = this.sortParams.sort;
      //   data.page.orderBy = this.sortParams.orderBy;
      // }

      // // 组装分页
      // if (this.isPaging) {
      //   data.page.pageNum = this.pagination_.currentPage;
      //   data.page.pageSize = this.pagination_.pageSize;
      //   data.page.isPaging = this.isPaging;
      // } else {
      //   data.page.isPaging = this.isPaging;
      // }

      let { paramFormatter } = this.httpConfig;
      let params = cloneDeep(data || {});

      if (paramFormatter) {
        params = paramFormatter(params);
      }
      data = {
        ...params
      };
      return data;
    },

    /** 获取表格数据 */
    getTableData() {
      return cloneDeep(this.tableData_);
    },

    /** 加载成功调用的事件 */
    loadDataSuccess() {
      this.$emit('loadSuccess', this.tableData_);
    },

    /** 用于多选表格，清空用户的选择 */
    clearSelection() {
      let table = this.$refs['rdTable'];
      table.clearSelection();
    },

    /** 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） */
    toggleRowSelection(index, selected) {
      let table = this.$refs['rdTable'];
      table.toggleRowSelection(index, selected);
    }
  },
  watch: {
    table: {
      handler(newVal) {
        this.handleTable(newVal);
      },
      immediate: true,
      deep: true
    },
    filters: {
      handler(newVal) {
        this.handleFilters(newVal);
      },
      immediate: true,
      deep: true
    },
    headers: {
      handler(newVal) {
        this.handleHeaders(newVal);
      },
      immediate: true,
      deep: true
    },
    tableColumns: {
      handler(newVal) {
        this.handleTableColumns(newVal);
      },
      immediate: true,
      deep: true
    },
    tableData: {
      handler(newVal) {
        this.handleTableData(newVal);
      },
      immediate: true,
      deep: true
    },
    pagination: {
      handler(newVal) {
        this.handlePagination(newVal);
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.rd-report {
  width: 100%;
  height: 100%;
  padding: 8px;

  &-body {
    padding-top: 10px;
    margin-bottom: 10px;
  }
  &-footer {
    margin-bottom: 10px;
  }
}
</style>
