<template>
  <rd-dialog
    v-bind="dialogConfig"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :append-to-body="true"
    custom-class="form-open-dialog"
    @confirm="confirm"
  >
    <div class="dialog-body" :style="{ height: boxHeight }">
      <rd-report
        v-if="dialogVisible"
        ref="rdReport"
        :table="table"
        :filters="filters"
        :headers="headers"
        :table-columns="tableColumns"
        :http-config="httpConfig"
        @selection-change="selectionChange"
        @row-dblclick="rowDblclick"
        @loadSuccess="loadSuccess"
      />
    </div>
  </rd-dialog>
</template>
<script>
import { cloneDeep } from 'lodash';
const typeMap = {
  prop: 1, // 存什么值展示什么值
  props: 2 // 存value显示label
};
export default {
  props: {
    /** dialog 配置 */
    dialogConfig: {
      type: Object,
      default: () => {
        return {
          title: '请选择'
        };
      }
    },
    /** rd-report 配置 */
    reportConfig: {
      type: Object,
      default: () => {
        return {};
      }
    },
    multiple: Boolean,
    /** 值 */
    value: [String, Number, Array, Object],
    /** 匹配关系配置 */
    rowProps: {
      type: Object
    },
    type: Number
  },
  data() {
    return {
      typeMap,
      /** dialog相关配置 */
      dialogVisible: false,

      /** report相关配置 */
      table: {},
      filters: {},
      headers: {},
      tableColumns: [],
      httpConfig: {},
      selections: [],
      value_: null,

      // 内容高度
      boxHeight: null
    };
  },
  created() {
    this.initHeight();
  },
  mounted() {},
  methods: {
    /** 初始化内容高度 */
    initHeight() {
      let height = document.documentElement.clientHeight;
      this.boxHeight = height * 0.7 - 80 + 'px';
    },

    /** 初始化配置 */
    initReport(data) {
      let data_clone = cloneDeep(data);
      let { table, filters, headers, tableColumns, httpConfig } = data_clone;

      if (!tableColumns || !httpConfig) {
        return false;
      }

      let { multipleTable = 'radio' } = table || {};

      if (this.multiple) {
        multipleTable = true;
      }

      // 初始化filters
      let { config = {} } = filters;
      let { col = 12 } = config || {};

      config = {
        col,
        ...config
      };

      this.filters = {
        ...filters,
        config
      };
      this.headers = headers;
      this.table = {
        multipleTable,
        ...table
      };

      this.tableColumns = tableColumns;
      this.httpConfig = httpConfig;
    },

    /** 打开弹窗 */
    open() {
      this.dialogVisible = true;
    },

    /** 关闭弹窗 */
    close() {
      this.dialogVisible = false;
      this.selections = [];
    },

    /** 当选择项发生变化时会触发该事件 */
    selectionChange(selection) {
      this.selections = selection;
      /**
       * 单选时记录选中的值，切换页码时回显用
       * 多选时不记录选中的值，因为如果记录选中的值，假设组件当前选择有三个值，其中2个值是第一页的，1一个值是第二页的，
       * 在数据加载第一页的时候回显勾选上那2条数据，全量设置给this.value_作为分页显示用，那么this.value_就从原来的三个数据变成了2个数据，切换到第二页的时候是就没办法回显原来的那条数据的,
       * 如果是判断重复数据push设置给this.value_，又会存在无法清除勾选的情况，因为已经勾选过的值永远不会被删除掉（el-table选择事件只会返回当前选中的行导致的），
       * 所以这个地方多选时直接不回显当前选中的记录
       *
       * 如果多选不记录新增的选择作为回显，但是单选的时候又记录了，就感觉怪怪的，所以干脆单选也不要了？
       */
      // if (!this.multiple && selection.length > 0) {
      //   if (this.type === this.typeMap.props) {
      //     this.value_ = {
      //       value: selection[0][this.rowProps.value],
      //       label: selection[0][this.rowProps.label]
      //     };
      //   } else {
      //     this.value_ = selection[0][this.rowProps.value];
      //   }
      // }
    },

    /**
     * 确定按钮点击事件
     */
    confirm() {
      if (!this.selections || !this.selections.length) {
        // Message.warning('请选择记录！');
        return;
      }
      this.doConfirm(this.selections);
    },

    /** 行双击事件 */
    rowDblclick(row) {
      let { selectable } = this.table;
      if (typeof selectable === 'function') {
        let flag = selectable(row);
        if (flag) {
          this.doConfirm([row]);
        }
      } else {
        this.doConfirm([row]);
      }
    },

    /** 调用传进来的回调，并将当前选择的数据以及当前单元格的数据返回给这个回调，并要求在会调用调用返回的回调设置值 */
    doConfirm(selections) {
      this.$emit('confirm', selections);
      this.close();
    },

    /** report 数据加载成功事件 */
    loadSuccess(data) {
      this.$nextTick(() => {
        // if (!this.multiple) {
        // 设置数据回显效果（重新勾选）
        if (Array.isArray(this.value_)) {
          data.forEach((row, index) => {
            let value = row[this.rowProps.value];

            let index_ = this.value_.findIndex((ele) => {
              if (this.type === this.typeMap.props) {
                return value === ele.value;
              } else {
                return value === ele;
              }
            });

            if (index_ > -1) {
              this.$refs.rdReport.toggleRowSelectionByIndex(index, true);
            }
          });
        } else {
          // if (this.type === this.typeMap.props) {
          if (
            (this.value_ || {}).value !== undefined &&
            (this.value_ || {}).value !== null &&
            (this.value_ || {}).value !== ''
          ) {
            data.forEach((row, index) => {
              let value = row[this.rowProps.value];
              if (value === (this.value_ || {}).value) {
                this.$refs.rdReport.toggleRowSelectionByIndex(index, true);
              }
            });
          }
          // } else {
          //   if (
          //     this.value_ !== undefined &&
          //     this.value_ !== null &&
          //     this.value_ !== ''
          //   ) {
          //     data.forEach((row, index) => {
          //       let value = row[this.rowProps.value];
          //       if (value === this.value_) {
          //         this.$refs.rdReport.toggleRowSelection(index, true);
          //       }
          //     });
          //   }
          // }
        }
        // }
      });
    }
  },
  watch: {
    reportConfig: {
      handler(newVal) {
        if (newVal) {
          this.initReport(newVal);
        }
      },
      deep: true,
      immediate: true
    },
    value: {
      handler(newVal) {
        this.value_ = cloneDeep(newVal);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.form-open-dialog {
  width: 100%;
}

.dialog-body {
  width: 100%;
}

::v-deep {
  .el-dialog__body {
    padding: 0 10px !important;

    .filters .filters-box {
      max-height: 200px;
    }
  }
}
</style>
