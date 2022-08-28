## HySelectDialog 开窗选择器
基于hy-dialog+hy-report开发的组件

### 基础功能

通过设置rowProp去使用组件时，组件会存什么值就显示什么值，与组件v-model绑定是对象的类型可能为string,number,array(多选时)，这是因为数据回显时，回显只有value值，获取不到label，所以只能存什么显示什么

:::demo
```html
<rd-select-dialog
  v-model="selectDialog"
  :reportConfig="reportConfig"
  :rowProp="'typeCode'"
  @change="selectDialogChange"
  >
</rd-select-dialog>
<script>
  export default {
    data() {
      return {
        selectDialog: 'JIN',
        // selectDialog: ['JIN', 'LIU', 'SQA'],
        reportConfig: {
          headers: {
            // 高级搜索按钮
            search: {
              type: 'search',
              label: '高级搜索',
              props: {
                // TOCUS 高级搜索按钮打开的表单需要根据业务需求去配置
                formConfig: {
                  typeCode: {
                    type: 'input',
                    label: '分类编码'
                  },
                  typeName: {
                    type: 'input',
                    label: '分类名称'
                  }
                }
              }
            },
            // 刷新按钮
            refresh: {
              type: 'refresh',
              label: '刷新'
            }
          },
          /** TOCUS 表格列头配置 */
          tableColumns: [
            {
              label: '分类编码',
              prop: 'typeCode',
              sortProp: 'TypeCode',
              sortable: 'custom'
            },
            {
              label: '分类名称',
              prop: 'typeName',
              sortProp: 'TypeName',
              sortable: 'custom'
            },
            {
              label: '分类描述',
              prop: 'typeDescribe',
              sortProp: 'TypeDescribe',
              sortable: 'custom'
            },
            {
              label: '父分类名称',
              prop: 'parentName',
              sortProp: 'ParentName',
              sortable: 'custom'
            },
          ],
          /** 请求接口相关配置 */
          httpConfig: {
            // TOCUS 请求数据的接口
            url: 'http://222.244.145.28:7089/SYS_TableType/QueryTableTypePage',
          },
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
      selectDialogChange(val, rows){
        console.log(val, this.selectDialog ,rows);
      },
    }
  };
</script>
```
:::

通过设置rowProps去使用组件时，组件会存value值就显示label值，与组件v-model绑定是对象的类型可能为object,array(多选时)，<font color="red">这个时候回显时需要接口查询的数据里面有value和label两个属性，自己组装成object的结构去使用</font>

:::demo
```html
<rd-select-dialog
  v-model="selectDialog"
  :reportConfig="reportConfig"
  :rowProps="rowProps"
  @change="selectDialogChange"
  >
</rd-select-dialog>
<script>
  export default {
    data() {
      return {
        selectDialog: {
          value: 'SQA',
          label: '20220623'
        },
        rowProps: {
          value: 'typeCode',
          label: 'typeName'
        },
        reportConfig: {
          headers: {
            // 高级搜索按钮
            search: {
              type: 'search',
              label: '高级搜索',
              props: {
                // TOCUS 高级搜索按钮打开的表单需要根据业务需求去配置
                formConfig: {
                  typeCode: {
                    type: 'input',
                    label: '分类编码'
                  },
                  typeName: {
                    type: 'input',
                    label: '分类名称'
                  }
                }
              }
            },
            // 刷新按钮
            refresh: {
              type: 'refresh',
              label: '刷新'
            }
          },
          /** TOCUS 表格列头配置 */
          tableColumns: [
            {
              label: '分类编码',
              prop: 'typeCode',
              sortProp: 'TypeCode',
              sortable: 'custom'
            },
            {
              label: '分类名称',
              prop: 'typeName',
              sortProp: 'TypeName',
              sortable: 'custom'
            },
            {
              label: '分类描述',
              prop: 'typeDescribe',
              sortProp: 'TypeDescribe',
              sortable: 'custom'
            },
            {
              label: '父分类名称',
              prop: 'parentName',
              sortProp: 'ParentName',
              sortable: 'custom'
            },
          ],
          /** 请求接口相关配置 */
          httpConfig: {
            // TOCUS 请求数据的接口
            url: 'http://222.244.145.28:7089/SYS_TableType/QueryTableTypePage',
          },
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
      selectDialogChange(val, rows){
        console.log(val, this.selectDialog ,rows);
      },
    }
  };
</script>
```
:::


### 多选

rowProp

