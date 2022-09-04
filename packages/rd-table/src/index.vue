<template>
  <div class="rd-table">
    <!-- 头部部分 -->
    <div class="rd-table-header">
      <div class="rd-table-header-left">
        <div
          v-for="(item, index) in headers_"
          :key="index"
          class="rd-table-header-item"
        >
          <!-- 插槽 -->
          <template v-if="item.type === 'slot'">
            <slot
              :name="item.slotName"
              v-bind="item"
              :selections="selections"
            ></slot>
          </template>
          <!-- 默认用按钮 -->
          <el-button v-else v-bind="item.props" @click="btnClick(item)">
            {{ item.label }}
          </el-button>
        </div>
      </div>
      <div class="rd-table-header-right">
        <!-- 列筛选 -->
        <div v-if="visibleColumns_.length > 0" class="visibleCols">
          <el-dropdown trigger="click" :hide-on-click="false">
            <i class="el-icon-setting"></i>
            <template v-slot:dropdown>
              <el-dropdown-menu class="rd-dropdown-menu visibleCols-list">
                <el-dropdown-item
                  v-for="(item, index) in visibleColumns_"
                  :key="index"
                >
                  <div class="visibleCols-item">
                    <el-checkbox
                      v-model="item.visible"
                      class="checkbox"
                      @change="visibleChange"
                    ></el-checkbox>
                    <span class="ellipsis">{{ item.label }}</span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="rd-table-body">
      <el-table
        ref="el-table"
        v-bind="table_"
        :data="tableData_"
        @selection-change="selectionChange"
        @sort-change="sortChange"
        @cell-click="cellClick"
        @cell-dblclick="cellDblclick"
        @row-click="rowClick"
        @row-contextmenu="rowContextmenu"
        @row-dblclick="rowDblclick"
        @expand-change="expandChange"
      >
        <!-- 选择框 -->
        <el-table-column
          v-if="multipleTable"
          type="selection"
          width="35"
          :class-name="multipleTable === 'radio' ? 'multipleTable-radio' : ''"
          :fixed="hasFixed"
          :selectable="table_.selectable"
        />
        <template v-for="(column, index) in tableColumns_">
          <!-- 没有类型时直接用原本的列 主要是未了使用element的table自带的tree功能 -->
          <el-table-column
            v-if="!column.type"
            :key="index"
            v-bind="column"
            :type="undefined"
          >
            <!-- 按正常逻辑这里应该是判断headerSlotName存不存在来确定使不使用header插槽，但是这里不知道为什么按正常写法不生效，所以直接就强制使用了header插槽，有待研究 -->
            <template slot="header" slot-scope="scope">
              <column-header :column="column" :index="index" :scope="scope">
                <slot
                  v-if="column.headerSlotName"
                  :name="column.headerSlotName"
                  v-bind="scope"
                />
              </column-header>
            </template>
            <template v-if="column.children && column.children.length > 0">
              <template v-for="(col, i) in column.children">
                <el-table-column
                  v-if="!col.type"
                  :key="i"
                  v-bind="col"
                  :type="undefined"
                >
                </el-table-column>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="index"
            v-bind="column"
            :filtered-value="column.filteredValue"
            :type="undefined"
          >
            <!-- 按正常逻辑这里应该是判断headerSlotName存不存在来确定使不使用header插槽，但是这里不知道为什么按正常写法不生效，所以直接就强制使用了header插槽，有待研究 -->
            <template slot="header" slot-scope="scope">
              <column-header :column="column" :index="index" :scope="scope">
                <slot
                  v-if="column.headerSlotName"
                  :name="column.headerSlotName"
                  v-bind="scope"
                />
              </column-header>
            </template>
            <!-- 目前复杂表头这种写法只能兼容到2级，想要多层级，需要使用组件递归去实现 -->
            <template v-if="column.children && column.children.length > 0">
              <template v-for="(col, i) in column.children">
                <el-table-column
                  :key="i"
                  v-bind="col"
                  :filtered-value="col.filteredValue"
                  :type="undefined"
                >
                  <!-- 按正常逻辑这里应该是判断headerSlotName存不存在来确定使不使用header插槽，但是这里不知道为什么按正常写法不生效，所以直接就强制使用了header插槽，有待研究 -->
                  <template slot="header" slot-scope="scope">
                    <column-header :column="col" :index="i" :scope="scope">
                      <slot
                        v-if="col.headerSlotName"
                        :name="col.headerSlotName"
                        v-bind="scope"
                      />
                    </column-header>
                  </template>
                  <template v-if="col.type">
                    <template slot-scope="scope">
                      <!-- 插槽 -->
                      <slot
                        v-if="col.type === 'slot'"
                        :name="col.slotName"
                        v-bind="scope"
                        :value="scope.row[col.prop]"
                      />
                      <!-- 其他内容项 -->
                      <table-column
                        v-else
                        :scope="scope"
                        :column="col"
                        :dropList="dropList"
                        @change="rowDataChange"
                        @click="rowItemClick"
                      />
                    </template>
                  </template>
                </el-table-column>
              </template>
            </template>
            <!-- 内容插槽 -->
            <template v-if="column.type" slot-scope="scope">
              <template>
                <!-- 插槽 -->
                <slot
                  v-if="column.type === 'slot'"
                  :name="column.slotName"
                  v-bind="scope"
                  :value="scope.row[column.prop]"
                />
                <!-- 其他内容项 -->
                <table-column
                  v-else
                  :scope="scope"
                  :column="tableColumns_[index]"
                  :dropList="dropList"
                  @change="rowDataChange"
                  @click="rowItemClick"
                />
              </template>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash';
