<template>
  <div class="table-column-operation">
    <el-button
      v-for="(item, index) in operationList"
      :key="index"
      v-bind="item.props"
      @click="operationClick(item)"
    >
      {{ item.label }}
    </el-button>
    <!-- 下拉操作项 -->
    <el-dropdown v-if="dropdownList.length" placement="bottom" size="mini">
      <!-- <el-button type="text" size="mini" class="dropdown-btn">
        更多
      </el-button> -->
      <i class="el-icon-arrow-down el-icon--right"></i>
      <template v-slot:dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, index) in dropdownList"
            :key="index"
            v-bind="item"
            class="dropdown-menu-item"
          >
            <el-button
              v-bind="item.props"
              :style="{
                marginBottom: index < dropdownList.length - 1 ? '5px' : 0
              }"
              class="dropdown-menu-btn"
              @click.prevent="operationClick(item)"
            >
              {{ item.label }}
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  props: {
    /** 操作项列表 */
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /** 最大展示数 */
    showMax: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {};
  },
  computed: {
    /** 当前列可用操作项，operation按钮的取值逻辑： 先取行数据里面的，再取列配置的公共数据 */
    operations() {
      let operations = this.list || [];

      let _operations = operations.map((ele) => {
        let { props = {} } = ele;
        let { type = 'text', size = 'mini' } = props;
        return {
          ...ele,
          props: {
            type,
            size,
            ...props
          }
        };
      });
      return _operations || [];
    },
    /** 展示的操作项 */
    operationList() {
      if (this.operations.length > this.showMax) {
        return this.operations.slice(0, this.showMax);
      } else {
        return this.operations;
      }
    },
    /** 下拉框中的操作项 */
    dropdownList() {
      if (this.operations.length > this.showMax) {
        return this.operations.slice(this.showMax);
      } else {
        return [];
      }
    }
  },
  methods: {
    /** 点击操作项 */
    operationClick(item) {
      let { label, prop } = item;
      this.$emit('click', { label, prop });
    }
  }
};
</script>
<style lang="scss" scoped>
.dropdown-menu-item {
  padding: 0 !important;
}

.dropdown-menu-btn {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
