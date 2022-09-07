<template>
  <!-- Text 文本类型 -->
  <div v-if="type === 'text'" class="rd-table-column" :style="getTextStyle">
    <el-tooltip v-if="column.ellipsis" placement="top">
      <div slot="content" class="tooltip-content">{{ formatValue }}</div>
      <div class="rd-ellipsis" @click="click">{{ formatValue }}</div>
    </el-tooltip>
    <span v-else @click="click">{{ formatValue }}</span>
  </div>
  <!-- Input 输入框 -->
  <div v-else-if="type === 'input'" class="rd-table-column">
    <template v-if="readonly">
      <span>{{ value }}</span>
    </template>
    <el-input
      v-else
      :value="value"
      v-bind="props"
      :disabled="isDisabled"
      size="small"
      clearable
      @input="change"
    />
  </div>
  <!-- InputNumber 计数器 -->
  <div v-else-if="type === 'inputNumber'" class="rd-table-column">
    <template v-if="readonly">
      <span>{{ value }}</span>
    </template>
    <el-input-number
      v-else
      :value="value"
      v-bind="props"
      :disabled="isDisabled"
      size="small"
      :min="props.min ? props.min : 0"
      class="row-full"
      @change="change"
    />
  </div>
  <!-- Select 选择器 -->
  <div v-else-if="type === 'select'" class="rd-table-column">
    <template v-if="readonly">
      <span>{{ getSelectLabel }}</span>
    </template>
    <el-select
      v-else
      :value="value"
      v-bind="props"
      :disabled="isDisabled"
      size="small"
      clearable
      class="row-full"
      @change="change"
    >
      <el-option
        v-for="(item, index) in getDropList"
        :key="index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
  <!-- Checkbox 多选框 -->
  <div v-else-if="type === 'checkbox'" class="rd-table-column">
    <el-checkbox
      :value="value"
      v-bind="props"
      :disabled="readonly || isDisabled"
      @change="change"
    />
  </div>
  <!-- Switch 开关 -->
  <div v-else-if="type === 'switch'" class="rd-table-column f-center">
    <el-switch
      :value="value"
      v-bind="props"
      activeText=""
      inactiveText=""
      :disabled="readonly || isDisabled"
      @change="change"
    />
    <span v-if="switchText" class="switchText">{{ switchText }}</span>
  </div>
  <!-- Image 图片 -->
  <div v-else-if="type === 'image'" class="rd-table-column">
    <el-image
      :preview-src-list="[formatValue]"
      v-bind="props"
      :style="getImgStyle"
      :src="formatValue"
      @click="click"
    >
      <div slot="error" class="image-slot">
        <el-image
          v-if="props.error"
          :src="props.error"
          class="image-error"
        ></el-image>
        <span v-else>暂无图片</span>
      </div>
    </el-image>
  </div>
  <!-- Html Html片段 -->
  <div v-else-if="type === 'html'" class="rd-table-column">
    <div v-html="formatValue" v-bind="props"></div>
  </div>
  <!-- Link 链接 -->
  <div v-else-if="type === 'link'" class="rd-table-column">
    <div
      class="link"
      :class="{ disabled: readonly || isDisabled }"
      @click="click"
    >
      {{ formatValue }}
    </div>
  </div>
  <!-- DialogSelect 弹窗选择器 -->
  <div v-else-if="type === 'dialogSelect'" class="rd-table-column">
    <template v-if="readonly">
      <span>{{ value }}</span>
    </template>
    <rd-dialog-select
      v-else
      :value="value"
      v-bind="props"
      :reportConfig="reportConfig"
      :disabled="isDisabled"
      size="small"
      clearable
      class="row-full"
      :rowData="row"
      :column="scope.column"
      :index="scope.$index"
      @change="dialogSelectChange"
    >
    </rd-dialog-select>
  </div>
  <!-- Operation 操作列 -->
  <div v-else-if="type === 'operation'" class="rd-table-column">
    <column-operation
      :list="operations"
      :showMax="column.showMax"
      @click="operationClick"
    />
  </div>
</template>
<script>
import { cloneDeep } from 'lodash';
import formatterJS from './formatter.js';

import columnOperation from './columnOperation.vue';

