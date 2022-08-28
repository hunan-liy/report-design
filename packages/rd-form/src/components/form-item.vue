<template>
  <!-- Text 文本框 -->
  <div
    v-if="formItem.type === 'text' || !formItem.type"
    class="el-form-item-content"
  >
    {{ forms_[prop] }}
  </div>
  <!-- Radio 单选框 -->
  <div v-else-if="formItem.type === 'radio'" class="el-form-item-content">
    <template v-if="readonly">
      <span>{{ getReadonlyLabel }}</span>
    </template>
    <el-radio-group
      v-else
      v-model="forms_[prop]"
      v-bind="formProps"
      @change="change()"
    >
      <el-radio
        v-for="item in getDropList"
        v-bind="item"
        :label="item.value"
        :key="item.value"
        >{{ item.label }}</el-radio
      >
    </el-radio-group>
  </div>
  <!-- Checkbox 多选框 -->
  <div
    v-else-if="formItem.type === 'checkbox'"
    class="el-form-item-content padding"
  >
    <template v-if="readonly">
      <span>{{ getReadonlyLabel }}</span>
    </template>
    <el-checkbox-group
      v-else
      v-model="forms_[prop]"
      v-bind="formProps"
      @change="change()"
    >
      <el-checkbox
        v-for="item in getDropList"
        :label="item.value"
        :key="item.value"
        >{{ item.label }}</el-checkbox
      >
    </el-checkbox-group>
  </div>
  <!-- Input 输入框 -->
  <div
    v-else-if="formItem.type === 'input'"
    class="el-form-item-content padding0"
  >
    <template v-if="readonly">
      <span class="padding">{{ forms_[prop] }}</span>
    </template>
    <el-input
      v-else
      v-model="forms_[prop]"
      v-bind="formProps"
      class="deep"
      :readonly="readonly"
      @input="change()"
    ></el-input>
  </div>
  <!-- InputSuffixes 使用append插槽的输入框 -->
  <div
    v-else-if="formItem.type === 'inputSuffixes'"
    class="el-form-item-content padding0"
  >
    <template v-if="readonly">
      <span class="padding">{{ forms_[prop] }} {{ formItem.suffixes }}</span>
    </template>
    <el-input
      v-else
      v-model="forms_[prop]"
      v-bind="formProps"
      class="deep"
      @input="change()"
    >
      <template slot="append">{{ formItem.suffixes }}</template>
    </el-input>
  </div>
  <!-- InputNumber 计数器 -->
  <div
    v-else-if="formItem.type === 'inputNumber'"
    class="el-form-item-content padding0"
  >
    <template v-if="readonly">
      <span class="padding">{{ forms_[prop] }}</span>
    </template>
    <el-input-number
      v-else
      v-model="forms_[prop]"
      v-bind="formProps"
      class="input-number"
      @input="change()"
    ></el-input-number>
  </div>
  <!-- Select 选择器 -->
  <div
    v-else-if="formItem.type === 'select'"
    class="el-form-item-content padding0"
  >
    <template v-if="readonly">
      <span class="padding">{{ getReadonlyLabel }}</span>
    </template>
    <el-select
      v-else
      v-model="forms_[prop]"
      v-bind="formProps"
      class="deep"
      @change="change()"
    >
      <el-option
        v-for="item in getDropList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
  <!-- Cascader 级联选择器 -->
  <div
    v-else-if="formItem.type === 'cascader'"
    class="el-form-item-content padding0"
  >
    <template v-if="readonly">
      <span class="padding">{{ getCascaderLabel }}</span>
    </template>
    <el-cascader
      v-else
      v-model="forms_[prop]"
      v-bind="formProps"
      class="deep"
      :options="getDropList"
      @change="change()"
    ></el-cascader>
  </div>
  <!-- Switch 开关 -->
  <div v-else-if="formItem.type === 'switch'" class="el-form-item-content">
    <el-switch
      v-model="forms_[prop]"
      v-bind="formProps"
      :disabled="readonly || isDisabled"
      @change="change()"
    ></el-switch>
  </div>
  <!-- Slider 滑块 -->
  <div
    v-else-if="formItem.type === 'slider'"
    class="el-form-item-content padding"
  >
    <template v-if="readonly">
      <span class="padding">{{ forms_[prop] }}</span>
    </template>
    <el-slider
      v-else
      v-model="forms_[prop]"
      v-bind="formProps"
      class="deep"
      @change="change()"
    ></el-slider>
  </div>
  <!-- TimePicker 时间选择器 -->
  <div
    v-else-if="formItem.type === 'timePicker'"
    class="el-form-item-content padding0"
  >
    <el-time-picker
      v-model="forms_[prop]"
      v-bind="formProps"
      class="deep"
      :readonly="readonly"
      @change="change()"
    >
    </el-time-picker>
  </div>
  <!-- DatePicker 日期选择器 -->
  <div
    v-else-if="formItem.type === 'datePicker'"
    class="el-form-item-content padding0 deep"
  >
    <el-date-picker
      v-model="forms_[prop]"
      v-bind="formProps"
      :readonly="readonly"
      @change="change()"
    >
    </el-date-picker>
  </div>
  <!-- Rate 评分 -->
  <div v-else-if="formItem.type === 'rate'" class="el-form-item-content">
    <el-rate
      v-model="forms_[prop]"
      v-bind="formProps"
      :disabled="readonly || isDisabled"
      @change="change()"
    ></el-rate>
  </div>
  <!-- ColorPicker 颜色选择器 -->
  <div
    v-else-if="formItem.type === 'colorPicker'"
    class="el-form-item-content padding"
  >
    <el-color-picker
      v-model="forms_[prop]"
      v-bind="formProps"
      :disabled="readonly || isDisabled"
      @change="change()"
    ></el-color-picker>
  </div>
  <!-- Transfer 穿梭框 -->
  <el-transfer
    v-else-if="formItem.type === 'transfer'"
    v-model="forms_[prop]"
    v-bind="formProps"
    @change="change()"
  ></el-transfer>
  <!-- SelectDialog 业务对话框 -->
  <div
    v-else-if="formItem.type === 'selectDialog'"
    class="el-form-item-content padding0"
  >
    <template v-if="readonly">
      <span class="padding">{{ getSelectDialogLabel }}</span>
    </template>
    <rd-select-dialog
      v-else
      v-model="forms_[prop]"
      v-bind="formProps"
      class="deep"
      @change="selectDialogChange"
    >
    </rd-select-dialog>
  </div>
  <!-- Upload 上传组件 -->
  <!-- <div
    v-else-if="formItem.type === 'upload'"
    class="el-form-item-content padding"
  >
    <el-file-upload
      v-model="forms_[prop]"
      v-bind="formProps"
      :class="{ hasValue: forms_[prop] && forms_[prop].length > 0 }"
      :disabled="readonly || isDisabled"
      @change="change()"
    ></el-file-upload>
  </div> -->
  <!-- slot 插槽 -->
  <div
    v-else-if="formItem.type === 'slot'"
    class="el-form-item-content padding0"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    },
    formItem: {
      type: Object,
      default: () => {
        return {};
      }
    },
    forms: {
      type: Object,
      default: () => {
        return {};
      }
    },
    dropList: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      forms_: {}
    };
  },
  computed: {
    prop() {
      let { prop } = this.formItem;
      return prop || null;
    },
    formProps() {
      let { props } = this.formItem;
      return props || {};
    },
    readonly() {
      let { readonly } = this.config;
      return readonly || this.formProps.readonly;
    },
    isDisabled() {
      const { disabled = false } = this.formProps || {};
      return disabled;
    },

    /** 解析下拉值 */
    getDropList() {
      if (this.dropList[this.prop]) {
        if (Array.isArray(this.dropList[this.prop])) {
          return this.dropList[this.prop];
        } else {
          return this.dropList[this.prop](
            this.forms_[this.prop],
            this.formItem
          );
        }
      }
      return [];
    },

    /** 获取只读模式下的label ----- start */
    getReadonlyLabel() {
      let ary = this.dropList[this.prop] || [];
      let label = [];
      let value = this.forms_[this.prop];
      ary.forEach((ele) => {
        if (Array.isArray(value)) {
          if (value.includes(ele.value)) {
            label.push(ele.label);
          }
        } else if (ele.value === this.forms_[this.prop]) {
          label.push(ele.label);
        }
      });
      return label.join('，');
    },

    getCascaderLabel() {
      let ary = this.dropList[this.prop] || [];
      let label = [];
      let value = this.forms_[this.prop];
      let flag = false;
      value.forEach((ele) => {
        if (Array.isArray(ele)) {
          flag = true;
          let lab = [];
          this.getRecursionLabel(ele, ary, lab);
          label.push(lab.join('/'));
        }
      });
      if (!flag) {
        let lab = [];
        this.getRecursionLabel(value, ary, lab);
        label.push(lab.join('/'));
      }
      return label.join('，');
    },

    getSelectDialogLabel() {
      console.log(111);
      let label = '';
      let value = this.forms_[this.prop];
      if (typeof value === 'object') {
        label = value.label;
      } else {
        label = value;
      }
      return label;
    }
    /** 获取只读模式下的label ----- end */
  },
  methods: {
    change() {
      this.$emit('change', {
        prop: this.prop,
        value: this.forms_[this.prop]
      });
    },

    /** selectDialog的change事件 */
    selectDialogChange(value, rows) {
      this.$emit('change', {
        prop: this.prop,
        value: this.forms_[this.prop],
        rows
      });
    },

    check() {
      this.$refs.openDialog.open(this.forms_, this.forms_[this.prop]);
    },

    openDialogChange(values) {
      let data = this.forms_;
      Object.keys(values).forEach((prop) => {
        if (data[prop] !== values[prop]) {
          this.$emit('change', {
            prop: prop,
            value: values[prop]
          });
        }
      });
    },

    getRecursionLabel(values, list, label) {
      let value = values[0];
      list.forEach((ele) => {
        if (ele.value === value) {
          label.push(ele.label);
          if (ele.children && ele.children.length > 0) {
            if (values.length > 1) {
              let ary = values.splice(1);
              this.getRecursionLabel(ary, ele.children, label);
            }
          }
        }
      });
    }
  },
  watch: {
    forms: {
      handler(newVal) {
        this.forms_ = newVal;
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  line-height: 20px;
  padding: 5px 15px;
  word-wrap: break-word;
  word-break: break-all;
}

.el-radio {
  line-height: 20px;
}

.padding {
  padding: 0 15px;
}

.padding0 {
  padding: 0;
}

.hasValue {
  padding: 3px 0;
}

.form-check-btn {
  position: absolute;
  top: 1px;
  right: 1px;
  padding: 11px 10px;
}

// ::v-deep {

.input-number,
.el-select,
.el-cascader,
.el-slider {
  width: 100%;
}

.el-date-editor {
  width: 100% !important;
}

.el-transfer {
  text-align: left;
}

/** size 为small下的样式调整 start */
// .el-input--small,
// .el-input-number--small,
// .el-select--small,
// .el-cascader--small {
//   display: block;
// }

.el-input--small input {
  display: block;
}

.el-button--small {
  padding: 8px 13px;
}

/** size 为small下的样式调整 end */
// }
</style>
