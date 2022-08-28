## Form 表单
支持element-ui自己的所有form组件，以数据驱动，生成一个form表单。

### 基础功能

Form 组件的内容目前支持文本框、文本域、下拉框、时间选择器以及开窗的业务场景。

:::demo
```html
<rd-form ref="rdForm" v-model="forms" :formConfig="formConfig" :dropList="dropList" @change="formChange">
</rd-form>
<el-button @click="getValue">获取当前值</el-button>
<el-button @click="setValue">动态修改属性和值</el-button>
<el-button @click="submitForm">提交</el-button>
<el-button @click="reset">重置</el-button>
<script>
export default {
  data() {
    return {
      formConfig: {
        id: {
          hidden: true,
        },
        text: {
          label: 'text',
        },
        input: {
          type: 'input',
          label: 'input',
          required: true,
        },
        selectDialog: {
          type: 'selectDialog',
          label: 'selectDialog',
          col: 24,
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
                  prop: 'userName',
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
                url: 'https://www.fastmock.site/mock/de66cd0ff6569e78bb9857a0e42035f9/report-design/select-dialog'
              }
            }
          },
          required: true,
        },
        radio: {
          type: 'radio',
          label: 'radio',
          col: 24,
          required: true,
        },
        checkbox: {
          type: 'checkbox',
          label: 'checkbox',
          col: 24,
          required: true,
        },
        inputNumber: {
          type: 'inputNumber',
          label: 'inputNumber',
          required: true,
        },
        select: {
          type: 'select',
          label: 'select',
          required: true,
        },
        cascader: {
          type: 'cascader',
          label: 'cascader',
          required: true,
        },
        switch: {
          type: 'switch',
          label: 'switch',
        },
        slider: {
          type: 'slider',
          label: 'slider',
          col: 24,
          required: true,
        },
        timePicker: {
          type: 'timePicker',
          label: 'timePicker',
          required: true,
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
          required: true,
        },
        rate: {
          type: 'rate',
          label: 'rate',
          required: true,
        },
        colorPicker: {
          type: 'colorPicker',
          label: 'colorPicker',
          required: true,
        },
        transfer: {
          type: 'transfer',
          label: 'transfer',
          col: 24,
          props: {
            data: [{
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
            }]
          },
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
        id: 10,
        text: '文字信息',
        input: 'input',
        selectDialog: {
          label: '陆芳',
          value: 2
        },
        checkbox: ['B', 'c'],
        radio: 'B',
        inputNumber: 10,
        select: 'A',
        cascader: ['zhinan', 'daohang', 'dingbudaohang']
      },
      // 选项数据值
      dropList: {
        select: [
          { label: '黄金糕', value: 'A'},
          { label: '双皮奶', value: 'B'},
          { label: '蚵仔煎', value: 'c'},
          { label: '龙须面', value: 'D'},
          { label: '北京烤鸭', value: 'E'},
        ],
        radio: [
          { label: '上海', value: 'A'},
          { label: '北京', value: 'B'},
          { label: '广州', value: 'c'},
          { label: '深圳', value: 'D'},
        ],
        checkbox: [
          { label: '上海', value: 'A'},
          { label: '北京', value: 'B'},
          { label: '广州', value: 'c'},
          { label: '深圳', value: 'D'},
        ],
        cascader: [
          {
            value: 'zhinan',
            label: '指南',
            children: [
              {
                value: 'shejiyuanze',
                label: '设计原则',
                children: [
                  {
                    value: 'yizhi',
                    label: '一致'
                  },
                  {
                    value: 'fankui',
                    label: '反馈'
                  },
                  {
                    value: 'xiaolv',
                    label: '效率'
                  },
                  {
                    value: 'kekong',
                    label: '可控'
                  }
                ]
              },
              {
                value: 'daohang',
                label: '导航',
                children: [
                  {
                    value: 'cexiangdaohang',
                    label: '侧向导航'
                  },
                  {
                    value: 'dingbudaohang',
                    label: '顶部导航'
                  }
                ]
              }
            ]
          },
          {
            value: 'zujian',
            label: '组件',
            children: [
              {
                value: 'basic',
                label: 'Basic',
                children: [
                  {
                    value: 'layout',
                    label: 'Layout 布局'
                  },
                  {
                    value: 'color',
                    label: 'Color 色彩'
                  },
                  {
                    value: 'typography',
                    label: 'Typography 字体'
                  },
                  {
                    value: 'icon',
                    label: 'Icon 图标'
                  },
                  {
                    value: 'button',
                    label: 'Button 按钮'
                  }
                ]
              }
            ]
          },
          {
            value: 'ziyuan',
            label: '资源',
            children: [
              {
                value: 'axure',
                label: 'Axure Components'
              },
              {
                value: 'sketch',
                label: 'Sketch Templates'
              },
              {
                value: 'jiaohu',
                label: '组件交互文档'
              }
            ]
          }
        ]
      },
    }
  },
  methods: {
    // 获取值
    getValue(){
      console.log(this.forms);
      let value = this.$refs.rdForm.getValue();
      console.log(value);
    },
    // 动态修改数据
    setValue(){
      // 修改配置项
      this.formConfig.text.label = '重置label';
      // 修改form的值
      this.forms.input = '这是修改的数据';
    },
    // 提交表单
    submitForm(){
      this.$refs.rdForm.submitForm().then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      });
    },
    // 重置表单
    reset(){
      this.$refs.rdForm.resetFields();
    },
    // 表单所有元素的change事件
    formChange(params){
      console.log(params);
    },
  }
}
</script>
```
:::


