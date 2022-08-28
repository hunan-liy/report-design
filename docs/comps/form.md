## Form 表单
支持element-ui的所有form组件，以数据驱动，生成一个form表单。

### 基础功能

Form 组件的基本类型使用。

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
        inputSuffixes: {
          type: 'inputSuffixes',
          label: 'inputSuffixes',
          suffixes: '<i class="el-icon-share"></i>'
        },
        selectDialog: {
          type: 'selectDialog',
          label: 'selectDialog',
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

### 隐藏

:::demo 
```html
<rd-form
  ref="rdForm"
  :formConfig="formConfig"
>
</rd-form>
<el-button @click="setHidden">设置隐藏</el-button>
<script>
  export default {
    data() {
      return {
        isHidden: false,
        formConfig: {
          id: {
            type: 'text',
            label: 'ID',
            hidden: true, // 直接隐藏
          },
          userName: {
            type: 'input',
            label: '姓名',
          },
          age: {
            type: 'input',
            label: '年龄',
            hidden: false,
          },
          sex: {
            type: 'input',
            label: '性别',
            hidden: (prop)=>{ // function，根据数据控制
              return this.isHidden;
            }
          },
        }
      };
    },
    methods: {
      setHidden(prop, value, formItem) {
        console.log(prop, value, formItem);
        this.formConfig.age.hidden = true;
        this.isHidden = true;
      }
    }
  };
</script>
```
:::

### 布局
可以通过配置config.col统一设置一行显示几个元素，也可以通过单独设置元素的col或者width控制
后续会加一个type='layout'，作为布局容器，元素占据一行，其内部元素可以自有布局
:::demo 
```html
<rd-form
  ref="rdForm"
  :config="config"
  :formConfig="formConfig"
>
</rd-form>
<script>
  export default {
    data() {
      return {
        config: {
          col: 8, // 一行显示3个
        },
        formConfig: {
          userName: {
            type: 'input',
            label: '姓名',
          },
          age: {
            type: 'input',
            label: '年龄',
          },
          sex: {
            type: 'input',
            label: '性别',
          },
          email: {
            type: 'input',
            label: '邮箱',
          },
          address: {
            type: 'input',
            label: '地址',
            col: 12
          },
          class: {
            type: 'input',
            label: '分类',
            width: '80%'
          },
          mark: {
            type: 'input',
            label: '成绩',
            width: '400px'
          }
        }
      };
    },
  };
</script>
```
:::

### 使用element-ui原生属性
通过props设置element-ui的原生属性，基本兼容全部属性
:::demo 
```html
<rd-form
  ref="rdForm"
  v-model="formData"
  :formConfig="formConfig"
  :dropList="dropList"
>
</rd-form>
<script>
  export default {
    data() {
      return {
        formData: {
          userName: null,
          age: null
        },
        formConfig: {
          userName: {
            type: 'input',
            label: '姓名',
            props: {
              maxlength: 520,
              showWordLimit: true
            },
          },
          age: {
            type: 'select',
            label: '性别',
            props: {
              filterable: true,
              allowCreate: true,
              defaultFirstOption: true
            },
          },
        },
        dropList: {
          age: [
            { label: '男', value: '男' },
            { label: '女', value: '女' },
          ],
        }
      };
    },
  };
</script>
```
:::

### 禁用
:::demo 
```html
<rd-form
  ref="rdForm"
  v-model="formData"
  :formConfig="formConfig"
>
</rd-form>
<script>
  export default {
    data() {
      return {
        formData: {
          switch: false,
          userName: null,
          age: null
        },
        formConfig: {
          switch: {
            type: 'switch',
            label: '是否禁用',
            col: 24
          },
          userName: {
            type: 'input',
            label: '姓名',
            props: {
              disabled: true
            },
          },
          age: {
            type: 'input',
            label: '年龄',
            props: {
              disabled: ()=>{
                return this.formData.switch
              }
            },
          },
        },
      };
    },
  };
</script>
```
:::


### 下拉项
:::demo 
```html
<rd-form
  ref="rdForm"
  :formConfig="formConfig"
  :dropList="dropList"
>
</rd-form>
<script>
  export default {
    data() {
      return {
        formConfig: {
          province: {
            type: 'select',
            label: '省份',
          },
          city: {
            type: 'select',
            label: '城市',
          },
        },
        dropList: {
          province: [
            { label: '湖南', value: '湖南' },
            { label: '湖北', value: '湖北' },
          ],
          city: this.getCity
        }
      };
    },
    methods: {
      getCity(prop, value, formItem) {
        console.log(prop, value, formItem);
        if(value.province === '湖南'){
          return [
            { label: '长沙', value: '长沙' },
            { label: '常德', value: '常德' },
          ]
        }else if(value.province === '湖北'){
          return [
            { label: '武汉', value: '武汉' },
            { label: '常德', value: '襄阳' },
          ]
        }else {
          return []
        }
      }
    }
  };
</script>
```
:::


### 插槽
通过指定type = 'slot'来使用插槽，通过slotName指定插槽名称，不设置时默认为formItem的prop，可以通过slotType设置是否整个formItem作为插槽区
:::demo 
```html
<rd-form
  ref="rdForm"
  v-model="formData"
  :formConfig="formConfig"
  :dropList="dropList"
>
  <!-- 只有内容部分作为插槽 -->
  <template #province="scope">
    <el-select v-model="formData.province" placeholder="请选择">
      <el-option
        v-for="item in scope.dropList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </template>
  <!-- 整个item作为插槽 -->
  <template #describe>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
      v-model="formData.describe">
    </el-input>
  </template>
</rd-form>
<script>
  export default {
    data() {
      return {
        formData: {
          province: '湖南',
          city: null,
          describe: null
        },
        formConfig: {
          province: {
            type: 'slot',
            label: '省份',
          },
          city: {
            type: 'select',
            label: '城市',
          },
          describe: {
            type: 'slot',
            col: 24,
            slotType: 'item',
          }
        },
        dropList: {
          province: [
            { label: '湖南', value: '湖南' },
            { label: '湖北', value: '湖北' },
          ],
          city: this.getCity
        }
      };
    },
    methods: {
      getCity(prop, value, formItem) {
        console.log(prop, value, formItem);
        if(value.province === '湖南'){
          return [
            { label: '长沙', value: '长沙' },
            { label: '常德', value: '常德' },
          ]
        }else if(value.province === '湖北'){
          return [
            { label: '武汉', value: '武汉' },
            { label: '常德', value: '襄阳' },
          ]
        }else {
          return []
        }
      }
    }
  };
</script>
```
:::


### 指定多个值
有时候需要给一个formItem绑定多个值，如日期时间选择器，可以通过propGroup达到该效果，组件内部会将原生组件的值（array类型）按下标匹配赋值给propGroup中指定的prop
:::demo 
```html
<rd-form
  ref="rdForm"
  v-model="formData"
  :formConfig="formConfig"
  @change="formChange"
>
</rd-form>
<script>
  export default {
    data() {
      return {
        formData: {},
        formConfig: {
          datePicker: {
            type: 'datePicker',
            label: '下单时间',
            propGroup: ['startTime', 'endTime'],
            props: {
              type: 'daterange',
              startPlaceholder: '开始日期',
              endPlaceholder: '结束日期'
            },
            col: 24,
          },
        },
      };
    },
    methods: {
      formChange(params){
        console.log(params);
        console.log(this.formData);
      },
    }
  };
</script>
```
:::


### Attributes
| 参数       | 说明                                                                                            | 类型   | 可选值 | 默认值 |
| ---------- | ----------------------------------------------------------------------------------------------- | ------ | ------ | ------ |
| config     | form表单组件整体配置                                                                            | object | —      | {}     |
| formConfig | 表单元素配置项                                                                                  | object | —      | {}     |
| value      | 双向绑定的表单值，不传的话会根据formConfig自动补全                                              | object | —      | {}     |
| dropList   | 表单中下拉项的数据与formConfig配合使用，对应的prop的值可以array/function(prop, value, formItem) | object | —      | {}     |

### Form Methods
| 方法名        | 说明                                                                                                                                                                 | 参数                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| submitForm    | 用于提交表单，返回一个promise，可以用then去处理成功回调                                                                                                              | -                                             |
| resetFields   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果                                                                                                           | -                                             |
| clearValidate | 移除表单项的校验结果                                                                                                                                                 | -                                             |
| getValue      | 获取表单当前值                                                                                                                                                       | -                                             |
| validate      | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object)) |

