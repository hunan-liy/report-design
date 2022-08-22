<template>
  <div ref="rdReport" class="rd-report">
    <div ref="filter" class="rd-report-header">
      <filters :filters="filters" @flodClick="flodClick"></filters>
    </div>
    <div class="rd-report-body">
      <rd-table
        ref="rdTable"
        :table="table_"
        :headers="headers_"
        :tableColumns="tableColumns"
        :tableData="tableData_"
        @click="tableClick"
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
        <!-- <span class="el-pagination__slot"
          >共 {{ pagination_.total }} 条
          <span class="el-pagination__sizes">
            <el-select
              :value="pagination_.pageSize"
              :disabled="pagination_.disabled"
              size="mini"
              @change="sizeChange"
            >
              <el-option
                v-for="(item, index) in pagination_.pageSizes"
                :key="index"
                :value="item"
                :label="item + '条/页'"
              >
              </el-option>
            </el-select>
          </span>
        </span> -->
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
      /** 表格插槽数组 */
      tableHeaderSlots: [],
      tableSlots: [],
      /** 认证信息 */
      authorization: '',
      table_: {},
      tableData_: [],
      pagination_: {},
      /** 查询条件参数 */
      searchParams: {},
      /** 排序数据 */
      sortParams: {
        sort: null,
        orderBy: null
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
    }
  },
  mounted() {
    this.authorization = window.HuiymentUI && window.HuiymentUI.authorization;

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
        console.log(height, height_filters);

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

    /** 处理头部配置 */
    handleHeaders(data) {
      this.tableHeaderSlots = [];
      let headers = cloneDeep(data);
      Object.entries(headers).map(([prop, ele]) => {
        let { type, slotName, props, label } = ele;
        if (type === 'search') {
          // 高级搜索
          ele.type = 'slot';
          ele.slotName = prop;
          ele.type_ = type;
          ele.prop = prop;
          let size = 'mini';

          let { title, value } = props;
          if (value) {
            this.mergeSearchParams(value);
          }
          if (!title) {
            title = label || '高级搜索';
          }

          ele = {
            size,
            ...ele,
            props: {
              title,
              ...props
            }
          };
          this.tableHeaderSlots.push(ele);
        } else if (type === 'refresh') {
          // 刷新按钮
          ele.type = 'slot';
          ele.slotName = prop;
          ele.type_ = type;
          ele.prop = prop;

          let btnType = 'primary';
          let size = 'mini';
          ele = {
            ...ele,
            props: {
              type: btnType,
              size,
              ...props
            }
          };

          this.tableHeaderSlots.push(ele);
        } else if (type === 'slot') {
          if (!slotName) {
            ele.slotName = prop;
          }
          // if (!this.checkTableSlots(ele.slotName)) {
          this.tableHeaderSlots.push(ele);
          // }
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
          // if (!this.checkTableSlots(ele.slotName)) {
          this.tableSlots.push(ele);
          // }
        }
        if (headerSlotName) {
          // if (!this.checkTableSlots(headerSlotName)) {
          this.tableSlots.push({
            ...ele,
            slotName: headerSlotName
          });
          // }
        }
        this.tableColumns_.push(ele);
      });
    },

    /**
     * 处理表数据
     */
    handleTableData(data) {
      if (data && !this.httpConfig.url) {
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
        // layout = 'slot, prev, pager, next, jumper',
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

    // 检查tableSlots中是否已经存在slotName的slot
    checkTableSlots(slotName) {
      let flag = false;
      this.tableSlots.forEach((ele) => {
        if (ele.slotName === slotName) {
          flag = true;
        }
      });
      return flag;
    },

    /** 表格点击事件 */
    tableClick(params) {
      this.$emit('table-click', params);
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
          this.sortParams.sort = 1;
        } else if (params.order === 'descending') {
          // 降序
          this.sortParams.sort = 2;
        } else {
          // 初始化
          this.sortParams.sort = null;
        }
        if (this.sortParams.sort !== null) {
          let item = this.getTableColumnByProp(params.prop);
          if (item.sortProp) {
            this.sortParams.orderBy = item.sortProp;
          } else {
            this.sortParams.orderBy = params.prop;
          }
        } else {
          this.sortParams.orderBy = null;
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

    /** 刷新事件 */
    refreshClick() {
      this.$emit('refresh');
      this.loadData();
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
        let { method = 'post', url, header, dataFormatter } = this.httpConfig;
        let data = this.getHttpParams();

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
            let { total, list } = res.data || {};
            this.pagination_.total = total;

            if (dataFormatter) {
              list = dataFormatter(list, res);
            }
            this.tableData_ = list || [];
            this.loadDataSuccess();
            this.httpLoading = false;
          },
          error: () => {
            this.httpLoading = false;
          }
        });
      }
    },

    /** 获取组装完成后的接口请求参数 */
    getHttpParams() {
      let data = {
        page: {
          pageNum: this.currentPage_,
          pageSize: this.pageSize_,
          sort: null,
          orderBy: null,
          isPaging: true
        }
      };
      // 组装排序数据
      if (this.sortParams.sortOrder !== null) {
        data.page.sort = this.sortParams.sort;
        data.page.orderBy = this.sortParams.orderBy;
      }

      // 组装分页
      if (this.isPaging) {
        data.page.pageNum = this.pagination_.currentPage;
        data.page.pageSize = this.pagination_.pageSize;
        data.page.isPaging = this.isPaging;
      } else {
        data.page.isPaging = this.isPaging;
      }

      let { paramFormatter } = this.httpConfig;
      let params = cloneDeep(this.searchParams || {});

      if (paramFormatter) {
        params = paramFormatter(params);
      }
      data = {
        ...params,
        ...data
      };
      return data;
    },

    /** 加载成功调用的事件 */
    loadDataSuccess() {
      this.$emit('loadSuccess', this.tableData_);
    },

    /** 打开高级搜索弹窗 */
    openSearch() {
      this.$refs.search && this.$refs.search[0].openDialog();
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
