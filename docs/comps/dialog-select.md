## RdDialogSelect 弹窗选择器
打开一个弹窗通过接口异步加载数据，用来选择一条或者多条数据

### 单选
打开弹窗选择一条数据，勾选再点确定或者双击行都可以

:::demo
```html
<rd-dialog-select
  v-model="value"
  placeholder="请选择"
  :reportConfig="reportConfig"
  :rowProps="rowProps"
  @change="dialogSelectChange"
  >
</rd-dialog-select>
<script>
  export default {
    data() {
      return {
        value: null,
        // value: {
        //   value: 1,
        //   label: '易秀兰'
        // },
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
            url: 'https://www.fastmock.site/mock/de66cd0ff6569e78bb9857a0e42035f9/report-design/dialog-select'
          }
        }
        // test: { left:'200px'}
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      dialogSelectChange(val, rows){
        console.log(val, this.dialogSelect ,rows);
      },
    }
  };
</script>
```
:::


### 多选
多选时，数据存在分页，每次选择都会取已经选择的数据与当前勾选的数据的并集
:::demo
```html
<rd-dialog-select
  v-model="value"
  placeholder="请选择"
  multiple
  :reportConfig="reportConfig"
  :rowProps="rowProps"
  @change="dialogSelectChange"
  >
</rd-dialog-select>

<script>
  export default {
    data() {
      return {
        value: null,
        // value: [
        //   {
        //     value: 1,
        //     label: '易秀兰'
        //   },{
        //     value: 2,
        //     label: '陆芳'
        //   },
        // ],
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
            url: 'https://www.fastmock.site/mock/de66cd0ff6569e78bb9857a0e42035f9/report-design/dialog-select'
          }
        }
        // test: { left:'200px'}
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      dialogSelectChange(val, rows){
        console.log(val, this.dialogSelect ,rows);
      },
    }
  };
</script>
```
:::



### Attributes
| 参数            | 说明                                                               | 类型         | 可选值            | 默认值 |
| --------------- | ------------------------------------------------------------------ | ------------ | ----------------- | ------ |
| value / v-model | 绑定值                                                             | array/object | —                 | —      |
| rowProps        | 组件取值的配置项，例：rowProps: { value: 'id', label: 'userName' } | object       | —                 | —      |
| dialogConfig    | 弹窗配置项（rd-dialog的属性）                                      | object       | —                 | {}     |
| reportConfig    | report配置项（rd-report的属性）                                    | string       | —                 | —      |
| beforeOpen      | 弹窗打开之前的回调，可以返回false阻止弹窗打开                      | function     | —                 | —      |
| disabled        | 是否禁用                                                           | boolean      | —                 | false  |
| placeholder     | 占位文字                                                           | string       | —                 | —      |
| clearable       | 是否可以清空选项                                                   | boolean      | —                 | true   |
| multiple        | 是否多选                                                           | boolean      | —                 | false  |
| size            | 输入框尺寸                                                         | string       | medium/small/mini | —      |

### Events
| 事件名称   | 说明                                     | 回调参数     |
| ---------- | ---------------------------------------- | ------------ |
| change     | 选中值发生变化时触发                     | value,rows   |
| clear      | 可清空的单选模式下用户点击清空按钮时触发 | —            |
| input      | 双向绑定用                               | 目前的选中值 |
| remove-tag | 多选时tag删除事件                        | 删除的tag    |