### Slot
| name                 | 说明                                                       |
| -------------------- | ---------------------------------------------------------- |
| formConfig的slotName | 自定义表单元素的内容，参数为 { value, formItem, dropList } |

### Events
| 事件名称 | 说明                     | 回调参数                                                                                                        |
| -------- | ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| submit   | form表单提交事件         | 表单的value                                                                                                     |
| change   | form表单元素值change事件 | { prop: '触发change的元素的prop', value: '当前元素change后的值', rows: ['当前选中的行，只有selectDialog才有'] } |
| reset    | form表单重置事件         | —                                                                                                               |
| input    | form表单值，双向绑定用   | 表单的value                                                                                                     |
| validate | 表单校验时触发           | type, res, errorText                                                                                            |

### Config
| 参数                    | 说明                                                                                        | 类型    | 可选值                | 默认值 |
| ----------------------- | ------------------------------------------------------------------------------------------- | ------- | --------------------- | ------ |
| label-width             | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。     | string  | —                     | 110px  |
| hide-required-asterisk  | 是否隐藏必填字段的标签旁边的红色星号                                                        | boolean | —                     | false  |
| show-message            | 是否显示校验错误信息                                                                        | boolean | —                     | true   |
| validate-on-rule-change | 是否在 rules 属性改变后立即触发一次验证                                                     | boolean | —                     | true   |
| col                     | 表单元素大小，通过24分栏去控制每个元素的大小和位置                                          | number  | —                     | —      |
| size                    | 用于控制该表单内组件的尺寸                                                                  | string  | medium / small / mini | small  |
| disabled                | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效           | boolean | —                     | false  |
| readonly                | 是否开启只读模式。若设置为 true，大部分表单元素变为text，部分变为disabled，Transfer还未生效 | boolean | —                     | false  |
| isCheckForm             | 是否开启表单验证                                                                            | boolean | —                     | true   |


