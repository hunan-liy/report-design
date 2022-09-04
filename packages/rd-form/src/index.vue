<template>
  <el-form
    :model="forms"
    ref="dataForm"
    v-bind="config_"
    @validate="formValidate"
  >
    <div class="form-wrap">
      <el-row>
        <template v-for="(formItem, index) in formList">
          <el-col
            v-show="!getHidden(formItem)"
            :key="'col' + index"
            v-bind="colConfig(formItem)"
          >
            <template
              v-if="formItem.type === 'slot' && formItem.slotType === 'item'"
            >
              <slot
                :name="formItem.slotName"
                :value="forms[formItem.prop]"
                :formItem="formItem"
                :dropList="getDropList(formItem)"
              />
            </template>
            <template v-else>
              <div class="form-item">
                <el-form-item
                  v-bind="formItem"
                  :label="formItem.label"
                  :prop="formItem.prop"
                >
                  <template slot="label">
                    <div class="form-item-label">
                      <div class="ellipsis" :title="formItem.label">
                        {{ formItem.label }}
                      </div>
                    </div>
                  </template>
                  <form-item
                    :formItem="formItem"
                    :forms="forms"
                    :dropList="dropList"
                    :config="config_"
                    @change="formItemChange"
                  >
                    <template v-if="formItem.type === 'slot'">
                      <slot
                        :name="formItem.slotName"
                        :value="forms[formItem.prop]"
                        :formItem="formItem"
                        :dropList="getDropList(formItem)"
                      />
                    </template>
                  </form-item>
                </el-form-item>
              </div>
            </template>
          </el-col>
        </template>
      </el-row>
    </div>
  </el-form>
