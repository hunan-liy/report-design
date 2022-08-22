<template>
  <div class="filters">
    <div v-if="filterSearch" class="search">
      <el-input
        v-model="searchValue"
        class="search-value"
        size="mini"
        placeholder="请输入搜索"
      ></el-input>
    </div>
    <div class="body">
      <div class="checkAll">
        <el-checkbox
          :value="checkAll"
          :indeterminate="isIndeterminate"
          @change="checkAllChange"
          >选择全部</el-checkbox
        >
      </div>
      <div class="filters-list">
        <el-checkbox
          v-for="(item, index) in filtersList"
          :value="item.selected"
          :key="index"
          :label="item.value"
          :title="item.label"
          @change="itemChange(arguments[0], item.index)"
          >{{ item.label }}</el-checkbox
        >
      </div>
    </div>

    <div class="fotter">
      <el-button type="text" size="mini" @click="doFilter">筛选</el-button>
      <el-button type="text" size="mini" @click="reSet">重置</el-button>
    </div>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash';
export default {
  props: {
    /** 过滤的值（现在代码逻辑这里只是初始值） */
    filteredValue: {
      type: Array
    },
    /** 过滤可筛选的列表 */
    filters: {
      type: Array
    },
    /** 列的数据 */
    column: {
      type: Object
    },
    /** 列的index */
    index: {
      type: Number
    },
    /** 是否开启搜索功能 */
    filterSearch: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      filteredValue_: [],
      filters_: [],
      searchValue: ''
    };
  },
  computed: {
    /** 当前显示的列表 */
    filtersList() {
      return this.filters_.filter((ele) => {
        return (
          ele.label && ele.label.toString().indexOf(this.searchValue) !== -1
        );
      });
    },
    /** 当前显示的列表是否全选中了 */
    checkAll() {
      let flag = true;
      this.filtersList.forEach((ele) => {
        if (!ele.selected) {
          flag = false;
        }
      });
      return flag;
    },
    /** 当前显示的列表是否半选中 */
    isIndeterminate() {
      let flag = false;
      if (!this.checkAll && this.getFilteredValue().length > 0) {
        flag = true;
      }
      return flag;
    }
  },
  mounted() {},
  methods: {
    handleFilteredValue(data) {
      this.filteredValue_ = cloneDeep(data);
      // if (this.filteredValue_.length === this.filtersList.length) {
      //   this.checkAll = true;
      // }
      // 初始化数据选中状态
      if (this.filters_.length > 0) {
        this.filters_.forEach((ele) => {
          let { value } = ele;
          if (this.filteredValue_.indexOf(value) !== -1) {
            ele.selected = true;
          } else {
            ele.selected = false;
          }
        });
      }
      // console.log(12313, this.filteredValue_);
    },

    handleFilters(data) {
      this.filters_ = data.map((ele, index) => {
        let { text: label, value } = ele;
        return {
          label,
          value,
          index,
          selected: false
        };
      });
      // 初始化数据选中状态
      if (this.filteredValue_.length > 0) {
        this.filters_.forEach((ele) => {
          let { value } = ele;
          if (this.filteredValue_.indexOf(value) !== -1) {
            ele.selected = true;
          } else {
            ele.selected = false;
          }
        });
      }
    },

    /** checkbox选择事件 */
    itemChange(value, index) {
      this.filters_[index].selected = value;
    },

    /** 筛选 */
    doFilter() {
      let value = this.getFilteredValue();
      this.$emit('filter', {
        value,
        column: this.column,
        index: this.index
      });
      document.body.click();
    },

    /** 重置 */
    reSet() {
      this.searchValue = '';
      this.checkAllChange(true);
      let value = this.getFilteredValue();
      this.$emit('filter', {
        value,
        column: this.column,
        index: this.index
      });
      document.body.click();
    },

    /** 获取当前列表选中的值 */
    getFilteredValue() {
      return this.filtersList
        .filter((ele) => ele.selected)
        .map((ele) => ele.value);
    },

    /** 选择全部按钮点击事件 */
    checkAllChange(value) {
      this.filters_.forEach((ele) => {
        ele.selected = false;
      });
      if (value) {
        this.filtersList.forEach((ele) => {
          let { index } = ele;
          this.filters_[index].selected = true;
        });
      }
    }
  },
  watch: {
    filteredValue: {
      handler(newVal) {
        this.handleFilteredValue(newVal);
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
    }
  }
};
</script>
<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: column;
  padding: 0 10px;

  * {
    box-sizing: border-box;
  }

  .search {
    padding: 5px 0;
    .search-value {
      width: 100%;
    }
  }

  .body {
    padding: 5px 0;

    .filters-list {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 251px;
      max-height: 350px;
      padding: 5px;
      border: 1px solid #eee;
      overflow: hidden;
      overflow-y: auto;

      .el-checkbox {
        display: flex;
        align-items: center;
        margin-right: 0;

        .el-checkbox__label {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .el-checkbox + .el-checkbox {
        margin-top: 5px;
      }
    }
  }

  .fotter {
    padding: 0 10px;
  }
}
</style>