### Attributes
| 参数       | 说明                                               | 类型   | 可选值 | 默认值 |
| ---------- | -------------------------------------------------- | ------ | ------ | ------ |
| config     | form表单组件整体配置                               | object | —      | {}     |
| formConfig | 表单元素配置项                                     | object | —      | {}     |
| value      | 双向绑定的表单值，不传的话会根据formConfig自动补全 | object | —      | {}     |
| dropList   | 表单中下拉项的数据与formConfig配合使用             | object | —      | {}     |

### Form Methods
| 方法名        | 说明                                                                                                                                                                 | 参数                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| submitForm    | 用于提交表单，返回一个promise，可以用then去处理成功回调                                                                                                              | -                                             |
| resetFields   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果                                                                                                           | -                                             |
| clearValidate | 移除表单项的校验结果                                                                                                                                                 | -                                             |
| getValue      | 获取表单当前值                                                                                                                                                       | -                                             |
| validate      | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object)) |

### Slot
| name                 | 说明                 |
| -------------------- | -------------------- |
| formConfig的slotName | 自定义表单元素的内容 |

### Events
| 事件名称 | 说明                     | 回调参数             |
| -------- | ------------------------ | -------------------- |
| submit   | form表单提交事件         | —                    |
| change   | form表单元素值change事件 | —                    |
| reset    | form表单重置事件         | —                    |
| input    | form表单值，双向绑定用   | —                    |
| validate | 表单校验时触发           | type, res, errorText |

### Config
| 参数                    | 说明                                                                                        | 类型    | 可选值                | 默认值 |
| ----------------------- | ------------------------------------------------------------------------------------------- | ------- | --------------------- | ------ |
| label-width             | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。     | string  | —                     | 110px  |
| hide-required-asterisk  | 是否隐藏必填字段的标签旁边的红色星号                                                        | boolean | —                     | false  |
| show-message            | 是否显示校验错误信息                                                                        | boolean | —                     | true   |
| validate-on-rule-change | 是否在 rules 属性改变后立即触发一次验证                                                     | boolean | —                     | true   |
| size                    | 用于控制该表单内组件的尺寸                                                                  | string  | medium / small / mini | small  |
| disabled                | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效           | boolean | —                     | false  |
| readonly                | 是否开启只读模式。若设置为 true，大部分表单元素变为text，部分变为disabled，Transfer还未生效 | boolean | —                     | false  |
| isCheckForm             | 是否开启表单验证                                                                            | boolean | —                     | true   |


### FormConfig
| 参数        | 说明                                                                         | 类型             | 可选值                                                                                                                                                                      | 默认值 |
| ----------- | ---------------------------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| ...         | Form-Item 的所有Attributes属性（未完全测试，如果某个属性不能使用，需要处理） | —                | —                                                                                                                                                                           | —      |
| type        | 表单元素类型                                                                 | string           | Text，Radio，Checkbox，Input，InputSuffixes，InputNumber，Select，Cascader，Switch，Slider，TimePicker，DatePicker，Rate，ColorPicker，Transfer，SelectDialog，Upload，Slot | {}     |
| prop        | 表单域 model 字段，默认取formConifg的key值                                   | string           | —                                                                                                                                                                           | —      |
| label       | 表单元素的label                                                              | string           | —                                                                                                                                                                           | —      |
| label-width | 表单域标签的的宽度，例如 '50px'。支持 auto。                                 | string           | —                                                                                                                                                                           | —      |
| col         | 表单元素大小，通过24分栏去控制每个元素的大小和位置                           | number           | —                                                                                                                                                                           | 8      |
| width       | 与col功能一样，但是不能同时使用，可以是px(50px)也可以是百分比（50%）         | string           | —                                                                                                                                                                           | —      |
| slotName    | 当type为slot时，使用插槽的名称，默认取FormConfig的prop                       | string           | —                                                                                                                                                                           | —      |
| slotType    | 当type为slot时，是否将form-item作为整个插槽，item代表整个作为插槽            | string           | —/item                                                                                                                                                                      | —      |
| propGroup   | 当一个表单元素需要赋值多个prop时使用                                         | array            | —                                                                                                                                                                           | —      |
| hidden      | 元素是否隐藏                                                                 | boolean/function | —                                                                                                                                                                           | —      |
| props       | 每个表单类型在饿了么中自己的Attributes属性                                   | object           | —                                                                                                                                                                           | {}     |
| rules       | 表单元素校验规则                                                             | array            | —                                                                                                                                                                           | []     |
| required    | 表单元素是否必填，与rules作用一样，但是不能与rules一起使用                   | boolean          | —                                                                                                                                                                           | —      |

### Config dialogs 已废除
| 参数  | 说明                                 | 类型   | 可选值 | 默认值 |
| ----- | ------------------------------------ | ------ | ------ | ------ |
| ...   | HyTable 报表组件的所有Attributes属性 | object | —      | {}     |
| title | 弹窗标题                             | object | —      | {}     |
| width | 弹窗宽度                             | object | —      | {}     |

### Config hooks 已废除
| 参数           | 说明                                                                                                         | 类型    | 可选值 | 默认值 |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ------- | ------ | ------ |
| beforeLoadData | 加载数据前的回调，在点击选择打开弹窗时触发，可以通过return false阻止打开弹窗                                 | funcion | —      | —      |
| confirm        | 确认按钮点击之后触发的回调，参数中会带有当前选择的值，还有一个callback，可以通过callback去设置当前组件内的值 | object  | —      | {}     |