import TableColumn from './components/tableColumn.vue';
import ColumnHeader from './components/columnHeader.vue';
export default {
  name: 'RdTable',
  components: {
    TableColumn,
    ColumnHeader
  },
  props: {
    /**
     * 表格配置
     * 兼容el-table的属性
     */
    table: {
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
    /**
     * 编辑行中下拉项的数据与tableColumns配合使用
     */
    dropList: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      table_: {},
      /** 展示的列的数据数组 */
      // tableColumns_: [],
      /** 开启了过滤的列的数组 */
      visibleColumns_: [],
      /** 所有的列的数据数组 */
      tableColumns_All: [],
      /** 所有的表数据 */
      tableData_All: [],
      /** 展示的表数据 */
      tableData_: [],
      /** 当前选中的行数据 */
      selections: [],
      /** 是否有固定列 */
      hasFixed: false
      /** filters数据值是否change过 */
      // filtersChaneg: false,
      /** 刷新标识 */
      // refreshFlag: true
    };
  },
  computed: {
    /** 表头部配置 */
    headers_() {
      let data_clone = cloneDeep(this.headers);
      let headers = Object.entries(data_clone)
        .map(([prop, ele]) => {
          let { type, props, slotName } = ele;
          let size, btnType;
          if (type !== 'slot') {
            btnType = 'primary';
            size = 'mini';
          }

          // 如果未指定slotName，直接赋值为prop
          if (type === 'slot' && !slotName) {
            slotName = prop;
          }

          return {
            slotName,
            ...ele,
            prop,
            props: {
              type: btnType,
              size,
              ...props
            }
          };
        })
        .filter((ele) => {
          let { hidden = false } = ele;
          let flag = true;
          if (typeof hidden === 'function') {
            flag = !hidden(ele);
          } else {
            flag = !hidden;
          }
          return flag;
        });

      return headers;
    },
    /** 是否开启表格多选 */
    multipleTable() {
      let { multipleTable = false } = this.table_;
      return multipleTable;
    },
    /** 需要控制是否展示的列 暂时与复杂表头不兼容 */
    visibleColumns() {
      let cols = [];
      let columns = cloneDeep(this.tableColumns_All);
      let { visibleCols } = this.table_;

      // 如果列有配置，直接取列的，去掉table中的逻辑
      let visibles = columns.filter((col) => {
        // if (Object.prototype.hasOwnProperty.calll(col, 'visible')) {
        if (Object.hasOwn(col, 'visible')) {
          return col;
        }
      });

      if (visibles.length > 0) {
        cols = visibles;
      } else {
        // 取table中配置的
        if (visibleCols === true) {
          cols = columns.map((col) => {
            return {
              ...col,
              visible: true
            };
          });
        } else if (Array.isArray(visibleCols)) {
          columns.forEach((col) => {
            let { prop } = col;
            if (visibleCols.indexOf(prop) !== -1) {
              cols.push({
                ...col,
                visible: true
              });
            }
          });
        }
      }
      return cols;
    },
    tableColumns_() {
      let cols = [];
      let columns = cloneDeep(this.tableColumns_All);

      // 处理只读
      columns.forEach((ele) => {
        this.handleReadonly(ele);
      });

      // 处理列的显示隐藏 暂时与复杂表头不兼容
      if (this.visibleColumns_.length === 0) {
        cols = columns;
      } else {
        cols = columns.filter((col) => {
          let visibleCol = this.visibleColumns_.find((c) => {
            return c.prop === col.prop;
          });

          if (visibleCol) {
            if (visibleCol.visible === true) {
              return col;
            }
          } else {
            return col;
          }
        });
      }

      let hasFixed = false;
      cols.forEach((col) => {
        let { fixed } = col;
        // 判断在显示的列中是否有列开始了fixed固定
        if (fixed) {
          hasFixed = true;
        }
      });
      this.setHasFixed(hasFixed);

      // // 处理filters数据 因为这部分数据处理涉及到tableData，所以需要在computed中处理比较好
      // cols = cols.map((col) => {
      //   return this.handleFilters(col);
      // });

      // console.log('--------------', cols);
      /** 由于某种未知原因，在col.filters的长度发生变化后，el-table-column组件不会及时响应（猜测有缓存？），所以在数据变化后直接重新渲染一次，但是会很影响性能，待后续再优化吧 */
      // if (this.filtersChaneg) {
      //   this.updateRefreshFlag();
      // }
      return cols;
    }
  },
  methods: {
    /**
     * 处理表配置
     */
    handleTable(data) {
      let table = cloneDeep(data);
      let { border = true, sumText = '合计' } = table;

      this.table_ = {
        border,
        sumText,
        ...table
      };
    },
    /**
     * 处理列数据
     */
    handleTableColumns(data) {
      let columns = cloneDeep(data);
      let tableColumns = columns
        .filter((ele) => {
          return this.filterCol(ele);
        })
        .map((ele) => {
          return this.setEle(ele);
        });
      this.tableColumns_All = tableColumns;
    },

    /** 过滤列数据 */
    filterCol(ele) {
      let { hidden = false } = ele;
      let flag = true;
      if (typeof hidden === 'function') {
        flag = !hidden(ele);
      } else {
        flag = !hidden;
      }
      if (ele.children && ele.children.length > 0) {
        ele.children.filter((e) => {
          return this.filterCol(e);
        });
      }
      return flag;
    },

    /** 解析并转义部分属性 */
    setEle(ele) {
      let {
        type,
        align = 'center',
        width,
        props,
        prop,
        slotName,
        ellipsis,
        formatter,
        children
      } = ele;

      if (type === 'operation') {
        width = 120;
      }

      if (!slotName) {
        slotName = prop;
      }

      // 因为自定义了formatter的类型可能是string，这会导致el-table自带的formatter解析报错，而我们本来就没有使用自带的formatter解析，所以直接拿另外的属性去存着
      let formatter_c;
      if (type && formatter) {
        formatter_c = formatter;
        formatter = undefined;
      }

      if (children && children.length > 0) {
        children = children.map((e) => {
          return this.setEle(e);
        });
      }

      return {
        type,
        slotName,
        align,
        width,
        ellipsis,
        props: {
          ...props
        },
        ...ele,
        formatter,
        formatter_c,
        children
      };
    },

    /**
     * 处理表数据
     */
    handleTableData(data) {
      this.tableData_All = cloneDeep(data || []);
      this.tableData_ = this.tableData_All;
      this.doLayout();
    },

    /** 处理只读 */
    handleReadonly(ele) {
      if (this.table_.readonly) {
        let { children } = ele;
        if (children && children.length > 0) {
          children.forEach((e) => {
            this.handleReadonly(e);
          });
        }
        ele.props = {
          ...ele.props,
          readonly: this.table_.readonly
        };
      }
    },

    /** 处理数据值过滤 */
    // handleFilters(col) {
    //   let { filters, prop, children } = col;

    //   // 当列中存在filters且为true，说明源列数据中开启了列过滤，而且这次处理为第一次处理
    //   if (filters === true) {
    //     // 这个时候直接取数据值作为过滤下拉数据
    //     let ary = [];
    //     this.tableData_All.forEach((data) => {
    //       let item = ary.find((e) => {
    //         return e.value === data[prop];
    //       });
    //       if (!item) {
    //         ary.push({
    //           text: data[prop],
    //           value: data[prop]
    //         });
    //       }
    //     });
    //     this.filtersChaneg = true;
    //     col.filters = ary;
    //     col.filterMethod = this.filterHandler;
    //     col.filteredValue =
    //       col.filteredValue || col.filters.map((ele) => ele.value);
    //   } else if (Array.isArray(filters) && filters.length > 0) {
    //     // 当列中存在filters且为数组，这里有两种情况，一种是源列数据中指定的就是数组，另一种情况源列数据中指定的是true，并且已经经过了上述第一次处理，这个时候就要看看源列数据中究竟是什么值
    //     let colInAll = this.tableColumns_All.find((c) => {
    //       return c.prop === col.prop;
    //     });

    //     // 如果源列数据中filters为true，说明filters中的数据是取的data数据值，继续取数据值就行
    //     if (colInAll.filters === true) {
    //       col.filters = this.tableData_All.map((data) => {
    //         return {
    //           text: data[prop],
    //           value: data[prop]
    //         };
    //       });
    //     } else if (Array.isArray(filters)) {
    //       // 如果源列数据中filters为数组，那就继续取源列数据中的数组
    //       col.filters = filters;
    //     }
    //     this.filtersChaneg = true;
    //     col.filterMethod = this.filterHandler;
    //     col.filteredValue =
    //       col.filteredValue || col.filters.map((ele) => ele.value);
    //   }
    //   if (children && children.length) {
    //     col.children = children.map((c) => {
    //       return this.handleFilters(c);
    //     });
    //   }
    //   return col;
    // },

    /** 用于多选表格，清空用户的选择 */
    clearSelection() {
      let table = this.$refs['el-table'];
      table.clearSelection();
    },

    /** 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） */
    toggleRowSelection(index, selected) {
      this.$nextTick(() => {
        let row = this.tableData_[index];
        if (row) {
          let table = this.$refs['el-table'];
          table.toggleRowSelection(row, selected);
        }
      });
    },

    /** 重新设置一下table布局，以防table样式错误 */
    doLayout() {
      this.$nextTick(() => {
        let table = this.$refs['el-table'];
        table.doLayout();
      });
    },

    /** 手动对 Table 进行排序。参数prop属性指定排序列，order指定排序顺序 */
    sort(prop, order) {
      let table = this.$refs['el-table'];
      table.sort(prop, order);
    },

    /** 获取表格数据 */
    getTableData(){
      return  cloneDeep(this.tableData_);
    },

    /** 获取列样式 */
    // getClassName(column, index) {
    //   let { className } = column;
    //   if (this.hasChildren && index === 0) {
    //     className = className
    //       ? 'hasChildren-column ' + className
    //       : 'hasChildren-column';
    //   }
    //   return className;
    // },

    /** 设置hasFixed */
    setHasFixed(hasFixed) {
      this.hasFixed = hasFixed;
    },

    /** 设置hasFixed */
    // updateRefreshFlag() {
    //   this.refreshFlag = false;
    //   this.$nextTick(() => {
    //     this.refreshFlag = true;
    //   });
    // },

    /** filter过滤事件 */
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },

    /** 头部按钮点击事件 */
    btnClick(item) {
      let params = {
        type: 'header',
        clickItem: item,
        selections: this.selections
      };
      this.$emit('header-click', params);
    },

    /** 当选择项发生变化时会触发该事件 */
    selectionChange(selection) {
      if (this.multipleTable === 'radio') {
        if (selection.length > 1) {
          this.$refs['el-table'].toggleRowSelection(this.selections[0]);
        } else {
          this.selections = selection;
          this.$emit('selection-change', selection);
        }
      } else {
        this.selections = selection;
        this.$emit('selection-change', selection);
      }
    },

    /** 当表格的排序条件发生变化的时候会触发该事件 */
    sortChange(params) {
      this.$emit('sort-change', params);
    },

    /** 递归设置值 */
    recursionSetValue(array, prop, value, childrenKey, rowKey) {
      array.forEach((row) => {
        if (rowKey === row[this.table_.rowKey]) {
          row[prop] = value;
        } else if (row[childrenKey] && row[childrenKey].length > 0) {
          this.recursionSetValue(
            row[childrenKey],
            prop,
            value,
            childrenKey,
            rowKey
          );
        }
      });
    },

    /**
     * 行数据change事件
     */
    rowDataChange(params) {
      // TODO: 这里还涉及到如果是展开的数据，涉及到数据修改时，要去根据父子逻辑找到那条数据去修改，不然会报错，如果今后有这个需求再实现
      const { prop, index, value, row } = params || {};
      if (this.table_.rowKey) {
        let { children: childrenKey } = this.table_.treeProps || {};
        let rowKey = row[this.table_.rowKey];
        this.recursionSetValue(
          this.tableData_,
          prop,
          value,
          childrenKey,
          rowKey
        );
      } else {
        try {
          this.tableData_[index][prop] = value;
        } catch (error) {
          console.log(error);
        }
      }
      this.$emit('row-change', params);
    },

    // /** 开窗选择之后重设行数据 */
    // changeRow(row, index) {
    //   let data = this.tableData_[index];
    //   Object.keys(row).forEach((prop) => {
    //     if (data[prop] !== row[prop]) {
    //       // if (Object.prototype.hasOwnProperty.calll(data, prop)) {
    //       if (Object.hasOwn(data, prop)) {
    //         try {
    //           this.tableData_[index][prop] = row[prop];
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       } else {
    //         this.$set(this.tableData_[index], prop, row[prop]);
    //       }

    //       let params = {
    //         prop,
    //         index,
    //         value: row[prop]
    //       };
    //       this.$emit('row-change', params);
    //     }
    //   });
    // },

    /** 行内元素点击事件 */
    rowItemClick(params) {
      this.$emit('row-item-click', params);
    },

    /** 过滤筛选事件 */
    // columnFilter(params) {
    //   // 现在用el-popover显示的过滤列，他在文档流中会一直存在，所以这里没有处理columnFilter触发之后的filteredValue，按道理说要处理一下，形成闭环
    //   let { value, column } = params;
    //   this.tableData_ = this.tableData_All.filter((ele) => {
    //     let flag = false;
    //     value.forEach((e) => {
    //       if (column.filterMethod(e, ele, column)) {
    //         flag = true;
    //       }
    //     });
    //     return flag;
    //   });
    // },

    /** 列的过滤事件 */
    visibleChange() {
      // console.log('visibleChange');
      this.doLayout();
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
        // 在有fixed的时候，切换列的显示，会导致fixed列的top计算有问题，所以重新计算一下table的布局
        this.$nextTick(() => {
          if (this.hasFixed) {
            this.doLayout();
          }
        });
      },
      immediate: true,
      deep: true
    },
    /** 通过watch的方式让computed visibleColumns可以在上方代码中v-modal双向绑定直接修改*/
    visibleColumns: {
      handler(newVal) {
        this.visibleColumns_ = newVal;
      },
      immediate: true,
      deep: true
    },
    visibleColumns_: {
      handler() {
        // 在有fixed的时候，切换列的显示，会导致fixed列的top计算有问题，所以重新计算一下table的布局
        this.$nextTick(() => {
          if (this.hasFixed) {
            this.doLayout();
          }
        });
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.rd-table {
  // $mainTextColor: #333333; //主要文本色

  // .el-table--border th,
  // .el-table--border td {
  //   border-right: 1px solid #aaa !important;
  // }

  // .el-table--group,
  // .el-table--border {
  //   border: 1px solid #aaa !important;
  // }

  // .el-table th.is-leaf,
  // .el-table td {
  //   border-bottom: 1px solid #aaa !important;
  // }

  // .el-table--border th {
  //   border-bottom: 1px solid #aaa !important;
  // }

  .el-table {
    //width: 100%;
    // font-size: 12px;

    // th,
    // td {
    //   color: $mainTextColor;
    //   padding: 5px 0;
    // }

    ::v-deep {
      thead {
        th {
          padding: 6px;
        }
        .cell {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 0;

          // 自定义过滤数据功能，所以这个地方隐藏自带的功能按钮
          // .el-table__column-filter-trigger {
          //   display: none;
          // }
        }
      }
    }
  }

  // 单选模式时去掉列头选择框
  thead .multipleTable-radio .el-checkbox {
    display: none;
  }

  // .hasChildren {
  //   .el-table__indent {
  //     display: none;
  //   }

  //   .cell {
  //     padding: 0;

  //     .el-table__expand-icon {
  //       width: 12px;
  //       line-height: 12px;
  //       height: 12px;
  //       text-align: center;
  //     }
  //   }
  // }

  // .el-table__row--level-1 {
  //   .hasChildren-column {
  //     padding-left: 15px;
  //   }
  // }

  // .el-table__row--level-2 {
  //   .hasChildren-column {
  //     padding-left: 30px;
  //   }
  // }

  &-header {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    &-left {
      display: flex;
      flex: 1;
      padding-bottom: 10px;
    }

    &-right {
      display: flex;
      padding-bottom: 10px;

      .visibleCols {
        cursor: pointer;
        padding-top: 7px;
      }
    }

    &-item {
      margin-right: 5px;
      line-height: 23px;
      font-size: 12px;
    }
  }

  // &-body {
  //   background-color: #fff;
  // }

  .f-center {
    display: flex;
    justify-content: center;
  }
}

.visibleCols-list {
  max-width: 200px;
  max-height: 500px;
  overflow: hidden;
  overflow-y: auto;

  .visibleCols-item {
    display: flex;

    .ellipsis {
      margin-left: 10px;
      color: #409eff;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