### FormConfig
| 参数         | 说明                                                                                                              | 类型                                    | 可选值                                                                                                                                                                      | 默认值 |
| ------------ | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| type         | 表单元素类型                                                                                                      | string                                  | text，tadio，checkbox，input，inputSuffixes，inputNumber，select，cascader，switch，slider，timePicker，datePicker，rate，colorPicker，transfer，selectDialog，upload，slot | text   |
| prop         | 表单域 model 字段，默认取formConifg的key值                                                                        | string                                  | —                                                                                                                                                                           | —      |
| label        | 表单元素的label                                                                                                   | string                                  | —                                                                                                                                                                           | —      |
| label-width  | 表单域标签的的宽度，例如 '50px'。支持 auto。                                                                      | string                                  | —                                                                                                                                                                           | —      |
| col          | 表单元素大小，通过24分栏去控制每个元素的大小和位置                                                                | number                                  | —                                                                                                                                                                           | 12     |
| width        | 与col功能一样，但是不能同时使用，可以是px(50px)也可以是百分比（50%）                                              | string                                  | —                                                                                                                                                                           | —      |
| slotName     | 当type为slot时，使用插槽的名称，默认取FormConfig的prop                                                            | string                                  | —                                                                                                                                                                           | —      |
| slotType     | 当type为slot时，是否将form-item作为整个插槽，item代表整个作为插槽                                                 | string                                  | —/item                                                                                                                                                                      | —      |
| propGroup    | 当一个表单元素需要赋值多个prop时使用                                                                              | array                                   | —                                                                                                                                                                           | —      |
| hidden       | 元素是否隐藏                                                                                                      | boolean/function(prop, value, formItem) | —                                                                                                                                                                           | —      |
| props        | 每个表单类型在element-ui中自己的Attributes属性                                                                    | object                                  | —                                                                                                                                                                           | {}     |
| rules        | 表单元素校验规则                                                                                                  | array                                   | —                                                                                                                                                                           | []     |
| required     | 重写了表单元素是否必填，与rules作用一样，但是不能与rules一起使用，如果设置为true，会自动为表单元素加上默认的rules | boolean                                 | —                                                                                                                                                                           | —      |
| show-message | 是否显示校验错误信息                                                                                              | boolean                                 | —                                                                                                                                                                           | true   |

### FormConfig props
每个表单元素在element-ui中的原生属性（重写了其中部分属性）
| 参数        | 说明                                                             | 类型                                    | 可选值 | 默认值 |
| ----------- | ---------------------------------------------------------------- | --------------------------------------- | ------ | ------ |
| ...         | 每个表单元素在element-ui中的原生属性                             | —                                       | —      | —      |
| placeholder | 占位文本，输入框默认`请输入${label}`，选择框默认`请选择${label}` | string                                  | —      | —      |
| valueFormat | datePicker默认yyyy-MM-dd，timePicker默认HH:mm:ss                 | string                                  | —      | —      |
| disabled    | 是否禁用                                                         | boolean/function(prop, value, formItem) | —      | —      |
| clearable   | 是否可清空                                                       | boolean                                 | —      | true   |
