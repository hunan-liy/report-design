<template>
  <div
    class="heade-label"
    :class="{ 'heade-label-sort': column.sortable }"
    @click.stop
  >
    <template v-if="column.filters && column.filters.length > 0">
      <el-popover
        placement="bottom"
        trigger="click"
        popper-class="rd-table-filters"
      >
        <filters
          :filteredValue="column.filteredValue"
          :filterSearch="column.filterSearch"
          :filters="column.filters"
          :column="scope.column"
          :index="index"
          @filter="columnFilter"
        ></filters>
        <template slot="reference">
          <slot v-if="column.headerSlotName" v-bind="scope" />
          <template v-else>
            <span>{{ scope.column.label }}</span>
          </template>
        </template>
      </el-popover>
    </template>

    <template v-else>
      <slot v-if="column.headerSlotName" v-bind="scope" />
      <template v-else
        ><span>{{ scope.column.label }}</span></template
      >
    </template>
  </div>
</template>
<script>
import Filters from './filters.vue';
export default {
  components: {
    Filters
  },
  props: {
    /** 列信息 */
    column: {
      type: Object
    },
    /** 列下标 */
    index: {
      type: Number
    },
    /** 头插槽数据 */
    scope: {
      type: Object
    }
  },
  methods: {
    columnFilter(params) {
      this.$emit('filter', params);
    }
  }
};
</script>
<style lang="scss" scoped>
.heade-label {
  position: relative;
  flex: 1;
  padding: 5px 10px;

  // 自定义过滤数据功能，所以这个地方隐藏自带的功能按钮
  .el-table__column-filter-trigger {
    display: none;
  }

  .el-popover__reference {
    cursor: pointer;
  }
}

.heade-label-sort {
  padding-left: 20px;
  padding-right: 0;
}
</style>
