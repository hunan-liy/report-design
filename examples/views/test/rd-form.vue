<template>
  <div>
    <rd-form
      ref="rdForm"
      v-model="forms"
      :config="config"
      :formConfig="formConfig"
      @change="formChange"
    >
    </rd-form>
    <el-button @click="getValue">获取当前值</el-button>
    <el-button @click="setValue">动态修改属性和值</el-button>
    <el-button @click="submitForm">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      config: {
        labelWidth: '200px',
        labelSuffix: '123'
        // hideRequiredAsterisk: true,
        // showMessage: false,
        // disabled: true,
        // readonly: true
      },
      formConfig: {
        id: {
          hidden: true
        },
        text: {
          label: 'text'
        },
        input: {
          type: 'input',
          label: 'input',
          required: true
        },
        inputSuffixes: {
          type: 'inputSuffixes',
          label: 'inputSuffixes',
          suffixes: '<i class="el-icon-share"></i>'
        },
        dialogSelect: {
          type: 'dialogSelect',
          label: 'dialogSelect',
          props: {
            rowProps: {
              value: 'id',
              label: 'userName'
            },
            reportConfig: {
              filters: {
                formConfig: {
                  typeCode: {
                    type: 'input',
                    label: '姓名'
                  },
                  typeName: {
                    type: 'input',
                    label: '年龄'
                  },
                  typeCode1: {
                    type: 'select',
                    label: '性别'
                  },
                  typeName1: {
                    type: 'select',
                    label: '生日'
                  },
                  typeCode2: {
                    type: 'input',
                    label: '邮箱'
                  },
                  typeName2: {
                    type: 'select',
                    label: '地址'
                  }
                },
                dropList: {
                  typeName: []
                }
              },
              tableColumns: [
                {
                  label: '姓名',
                  prop: 'userName'
                },
                {
                  label: '年龄',
                  prop: 'age'
                },
                {
                  label: '性别',
                  prop: 'sex'
                },
                {
                  label: '生日',
                  prop: 'birthday'
                },
                {
                  label: '邮箱',
                  prop: 'email'
                },
                {
                  label: '地址',
                  prop: 'address'
                }
              ],
              httpConfig: {
                url: 'https://www.fastmock.site/mock/de66cd0ff6569e78bb9857a0e42035f9/report-design/dialog-select'
              }
            }
          },
          required: true
        },
        radio: {
          type: 'radio',
          label: 'radio',
          col: 12,
          required: true
        },
        checkbox: {
          type: 'checkbox',
          label: 'checkbox',
          col: 12,
          required: true
        },
        inputNumber: {
          type: 'inputNumber',
          label: 'inputNumber',
          required: true
        },
        select: {
          type: 'select',
          label: 'select',
          required: true
        },
        cascader: {
          type: 'cascader',
          label: 'cascader',
          required: true
        },
        switch: {
          type: 'switch',
          label: 'switch'
        },
        slider: {
          type: 'slider',
          label: 'slider',
          col: 24,
          required: true
        },
        timePicker: {
          type: 'timePicker',
          label: 'timePicker',
          required: true
        },
        datePicker: {
          type: 'datePicker',
          label: 'datePicker',
          propGroup: ['datePicker1', 'datePicker2'],
          props: {
            type: 'daterange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期'
          },
          col: 24,
          required: true
        },
        rate: {
          type: 'rate',
          label: 'rate',
          required: true
        },
        colorPicker: {
          type: 'colorPicker',
          label: 'colorPicker',
          required: true
        },
        transfer: {
          type: 'transfer',
          label: 'transfer',
          col: 24,
          props: {
            data: [
              {
                key: 1,
                label: '备选项1'
              },
              {
                key: 2,
                label: '备选项2'
              },
              {
                key: 3,
                label: '备选项3'
              },
              {
                key: 4,
                label: '备选项4',
                disabled: true
              },
              {
                key: 5,
                label: '备选项5'
              }
            ]
          }
        },
        textarea: {
          type: 'input',
          label: '备注',
          col: 24,
          props: {
            type: 'textarea',
            rows: 4,
            placeHolder: '请输入备注'
          }
        }
      },
      // 设置初始值
      forms: {
        input: ''
      },
      // 选项数据值
      dropList: {}
    };
  },
  methods: {
    // 获取值
    getValue() {
      console.log(this.forms);
      let value = this.$refs.rdForm.getValue();
      console.log(value);
    },
    // 动态修改数据
    setValue() {
      // 修改配置项
      this.formConfig.text.label = '重置label';
      // 修改form的值
      this.forms.input = '这是修改的数据';
    },
    // 提交表单
    submitForm() {
      this.$refs.rdForm
        .submitForm()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置表单
    reset() {
      this.$refs.rdForm.resetFields();
    },
    // 表单所有元素的change事件
    formChange(params) {
      console.log(params);
    }
  }
};
</script>