</template>
<script>
import { cloneDeep } from 'lodash';
import formItem from './components/form-item.vue';
export default {
  name: 'RdForm',
  components: {
    formItem
  },
  inject: {
    visible: {
      type: Function,
      default: function () {}
    }
  },
  props: {
    /**
     * form表单组件整体配置
     */
    config: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /**
     * 表单元素配置项
     */
    formConfig: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /**
     * 双向绑定的表单值
     */
    value: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /**
     * 表单中下拉项的数据与formConfig配合使用
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
      config_: {},
      formList: [],
      forms: {},
      formsIsChange: false,
      propGroupMap: {}
    };
  },
  computed: {
    visible_() {
      return this.visible && this.visible();
    }
  },
  methods: {
    /** 初始化表单配置 */
    initConfg(data) {
      let data_clone = cloneDeep(data);

      let { labelWidth, isCheckForm = true, size = 'small' } = data_clone;

      if (!labelWidth) {
        labelWidth = '100px';
      }

      this.config_ = {
        labelWidth,
        isCheckForm,
        size,
        ...data_clone
      };
      // console.log(this.config_);
    },

    /**
     * 初始化表单元素配置
     * 1.将obj转为数组
     * 2.初始化部分属性值
     * 3.内置处理部分逻辑
     */
    initFormConfg(data) {
      let data_clone = cloneDeep(data);
      // let formsIsChange = false; // forms是否被修改了
      let configArray = Object.entries(data_clone).map(([prop, ele]) => {
        let {
          type,
          label,
          col,
          slotName,
          propGroup = [],
          hidden,
          props,
          rules = [],
          required
        } = ele;

        // 如果未指定slotName，直接赋值为prop
        if (type === 'slot' && !slotName) {
          slotName = prop;
        }

        // 默认每行展示三个，如果form配置中配置了每行展示几个，优先取form的配置
        if (!col) {
          if (this.config && this.config.col) {
            col = this.config.col;
          } else {
            col = 12;
          }
        }

        // 内置处理placeholder
        let placeholder = '';
        if (!props || (props && !props.placeholder)) {
          let selectType = [
            'select',
            'selectDialog',
            'cascader',
            'timePicker',
            'datePicker'
          ];
          if (type === 'input' || type === 'inputSuffixes') {
            placeholder = `请输入${label}`;
          } else if (selectType.indexOf(type) !== -1) {
            placeholder = `请选择${label}`;
          }
        }

        // 内置处理valueFormat 待优化！！
        let valueFormat;
        if (!props || (props && !props.valueFormat)) {
          let formatType = ['datePicker'];
          if (formatType.indexOf(type) !== -1) {
            valueFormat = 'yyyy-MM-dd';
          }

          let formatType1 = ['timePicker'];
          if (formatType1.indexOf(type) !== -1) {
            valueFormat = 'HH:mm:ss';
          }
        }

        // 内置处理rules，只用写required去控制就行，简化了配置，也兼容通过rules去设置
        if (required && (!rules || rules.length === 0)) {
          // let changeType = ['checkbox', 'timePicker', 'transfer'];
          // if (changeType.indexOf(type) !== -1) {
          //   rules = [
          //     {
          //       required: true,
          //       message: `${label}不能为空`,
          //       trigger: 'change'
          //     }
          //   ];
          // } else {
          rules = [
            { required: true, message: `${label}不能为空`, trigger: 'change' }
          ];
          // }
          // 如果通过内置的方法去处理rules要删除掉required属性，因为el-form组件自己有required属性，会影响到
          delete ele.required;
        }

        // 隐藏的字段不做校验
        if (
          this.getHidden({
            hidden,
            prop
          })
        ) {
          rules = null;
        }

        if (this.forms[prop] === undefined) {
          let value = this.value[prop];
          /**
           * checkbox-group/transfer 比较特殊，如果初始没有值的话checkbox-group/transfer是显示不出来的
           * 而且对于checkbox-group/transfer的rules会在每次noticDataChange直接触发，猜测是因为checkbox-group/transfer的rules的检测是根据指针指向变化来检测的而数据每次都是深拷贝的，这个地方属于bug，待优化
           */
          if (type === 'checkbox' || type === 'transfer') {
            value = [];
          } else {
            value = null;
          }
          this.$set(this.forms, prop, value);
          this.formsIsChange = true;
        }

        // 补全字段和兼容时间控件的范围选择值
        if (propGroup && propGroup.length) {
          this.propGroupMap[prop] = propGroup;
          propGroup.forEach((_prop) => {
            if (this.forms[_prop] === undefined) {
              let value = this.value[_prop];
              /**
               * checkbox-group/transfer 比较特殊，如果初始没有值的话checkbox-group/transfer是显示不出来的
               * 而且对于checkbox-group/transfer的rules会在每次noticDataChange直接触发，猜测是因为checkbox-group/transfer的rules的检测是根据指针指向变化来检测的而数据每次都是深拷贝的，这个地方属于bug，待优化
               */
              if (type === 'checkbox' || type === 'transfer') {
                value = [];
              } else {
                value = null;
              }
              this.$set(this.forms, _prop, value);
              this.formsIsChange = true;
            }
          });
        }

        return {
          slotName,
          ...ele,
          prop,
          col,
          hidden,
          props: {
            placeholder,
            valueFormat,
            clearable: true, // 内置处理clearable，默认为true
            ...props
          },
          rules
        };
      });

      // // 如果在上面的循环中有改动了forms
      // if (formsIsChange) {
      //   this.noticDataChange();
      // }

      this.formList = configArray;
      // console.log('----------------initFormConfg', configArray);
    },

    /**
     * 初始化forms
     */
    initForms(value) {
      // 由于initFormConfg中可能初始化了forms，所以需要合并一下
      let data = Object.assign(this.forms, value);
      this.forms = cloneDeep(data);
      // this.noticDataChange();
      // 如果在上面的循环中有改动了forms
      if (this.formsIsChange) {
        this.formsIsChange = false;
        this.noticDataChange();
        // 抛出初始化完成事件
        this.$emit('initValue', this.getFormData());
      }
      // console.log('---------initForms', this.forms);
    },

    /** 获取col组件的样式 */
    colConfig(item) {
      let col = {};
      if (item.width) {
        let width = item.width;
        if (typeof item.width === 'number') {
          width = item.width + 'px';
        }
        col = {
          style: {
            width: width
          }
        };
      } else {
        col = {
          span: item.col
        };
      }
      return col;
    },

    // 重置表单
    resetFields() {
      let { resetToNull = true } = this.config_;
      // 是否重置为null的状态
      if (resetToNull) {
        // 表单自带的重置功能只会将表单重置到第一次生成的状态，如果生成时forms有值，重置后的表单forms也就是生成时的值，所以采用手动重置办法，清空forms
        this.formList.forEach((ele) => {
          if (ele.propGroup) {
            ele.propGroup.forEach((e) => {
              this.forms[e] = null;
            });
          }
        });

        Object.keys(this.forms).forEach((ele) => {
          let { type } = this.formConfig[ele] || {};
          if (type === 'checkbox' || type === 'transfer') {
            this.forms[ele] = [];
          } else {
            this.forms[ele] = null;
          }
        });
      } else {
        this.$refs.dataForm && this.$refs.dataForm.resetFields();
        Object.keys(this.propGroupMap).forEach((ele) => {
          let propGroup = this.propGroupMap[ele];
          propGroup.forEach((e, i) => {
            if (this.forms[ele] && this.forms[ele].length > 0) {
              this.forms[e] =
                this.forms[ele][i] !== undefined ? this.forms[ele][i] : null;
            } else {
              this.forms[e] = null;
            }
          });
        });
      }

      this.noticDataChange();
      this.$emit('reset', this.getFormData());
      this.$nextTick(() => {
        this.clearValidate();
      });
    },

    // 移除表单项的校验结果
    clearValidate() {
      this.$refs.dataForm && this.$refs.dataForm.clearValidate();
    },

    /**
     * 表单的提交事件
     */
    submitForm() {
      return new Promise((resolve, reject) => {
        if (this.config_.isCheckForm) {
          this.$refs.dataForm.validate((valid) => {
            if (valid) {
              this.$emit('submit', this.getFormData());
              resolve(this.getFormData());
            } else {
              reject(false);
              return false;
            }
          });
        } else {
          this.$emit('submit', this.getFormData());
          resolve(this.getFormData());
        }
      });
    },

    /** 对表单进行校验 */
    validate(callback) {
      return this.$refs.dataForm && this.$refs.dataForm.validate(callback);
    },

    /** 表单校验事件 */
    formValidate(type, res, errorText) {
      this.$emit('validate', type, res, errorText);
    },

    /** 获取是否隐藏 */
    getHidden(formItem) {
      let { hidden, prop } = formItem;
      if (typeof hidden === 'function') {
        return hidden(prop, this.forms, formItem);
      } else {
        return hidden;
      }
    },

    /** 解析下拉值 */
    getDropList(formItem) {
      let { prop } = formItem;
      if (this.dropList[prop]) {
        if (typeof this.dropList[prop] === 'function') {
          return this.dropList[prop](prop, this.forms, formItem);
        } else {
          return this.dropList[prop];
        }
      }
      return [];
    },

    /** 获取数据方法-提供给外部使用 */
    getValue() {
      return this.getFormData();
    },

    /**
     * 获取表单数据
     */
    getFormData() {
      return cloneDeep(this.forms);
    },

    /**
     * form的值发生改变后 触发双向绑定和change事件
     */
    noticDataChange(params) {
      this.$emit('input', this.getFormData());
      if (params) {
        this.$emit('change', params);
      }
    },

    /**
     * 表单元素change事件
     */
    formItemChange(params) {
      // console.log(params);
      this.forms[params.prop] = params.value;
      if (
        this.formConfig[params.prop].propGroup &&
        this.formConfig[params.prop].propGroup.length > 0
      ) {
        if (Array.isArray(params.value) && params.value.length > 0) {
          params.value.forEach((ele, index) => {
            this.forms[this.formConfig[params.prop].propGroup[index]] = ele;
          });
        }
      }
      this.noticDataChange(params);
    }
  },
  watch: {
    config: {
      handler(newVal) {
        this.initConfg(newVal);
      },
      immediate: true,
      deep: true
    },
    formConfig: {
      handler(newVal) {
        // console.log('formConfig', newVal);
        this.initFormConfg(newVal);
      },
      immediate: true,
      deep: true
    },
    value: {
      handler(newVal) {
        // console.log('froms', newVal);
        this.initForms(newVal);
      },
      immediate: true,
      deep: true
    },
    visible_: {
      handler(newVal, oldVal) {
        // 当弹窗被关闭时，清空校验结果
        // if (newVal === !oldVal && !newVal) {
        //   this.clearValidate();
        // }
        /**
         * 如果在弹窗打开时清除校验信息
         *
         * 因为在弹窗打开时有可能会去修改formConfig的type（新增和编辑），这个时候可能会触发值的change导致自动提示了错误，所以现在改为在弹窗打开时清除
         */
        if (newVal === !oldVal && newVal) {
          this.clearValidate();
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.form-wrap {
  width: 100%;

  * {
    box-sizing: border-box;
  }

  .form-item {
    margin-bottom: 18px;
  }

  .form-item-label {
    display: flex;
    align-items: center;
    max-width: calc(100% - 10px);
    height: 100%;
  }

  .ellipsis {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ::v-deep {
    .el-form-item {
      display: flex;
      width: 100%;
      margin-bottom: 0;
    }

    .el-form-item__label {
      float: unset;
      display: flex;
      align-items: center;
      font-weight: bold;
      color: #333333;
      margin-left: 20px;
    }

    .el-form-item__content {
      flex: 1;
      margin-left: 0 !important;
    }
  }
}
</style>