export default {
  components: {
    columnOperation
  },
  props: {
    /** 列配置信息 */
    column: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /** 当前列插槽的信息 */
    scope: {
      type: Object,
      default() {
        return {};
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
    return {};
  },
  computed: {
    /** 列类型 */
    type() {
      return this.column.type || '';
    },
    /** 列字段 */
    prop() {
      return this.column.prop || '';
    },
    /** 是否只读 */
    readonly() {
      const { props } = this.column;
      const { readonly = false } = props || {};
      return readonly;
    },
    /** 行数据对象 */
    row() {
      return this.scope.row || {};
    },
    /** 原数据 */
    value() {
      let val = this.row[this.prop];
      // 由于inputNumber的特殊性，这个地方需要进行值校验与转换
      if (this.type === 'inputNumber') {
        if (!val) {
          val = 0;
          this.change(val);
        } else if (Object.prototype.toString.call(val) === '[object String]') {
          try {
            val = parseInt(val, 10);
            this.change(val);
          } catch (error) {
            console.log(error);
          }
        }
      }
      return val;
    },
    /** 列格式化之后的数据 作为显示的数据，底层的原数据还是不变 */
    formatValue() {
      return this.formatter(this.value);
    },
    /** 获取禁用状态 重新实现disabled，方便通过数据去控制禁用状态 */
    isDisabled() {
      const { row, column, $index } = this.scope;
      let value = this.value;
      const { props } = this.column;
      const { disabled = false } = props || {};

      if (typeof disabled === 'function') {
        return disabled(row, column, value, $index);
      } else {
        return disabled;
      }
    },
    /** 组件属性值 */
    props() {
      let { type, props, label } = this.column;
      let placeholder = '';
      if (type === 'input') {
        placeholder = `请输入${label}`;
      } else if (type === 'select') {
        placeholder = `请选择${label}`;
      }
      return {
        placeholder,
        ...props
      };
    },
    /** switch 开关文案 */
    switchText() {
      const {
        activeText,
        inactiveText,
        activeValue = true,
        inactiveValue = false
      } = this.props;
      let textMap = {
        [activeValue]: activeText,
        [inactiveValue]: inactiveText
      };

      // 有配置文案信息，则获取
      if (activeText && inactiveText) {
        return textMap[this.value];
      }
      return '';
    },
    /** 当前列可用操作项，operation按钮的取值逻辑： 先取行数据里面的，再取列配置的公共数据 */
    operations() {
      let { operations = [] } = this.column;
      operations = cloneDeep(this.value || operations || []);
      return this.formatter(operations);
    },
    /** 获取文本列style */
    getTextStyle() {
      let { ellipsis } = this.column;
      if (ellipsis) {
        return {
          '--ellipsis': ellipsis
        };
      } else {
        return {};
      }
    },
    /** 获取image样式 */
    getImgStyle() {
      let { width = '80px', height } = this.props;
      return {
        width,
        height
      };
    },
    /** 解析下拉值 */
    getDropList() {
      if (this.dropList[this.prop]) {
        if (typeof this.dropList[this.prop] === 'function') {
          let { row, column, $index } = this.scope;
          return this.dropList[this.prop](row, column, this.value, $index);
        } else {
          return this.dropList[this.prop];
        }
        // if (Array.isArray(this.dropList[this.prop])) {
        //   return this.dropList[this.prop];
        // } else {
        //   let { row, column, $index } = this.scope;
        //   return this.dropList[this.prop](row, column, this.value, $index);
        // }
      }
      return [];
    },
    /** 获取只读模式下select的label */
    getSelectLabel() {
      let ary = this.getDropList || [];
      let label = [];
      ary.forEach((ele) => {
        if (Array.isArray(this.value)) {
          if (this.value.includes(ele.value)) {
            label.push(ele.label);
          }
        } else if (ele.value === this.value) {
          label.push(ele.label);
        }
      });
      return label.join('，');
    },

    /** dialogSelect 配置 */
    reportConfig() {
      let { reportConfig } = this.props;

      let config = reportConfig;
      if (typeof reportConfig === 'function') {
        let { row, column, $index } = this.scope;
        config = reportConfig(row, column, this.value, $index);
      }
      return config;
    }
  },
  methods: {
    /** 格式化数据 */
    formatter(value) {
      let { row, column, $index } = this.scope;
      const { formatter_c, formatterParams } = this.column;
      if (formatter_c) {
        if (typeof formatter_c === 'function') {
          return formatter_c(row, column, value, $index);
        } else {
          return formatterJS[formatter_c](value, ...formatterParams);
        }
      } else {
        return value;
      }
    },
    /** 数据的change事件 */
    change(value) {
      let { $index } = this.scope;
      this.$emit('change', {
        prop: this.prop,
        value: value,
        index: $index,
        row: this.row
      });
    },

    /** dialogSelect的change事件 */
    dialogSelectChange(value, rows) {
      let { $index } = this.scope;
      this.$emit('change', {
        prop: this.prop,
        value: value,
        row: this.row,
        rows,
        index: $index
      });
    },

    /** 链接点击事件 */
    click() {
      let { $index } = this.scope;
      this.$emit('click', {
        type: this.type,
        prop: this.prop,
        value: this.value,
        index: $index,
        row: this.row
      });
    },
    /** 操作按钮点击事件 */
    operationClick(params) {
      let { $index } = this.scope;
      this.$emit('click', {
        type: 'operation',
        prop: this.prop,
        value: this.value,
        index: $index,
        clickItem: params,
        row: this.row
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin ellipsis($line: 1) {
  @if $line == 1 {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  } @else {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: $line;
    overflow: hidden;
  }
}
.rd-table-column {
  .rd-ellipsis {
    $line: var(--ellipsis);
    @include ellipsis($line);
  }

  .row-full {
    width: 100%;
  }

  .switchText {
    margin-left: 5px;
  }

  .link {
    color: rgb(64, 158, 255);
    text-decoration: none;
    cursor: pointer;
  }

  .dialogSelect {
    position: relative;
    .el-button {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .disabled {
    cursor: not-allowed;
  }

  .table-column-operation {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .dropdown-btn {
      margin-left: 10px;
    }
  }

  .image-slot {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .image-error {
      width: 100%;
    }
  }
}
.tooltip-content {
  max-width: 505px;
  max-height: 400px;
  overflow-y: auto;
  padding: 3px 0;
}
</style>
