<template>
  <div
    class="rd-dialog-select"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose"
  >
    <div
      v-if="multiple && getInputValue"
      class="rd-dialog-select__tags"
      :class="selectDisabled ? 'is-disabled tags-disabled' : ''"
      ref="tags"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
      @mousemove="mouseenter"
    >
      <transition-group @after-leave="resetInputHeight">
        <!-- <template v-if="type === typeMap.props"> -->
        <el-tag
          v-for="(item, index) in value_"
          :key="type === typeMap.props ? item.value : item"
          :closable="closable"
          :size="collapseTagSize"
          type="info"
          @close="deleteTag($event, item, index)"
          disable-transitions
        >
          <span v-if="type === typeMap.props" class="el-select__tags-text">{{
            item.label
          }}</span>
          <span v-else class="el-select__tags-text">{{ item }}</span>
        </el-tag>
        <!-- </template> -->
      </transition-group>
    </div>
    <div v-show="showClose" class="icon-box">
      <i
        class="el-select__caret el-icon-circle-close"
        @mouseenter="mouseenter1"
        @mouseleave="mouseleave1"
        @click="handleClearClick"
      ></i>
    </div>
    <!-- </div> -->
    <el-input
      ref="reference"
      class="deep"
      :value="getInputValue"
      :disabled="selectDisabled"
      :readonly="true"
      :placeholder="getInputValue ? '' : placeholder"
      :size="selectSize"
      :class="{ 'is-focus': visible }"
      @input="change()"
      @mouseenter.native="mouseenter"
      @mouseleave.native="mouseleave"
      @mousemove.native="mouseenter"
    >
      <el-button
        slot="append"
        class="append-button"
        :disabled="selectDisabled"
        icon="el-icon-search"
        @click="check()"
        >选择</el-button
      >
    </el-input>
    <open-dialog
      ref="openDialog"
      :dialogConfig="dialogConfig"
      :reportConfig="reportConfig"
      :multiple="multiple"
      :rowProps="getRowProps"
      :value="value_"
      :type="type"
      @confirm="openDialogConfirm"
    ></open-dialog>
  </div>
</template>
<script>
import {
  addResizeListener,
  removeResizeListener
} from 'element-ui/src/utils/resize-event';
import OpenDialog from './components/open-dialog.vue';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import { cloneDeep } from 'lodash';

const typeMap = {
  prop: 1, // 存什么值展示什么值
  props: 2 // 存value显示label
};