:::demo
```html
<rd-select-dialog
  v-model="selectDialog"
  multiple
  :reportConfig="reportConfig"
  :rowProp="'typeCode'"
  @change="selectDialogChange"
  >
</rd-select-dialog>

<script>
  export default {
    data() {
      return {
        selectDialog: ['AAQ'],
        reportConfig: {
          headers: {
            // 高级搜索按钮
            search: {
              type: 'search',
              label: '高级搜索',
              props: {
                // TOCUS 高级搜索按钮打开的表单需要根据业务需求去配置
                formConfig: {
                  typeCode: {
                    type: 'input',
                    label: '分类编码'
                  },
                  typeName: {
                    type: 'input',
                    label: '分类名称'
                  }
                }
              }
            },
            // 刷新按钮
            refresh: {
              type: 'refresh',
              label: '刷新'
            }
          },
          /** TOCUS 表格列头配置 */
          tableColumns: [
            {
              label: '分类编码',
              prop: 'typeCode',
              sortProp: 'TypeCode',
              sortable: 'custom'
            },
            {
              label: '分类名称',
              prop: 'typeName',
              sortProp: 'TypeName',
              sortable: 'custom'
            },
            {
              label: '分类描述',
              prop: 'typeDescribe',
              sortProp: 'TypeDescribe',
              sortable: 'custom'
            },
            {
              label: '父分类名称',
              prop: 'parentName',
              sortProp: 'ParentName',
              sortable: 'custom'
            },
          ],
          /** 请求接口相关配置 */
          httpConfig: {
            // TOCUS 请求数据的接口
            url: 'http://222.244.145.28:7089/SYS_TableType/QueryTableTypePage',
          },
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
      selectDialogChange(val, rows){
        console.log(val, this.selectDialog ,rows);
      },
    }
  };
</script>
```
:::

rowProps

:::demo
```html
<rd-select-dialog
  v-model="selectDialog"
  multiple
  :reportConfig="reportConfig"
  :rowProps="rowProps"
  @change="selectDialogChange"
  >
</rd-select-dialog>

<script>
  export default {
    data() {
      return {
        selectDialog: [
          {
            value: 'SQA',
            label: '20220623'
          },{
            value: 'JIN',
            label: '类别'
          },
        ],
        rowProps: {
          value: 'typeCode',
          label: 'typeName'
        },
        reportConfig: {
          headers: {
            // 高级搜索按钮
            search: {
              type: 'search',
              label: '高级搜索',
              props: {
                // TOCUS 高级搜索按钮打开的表单需要根据业务需求去配置
                formConfig: {
                  typeCode: {
                    type: 'input',
                    label: '分类编码'
                  },
                  typeName: {
                    type: 'input',
                    label: '分类名称'
                  }
                }
              }
            },
            // 刷新按钮
            refresh: {
              type: 'refresh',
              label: '刷新'
            }
          },
          /** TOCUS 表格列头配置 */
          tableColumns: [
            {
              label: '分类编码',
              prop: 'typeCode',
              sortProp: 'TypeCode',
              sortable: 'custom'
            },
            {
              label: '分类名称',
              prop: 'typeName',
              sortProp: 'TypeName',
              sortable: 'custom'
            },
            {
              label: '分类描述',
              prop: 'typeDescribe',
              sortProp: 'TypeDescribe',
              sortable: 'custom'
            },
            {
              label: '父分类名称',
              prop: 'parentName',
              sortProp: 'ParentName',
              sortable: 'custom'
            },
          ],
          /** 请求接口相关配置 */
          httpConfig: {
            // TOCUS 请求数据的接口
            url: 'http://222.244.145.28:7089/SYS_TableType/QueryTableTypePage',
          },
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
      selectDialogChange(val, rows){
        console.log(val, this.selectDialog ,rows);
      },
    }
  };
</script>
```
:::



### Attributes
由于数据是通过弹窗异步查询的，所以数据回显没办法做到像select一样显示label，存储value，只能是显示什么就存储什么<br/>
单选时可以回显数据的选中状态，但是多选时，数据存在分页，无法进行回显，而且多选时每次选择都会重置之前的选择结果
| 参数         | 说明                                                                                                                    | 类型                       | 可选值            | 默认值 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- | -------------------------- | ----------------- | ------ |
| value        | 双向绑定的值                                                                                                            | string/number/array/object | —                 | —      |
| rowProp      | 指定弹窗数据中的列prop来填充数据，此时value最细单元类型为string/number                                                  | string                     | —                 | —      |
| rowProps     | 指定弹窗数据中的列prop来填充数据，例：rowProps: { value: 'typeCode', label: 'typeName' }，此时value最细单元类型为object | object                     | —                 | —      |
| dialogConfig | 弹窗配置项（hy-dialog的属性）                                                                                           | object                     | —                 | {}     |
| reportConfig | report配置项（hy-report的属性）                                                                                         | string                     | —                 | —      |
| beforeOpen   | 弹窗打开之前的回调，可以返回false阻止弹窗打开                                                                           | function                   | —                 | —      |
| disabled     | 是否禁用                                                                                                                | boolean                    | —                 | false  |
| placeholder  | 占位文字                                                                                                                | string                     | —                 | —      |
| clearable    | 是否可以清空选项                                                                                                        | boolean                    | —                 | true   |
| multiple     | 是否多选，单选时数据可以回显选中，多选时不行                                                                            | boolean                    | —                 | false  |
| size         | 输入框尺寸                                                                                                              | string                     | medium/small/mini | —      |

### Events
| 事件名称   | 说明                                     | 回调参数     |
| ---------- | ---------------------------------------- | ------------ |
| change     | 选中值发生变化时触发                     | value,rows   |
| clear      | 可清空的单选模式下用户点击清空按钮时触发 | —            |
| input      | 双向绑定用                               | 目前的选中值 |
| remove-tag | 多选时tag删除事件                        | 删除的tag    |