export default {
  name: 'RdDialogSelect',
  components: {
    OpenDialog
  },
  directives: { Clickoutside },
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    /** 值 */
    value: [String, Number, Array, Object],
    disabled: Boolean,
    placeholder: String,
    clearable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: String,
    /** 匹配关系配置 存value显示label */
    rowProps: {
      type: Object
    },
    /** dialog 配置 */
    dialogConfig: {
      type: Object
    },
    /** rd-report 配置 */
    reportConfig: {
      type: Object,
      default: () => {
        return {};
      }
    },
    beforeOpen: {
      type: Function
    },
    /** 为rd-table特殊添加的，正常使用过程中是不需要的 */
    rowData: {
      type: Object
    },
    /** 为rd-table特殊添加的，正常使用过程中是不需要的 */
    column: {
      type: Object
    },
    /** 为rd-table特殊添加的，正常使用过程中是不需要的 */
    index: {
      type: Number
    }
  },
  data() {
    return {
      typeMap: typeMap,
      value_: null,
      selected: [], // 选中的行
      initialInputHeight: 0,
      /** 是否focus状态 */
      visible: false,
      /** 是否进入 */
      inputHovering: false,
      inputHovering1: false
    };
  },
  computed: {
    /** 获取input的值 */
    getInputValue() {
      let value = '';
      if (this.multiple) {
        if (Array.isArray(this.value_)) {
          value = this.value_.join('');
        }
      } else {
        value = (this.value_ || {}).label || null;
      }
      return value;
    },
    /** input组件是否禁用 */
    selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    /** input组件的大小 */
    selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    /** tag的大小 */
    collapseTagSize() {
      return ['small', 'mini'].indexOf(this.selectSize) > -1 ? 'mini' : 'small';
    },
    /** tag是否可以关闭 */
    closable() {
      return this.selectDisabled ? false : true;
    },
    /** 是否显close闭图标 */
    showClose() {
      let hasValue = false;
      if (this.multiple) {
        if (Array.isArray(this.value_) && this.value_.length > 0) {
          hasValue = true;
        }
      } else {
        if (
          this.value_ &&
          this.value_.value !== undefined &&
          this.value_.value !== null &&
          this.value_.value !== ''
        ) {
          hasValue = true;
        }
      }
      let criteria =
        this.clearable &&
        !this.selectDisabled &&
        this.inputHovering &&
        hasValue;
      return criteria;
    },

    /** 组件类型 */
    type() {
      return typeMap.props;
    },
    /** 匹配关系 */
    getRowProps() {
      return {
        ...this.rowProps
      };
    }
  },
  mounted() {
    addResizeListener(this.$el, this.handleResize);
    const reference = this.$refs.reference;
    if (reference && reference.$el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28
      };
      const input = reference.$el.querySelector('input');
      this.initialInputHeight =
        input.getBoundingClientRect().height || sizeMap[this.selectSize];
    }
  },
  beforeDestroy() {
    if (this.$el && this.handleResize) {
      removeResizeListener(this.$el, this.handleResize);
    }
  },
  methods: {
    /** 处理数据 */
    initValue(value) {
      // 这个地方不光要解析value赋值给value_，还要解析出来selected需要的数据，因为多选删除的时候需要使用selected
      // if (this.type === this.typeMap.props) {
      this.value_ = value;
      if (this.multiple) {
        this.selected = cloneDeep(value || []).map((ele) => {
          return {
            [this.getRowProps.value]: ele.value,
            [this.getRowProps.label]: ele.label
          };
        });
      } else {
        this.selected = [
          {
            [this.getRowProps.value]: (value || {}).value,
            [this.getRowProps.label]: (value || {}).label
          }
        ];
      }
    },

    /** 选择按钮点击事件 */
    check() {
      let flag = true;
      if (this.beforeOpen) {
        let params = null;
        if (this.rowData) {
          params = {
            row: this.rowData,
            column: this.column,
            value: this.value_,
            index: this.index
          };
        }
        flag = this.beforeOpen(params);
      }
      if (flag !== false) {
        this.$refs.openDialog.open();
      }
    },

    /** 弹窗确认事件  */
    openDialogConfirm(rows = []) {
      /**
       * 这里现在的处理逻辑为单选时直接替换，多选时选择的值会直接push到原有的value中而不是直接覆盖原有的value，如果选择的值存在于value中，替换掉value的值
       * 抛出给外面的事件时要抛出全量的value数据和row数据
       */
      let value = null;
      let rows_ = cloneDeep(rows);
      // if (this.type === this.typeMap.props) {
      // 多选时只管数据新增，不管删除
      if (this.multiple) {
        value = cloneDeep(this.value_) || [];
        rows_ = cloneDeep(this.selected);
        rows.forEach((ele) => {
          let index = this.selected.findIndex((e) => {
            return e[this.getRowProps.value] === ele[this.getRowProps.value];
          });

          if (index === -1) {
            value.push({
              value: ele[this.getRowProps.value] || '',
              label: ele[this.getRowProps.label] || ''
            });
            rows_.push(ele);
          } else {
            // 因为回显时自己组装的selected数据字段可能是不完整的，所以这里如果存在重复数据时，需要替换到原来不完整的数据
            rows_[index] = ele;
          }
        });
      } else {
        if (rows.length > 0) {
          value = {
            value: (rows[0] || {})[this.getRowProps.value],
            label: (rows[0] || {})[this.getRowProps.label]
          };
        } else {
          value = null;
        }
      }
      this.$emit('input', value);
      this.emitChange(value, rows_);
      this.visible = false;
    },

    /** 进入事件 */
    mouseenter() {
      this.inputHovering = true;
    },

    /** 退出事件 */
    mouseleave() {
      setTimeout(() => {
        if (!this.inputHovering1) {
          this.inputHovering = false;
        }
      }, 10);
    },

    /** 进入事件 */
    mouseenter1() {
      this.inputHovering1 = true;
    },

    /** 退出事件 */
    mouseleave1() {
      setTimeout(() => {
        this.inputHovering1 = false;
        this.inputHovering = false;
      }, 10);
    },

    /** 处理组件大小改变事件 */
    handleResize() {
      if (this.multiple) this.resetInputHeight();
    },

    /** 重新设置input组件高度 */
    resetInputHeight() {
      this.$nextTick(() => {
        if (!this.$refs.reference) return;
        let inputChildNodes = this.$refs.reference.$el.childNodes;
        let input = [].filter.call(
          inputChildNodes,
          (item) => item.tagName === 'INPUT'
        )[0];
        const tags = this.$refs.tags;
        const sizeInMap = this.initialInputHeight || 40;
        let length = 0;
        if (this.multiple) {
          if (this.value_ && this.value_.length > 0) {
            length = this.value_.length;
          }
        }
        let height = null;
        if (length === 0) {
          height = sizeInMap + 'px';
        } else {
          let tgasH = null;
          if (tags) {
            tgasH = tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0);
          } else {
            tgasH = 0;
          }
          height = Math.max(tgasH, sizeInMap) + 'px';
        }
        input.style.height = height;
        // length === 0
        //   ? sizeInMap + 'px'
        //   : Math.max(
        //       tags
        //         ? tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0)
        //         : 0,
        //       sizeInMap
        //     ) + 'px';
        // if (this.visible && this.emptyText !== false) {
        //   this.broadcast('ElSelectDropdown', 'updatePopper');
        // }
      });
    },

    /** 点击最外层div设置input的选中状态 */
    toggleMenu() {
      if (!this.selectDisabled) {
        (this.$refs.input || this.$refs.reference).focus();
      }
    },

    /** 关闭选中状态 */
    handleClose() {
      this.visible = false;
    },

    /** close按钮点击事件 */
    handleClearClick(event) {
      this.deleteSelected(event);
    },

    /** 处理清除事件 */
    deleteSelected(event) {
      event.stopPropagation();
      let rows = [];
      let value = null;
      if (this.multiple) {
        value = [];
      } else {
        value = null;
      }
      this.$emit('input', value);
      this.emitChange(value, rows);
      this.visible = false;
      this.$emit('clear');
    },

    /** 抛出change事件 */
    emitChange(val, rows) {
      // 内部不修改数据，让外部处理，内部只作为接收
      this.$emit('change', val, rows);
    },

    /** tag标签的删除事件 */
    deleteTag(event, tag, index) {
      if (index > -1 && !this.selectDisabled) {
        let value = cloneDeep(this.value_);
        value.splice(index, 1);
        let rows = cloneDeep(this.selected);
        rows.splice(index, 1);
        this.$emit('input', value);
        this.emitChange(value, rows);
        this.$emit('remove-tag', tag.value);
      }
      event.stopPropagation();
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (this.multiple) {
          this.resetInputHeight();
        }
        this.initValue(newVal);
      },
      deep: true,
      immediate: true
    },
    selectDisabled() {
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.rd-dialog-select {
  position: relative;
  width: 100%;
  height: fit-content;

  $btnWidth: 60px;

  .el-input.is-focus .el-input__inner {
    border-color: #409eff;
  }

  &__tags {
    position: absolute;
    width: calc(100% - 63px);
    line-height: normal;
    white-space: normal;
    z-index: 1;
    top: 50%;
    left: 1px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background-color: #fff;
    padding-right: 20px;
    box-sizing: border-box;

    .el-tag {
      box-sizing: border-box;
      border-color: transparent;
      margin: 2px 0 2px 6px;
      background-color: #f0f2f5;
    }

    .el-tag__close.el-icon-close {
      background-color: #c0c4cc;
      right: -7px;
      top: -1px;
      color: #ffffff;
    }

    .el-tag.el-tag--info .el-tag__close {
      color: #909399;
    }

    .el-tag__close.el-icon-close::before {
      display: block;
      transform: translate(0, 0.5px);
    }

    .el-tag.el-tag--info .el-tag__close:hover {
      color: #ffffff;
      background-color: #909399;
    }

    .el-tag.el-tag--info {
      background-color: #f4f4f5;
      border-color: #e9e9eb;
      color: #909399;
    }
  }

  .tags-disabled {
    background-color: #f5f7fa;
    cursor: not-allowed;
    .el-tag--info {
      color: #c0c4cc;
    }
  }

  // &__value {
  //   position: absolute;
  //   width: calc(100% - 61px);
  //   height: 100%;
  //   line-height: normal;
  //   white-space: normal;
  //   z-index: 1;
  //   display: flex;

  // .value-box {
  //   flex: 1;
  //   display: flex;
  //   align-items: center;
  // }

  .icon-box {
    position: absolute;
    z-index: 2;
    right: $btnWidth + 10px;
    width: 10px;
    height: 100%;
    display: flex;
    justify-items: center;
    align-items: center;

    .el-select__caret {
      color: #c0c4cc;
      font-size: 14px;
      transition: transform 0.3s;
      transform: rotateZ(180deg);
      cursor: pointer;
    }
  }
  // }

  .el-input-group__append {
    .append-button {
      width: $btnWidth;
      padding: 0;
      height: 30px;

      &.is-disabled:hover {
        border-color: transparent;
        background-color: transparent;
        color: inherit;
      }
    }
  }
}
</style>
