## HyTable 表格组件
用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

### 基础功能

基础的表格展示用法。

:::demo 使用列的开窗选择功能时，必须通过table属性的dialogs去配置开窗相关的属性（参照hy-report），开窗的确认实在需要在table属性中的hooks去配置，并且要在confirm回调用调用callback才能设置数据值。
```html
<rd-table :table="table" :headers="headers" :tableColumns="tableColumns" :tableData="tableData" :dropList="dropList" @row-item-click="rowClick" @row-change="rowChange">
  <div slot="test" slot-scope="scope">
    我使用了插槽{{scope.value}}
  </div>
  <span slot="header1" slot-scope="scope">
    插槽-{{scope.column.label}}
  </span>
  <span slot="headerSlot" slot-scope="scope">
    头部-{{scope.slotName}}
  </span>
</rd-table>
<script>
export default {
  data() {
    return {
      table: {
        multipleTable: true,
        visibleCols: true,
      },
      headers: {
        add: {
          label: '修改'
        },batchEdit:{
          label: '删除'
        },batchDelete:{
          label: '删除',
          hidden: ()=>{
            return true
          }
        },headerSlot:{
          type: 'slot',
        }
      },
      tableColumns: [
        {
          label: '月份',
          prop: 'month',
          minWidth: 100,
          sortable: true,
          // hidden: ()=>{
          //   return true
          // }
        },
        {
          type: 'slot',
          label: '插槽',
          prop: 'test',
          minWidth: 100,
          sortable: true
        },
        {
          type: 'text',
          label: '姓名',
          prop: 'name',
          headerSlotName: 'header1',
          renderType: 'tooltip',
          ellipsis: 2,
          minWidth: 100,
          sortable: true
        },
        {
          type: 'link',
          label: 'link',
          prop: 'link',
          minWidth: 100,
          sortable: true
        },
        {
          type: 'switch',
          label: 'switch',
          prop: 'checkbox',
          props: {
            activeText: '开启',
            inactiveText: '关闭'
          },
          minWidth: 100,
          sortable: true
        },
        {
          type: 'selectDialog',
          label: '工号',
          prop: 'selectDialog',
          minWidth: 200,
          sortable: true,
          props: {
            multiple: true,
            rowProp: 'typeCode',
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
          }
        },
        {
          type: 'input',
          label: '工号',
          prop: 'jobNumber',
          minWidth: 150,
          sortable: true,
          props: {
            disabled: (row, column, value, index)=>{
              if(index === 2){
                return true
              }
              return false
            }
          }
        },
        {
          type: 'inputNumber',
          label: '计数器',
          prop: 'inputNumber',
          minWidth: 150,
          sortable: true
        },
        {
          type: 'image',
          label: '头像',
          prop: 'avatar',
          props: {
            width: '60px',
            height: '60px',
            // error: require('./u156.svg')
          },
          sortable: true
        },
        {
          type: 'html',
          label: '代码片段',
          prop: 'html',
          minWidth: 100,
          sortable: true
        },
        {
          type: 'select',
          label: '性别',
          prop: 'sex',
          sortable: true
        },
        {
          type: 'checkbox',
          label: 'checkbox',
          prop: 'checkbox',
          minWidth: 100,
          sortable: true
        },
        {
          type: 'operation',
          label: '操作',
          prop: 'operation',
          operations: [
            {
              prop: 'edit',
              label: '修改'
            },
            {
              prop: 'delete',
              label: '删除'
            },
            {
              prop: 'delete',
              label: '删除'
            }
          ]
        },
      ],
      tableData: [
        {
          id: 1,
          month: '2022-05',
          test: '插槽数据1',
          name: '这是一个很长很长很长很长很长很长的名字',
          link: 'https://www.baidu.com/',
          switch: false,
          selectDialog: ['FXX', 'AAA'],
          jobNumber: '2022050601',
          inputNumber: null,
          avatar: 'https://pic.5tu.cn/uploads/allimg/1605/191504058090.jpg',
          html: '<a href="https://www.baidu.com/" target="_blank">百度一下你就知道</a>',
          sex: 1,
          checkbox: true,
        },
        {
          id:2,
          month: '2022-06',
          test: '插槽数据2',
          name: '吴彦祖',
          link: '链接文字',
          switch: true,
          selectDialog: null,
          jobNumber: '124578963',
          inputNumber: '2',
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          html: '<p>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>',
          sex: 2,
          checkbox: false,
        },
        {
          id:3,
          month: '2022-07',
          test: '插槽数据3',
          name: '刘德华',
          link: '链接文字',
          switch: false,
          selectDialog: null,
          jobNumber: '124578963',
          inputNumber: '2',
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          html: '<p>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>',
          sex: 2,
          checkbox: true,
        },
        {
          id:4,
          month: '2022-08',
          test: '插槽数据4',
          name: '古天乐',
          link: '链接文字',
          switch: true,
          selectDialog: null,
          jobNumber: '124578963',
          inputNumber: '2',
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a905941a4af5f44c0c25941171jpeg.jpeg',
          html: '<p>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>',
          sex: 1,
          checkbox: true,
        },
      ],
      dropList: {
        sex: [
          {
            label: '男',
            value: 1,
          },{
            label: '女',
            value: 2
          }
        ],
      },
      row_record: null,
    }
  },
  methods: {
    rowClick(params){
      console.log('你点击了行内元素', params);
    },
    rowChange(params){
      console.log('你change', params);
    },
  }
}
</script>
```
:::

### 合并功能

多行或多列共用一个数据时，可以合并行或列

:::demo
```html
<rd-table :table="table" :tableColumns="tableColumns" :tableData="tableData" @row-item-click="rowClick">
</rd-table>
<script>
export default {
  data() {
    return {
      table: {
        // multipleTable: true,
        spanMethod: ({ row, column, rowIndex, columnIndex })=>{
          if (columnIndex === 0) {
            if (rowIndex % 2 === 0) {
              return {
                rowspan: 2,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              };
            }
          }
        }
      },
      tableColumns: [
        {
          label: 'ID',
          prop: 'id',
          sortable: true
        },
        {
          label: '姓名',
          prop: 'name',
          sortable: true
        },
        {
          label: '数值 1',
          prop: 'amount1',
          sortable: true
        },
        {
          label: '数值 2',
          prop: 'amount2',
          sortable: true
        },
        {
          label: '数值 3',
          prop: 'amount3',
          sortable: true
        },
        {
          type: 'operation',
          label: '操作',
          prop: 'operation',
          operations: [
            {
              prop: 'edit',
              label: '修改'
            },
            {
              prop: 'delete',
              label: '删除'
            },{
              prop: 'delete',
              label: '删除'
            },{
              prop: 'delete',
              label: '删除'
            },{
              prop: 'delete',
              label: '删除'
            },{
              prop: 'delete',
              label: '删除'
            }
          ]
        },
      ],
      tableData: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }]
    }
  },
  methods: {
    rowClick(params){
      console.log('你点击了行内元素', params);
    }
  }
}
</script>
```
:::


### 筛选功能

对表格进行筛选，可快速查找到自己想看的数据。

:::demo
```html
<rd-table ref="table" :table="table" :tableColumns="tableColumns" :tableData="tableData" @row-item-click="rowClick">
</rd-table>
<script>
export default {
  data() {
    return {
      table: {
        multipleTable: true,
        rowKey: 'id',
        // expandRowKeys: ['12987122', '12987122-1'],
        treeProps: { children: 'children' }
      },
      
      tableColumns: [
        {
          type: 'origin',
          label: 'ID',
          prop: 'id',
          align: 'left'
        },
        {
          label: '姓名',
          prop: 'name',
          filters: true
        },
        {
          label: '数值 1',
          prop: 'amount1',
          filters: true
        },
        {
          label: '数值 2',
          prop: 'amount2'
        },
        {
          label: '数值 3',
          prop: 'amount3'
        },
        {
          type: 'operation',
          label: '操作',
          prop: 'operation',
          width: 240,
          operations: [
            {
              prop: 'edit',
              label: '修改'
            },
            {
              prop: 'delete',
              label: '删除'
            }
          ]
        }
      ],
      tableData: [
        {
          id: '12987122',
          name: '张三',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
          children: [
            {
              id: '12987122-1',
              name: '张三-1',
              amount1: '234',
              amount2: '3.2',
              amount3: 10,
              children: [
                {
                  id: '12987122-1-1',
                  name: '张三-1-1',
                  amount1: '234',
                  amount2: '3.2',
                  amount3: 10
                },
                {
                  id: '12987122-1-2',
                  name: '张三-1-2',
                  amount1: '234',
                  amount2: '3.2',
                  amount3: 10
                },
                {
                  id: '12987122-1-3',
                  name: '张三-1-3',
                  amount1: '234',
                  amount2: '3.2',
                  amount3: 10
                }
              ]
            },
            {
              id: '12987122-2',
              name: '张三-2',
              amount1: '234',
              amount2: '3.2',
              amount3: 10,
              children: [
                {
                  id: '12987122-2-1',
                  name: '张三-2-1',
                  amount1: '234',
                  amount2: '3.2',
                  amount3: 10
                },
                {
                  id: '12987122-2-2',
                  name: '张三-2-2',
                  amount1: '234',
                  amount2: '3.2',
                  amount3: 10
                },
                {
                  id: '12987122-2-3',
                  name: '张三-2-3',
                  amount1: '234',
                  amount2: '3.2',
                  amount3: 10
                }
              ]
            },
            {
              id: '12987122-3',
              name: '张三-3',
              amount1: '234',
              amount2: '3.2',
              amount3: 10
            }
          ]
        },
        {
          id: '12987123',
          name: '李四',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        },
        {
          id: '12987124',
          name: '王五',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        },
        {
          id: '12987125',
          name: '老六',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        },
        {
          id: '12987126',
          name: '小七',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }
      ]
    }
  },
  methods: {
    rowClick(params){
      console.log('你点击了行内元素', params);
    }
  }
}
</script>
```
:::


### 复杂表头

暂时只支持到2级复杂表头

:::demo
```html
<re-table ref="table" :table="table" :tableColumns="tableColumns" :tableData="tableData" @row-item-click="rowClick">
</rd-table>
<script>
export default {
  data() {
    return {
      table: {
        multipleTable: true,
      },
      tableColumns: [
        {
          label: 'ID',
          prop: 'id',
          align: 'left'
        },
        {
          label: '姓名',
          prop: 'name',
        },
        {
          label: '数值',
          children: [
            {
              label: '数值 1',
              prop: 'amount1',
              filters: true
            },
            {
              type: 'input',
              label: '数值 2',
              prop: 'amount2'
            },
            {
              label: '数值 3',
              prop: 'amount3'
            },
          ]
        },
        
        {
          type: 'operation',
          label: '操作',
          prop: 'operation',
          width: 240,
          operations: [
            {
              prop: 'edit',
              label: '修改'
            },
            {
              prop: 'delete',
              label: '删除'
            }
          ]
        }
      ],
      tableData: [
        {
          id: '12987122',
          name: '张三',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
        },
        {
          id: '12987123',
          name: '李四',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        },
        {
          id: '12987124',
          name: '王五',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        },
        {
          id: '12987125',
          name: '老六',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        },
        {
          id: '12987126',
          name: '小七',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }
      ]
    }
  },
  methods: {
    rowClick(params){
      console.log('你点击了行内元素', params);
    }
  }
}
</script>
```
:::

### Attributes
| 参数         | 说明                                                                       | 类型                                           | 可选值 | 默认值 |
| ------------ | -------------------------------------------------------------------------- | ---------------------------------------------- | ------ | ------ |
| table        | 表格配置                                                                   | object                                         | —      | {}     |
| headers      | 表头部配置                                                                 | object                                         | —      | {}     |
| tableColumns | 表格列配置                                                                 | array                                          | —      | []     |
| tableData    | 表格数据                                                                   | array                                          | —      | []     |
| dropList     | 表格行中下拉项的数据与tableColumns配合使用，可以使用function来处理返回结果 | object/Function(row, column, cellValue, index) | —      | {}     |

### Slot
| name                   | 说明           |
| ---------------------- | -------------- |
| tableColumns的slotName | 表格的内容     |
| headers的slotName      | 表格头部的内容 |

### Events
| 事件名称         | 说明                                                                                                                     | 回调参数                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| click            | 表格头部按钮点击事件                                                                                                     | —                               |
| selection-change | 当选择项发生变化时会触发该事件                                                                                           | —                               |
| sort-change      | 当表格的排序条件发生变化的时候会触发该事件                                                                               | —                               |
| row-change       | 行数据change事件                                                                                                         | —                               |
| row-item-click   | 行内元素点击事件，只支持部分type                                                                                         | —                               |
| cell-click       | 当某个单元格被点击时会触发该事件                                                                                         | row, column, cell, event        |
| cell-dblclick    | 当某个单元格被双击击时会触发该事件                                                                                       | row, column, cell, event        |
| row-click        | 当某一行被点击时会触发该事件                                                                                             | row, column, event              |
| row-contextmenu  | 当某一行被鼠标右键点击时会触发该事件                                                                                     | row, column, event              |
| row-dblclick     | 当某一行被双击时会触发该事件                                                                                             | row, column, event              |
| expand-change    | 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded） | row, (expandedRows \| expanded) |


### Table
| 参数          | 说明                                                                         | 类型                 | 可选值           | 默认值 |
| ------------- | ---------------------------------------------------------------------------- | -------------------- | ---------------- | ------ |
| ...           | Table 表格的所有Attributes属性（未完全测试，如果某个属性不能使用，需要处理） | object               | —                | {}     |
| multipleTable | 是否开启表格行选择（type为selection的列）,radio时为单选                      | boolean/string       | false/true/radio | —      |
| visibleCols   | 是否开启表格列筛选，为true代表所有列都可以筛选，Array的话只有Array中的列开启 | boolean/array        | —                | —      |
| readonly      | 设置只读模式，如果列中有可编辑的元素，将自动转化为文本                       | boolean/array        | —                | —      |
| selectable    | 开启表格行选择后可以通过该属性设置当前行的选择功能是否禁用                   | Function(row, index) | —                | —      |
| dialogs       | 开窗配置(已废除，请查看hy-select-dialig使用方式)                             | object               | —                | —      |
| hooks         | 开窗回调(已废除，请查看hy-select-dialig使用方式)                             | object               | —                | —      |

### Table dialogs 已废除
| 参数  | 说明                                 | 类型   | 可选值 | 默认值 |
| ----- | ------------------------------------ | ------ | ------ | ------ |
| ...   | HyTable 报表组件的所有Attributes属性 | object | —      | {}     |
| title | 弹窗标题                             | object | —      | {}     |
| width | 弹窗宽度                             | object | —      | {}     |

### Table hooks 已废除
| 参数           | 说明                                                                                                         | 类型    | 可选值 | 默认值 |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ------- | ------ | ------ |
| beforeLoadData | 加载数据前的回调，在点击选择打开弹窗时触发，可以通过return false阻止打开弹窗                                 | funcion | —      | —      |
| confirm        | 确认按钮点击之后触发的回调，参数中会带有当前选择的值，还有一个callback，可以通过callback去设置当前组件内的值 | object  | —      | {}     |  | object | — | — |

### Headers
| 参数     | 说明                                       | 类型                     | 可选值 | 默认值 |
| -------- | ------------------------------------------ | ------------------------ | ------ | ------ |
| type     | 指定表格头部是按钮还是插槽                 | string                   | —/slot | —      |
| prop     | header元素的key值                          | string                   | —      | —      |
| slotName | 当type为slot时，使用插槽的名称，默认取prop | string                   | —      | —      |
| props    | Button 按钮的所有Attributes属性            | object                   | —      | —      |
| hidden   | 设置显示隐藏                               | boolean/Function(header) | —      | —      |

### TableColumns
| 参数            | 说明                                                                                  | 类型                                           | 可选值                                                                                                 | 默认值 |
| --------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------ |
| ...             | Table 表格的Table-column Attributes属性（未完全测试，如果某个属性不能使用，需要处理） | string                                         | —/slot                                                                                                 | —      |
| type            | 表格列类型                                                                            | string                                         | origin，text，input，inputNumber，select，checkbox，switch，image，html，link，selectDialog，operation |
| slotName        | 当type为slot时，使用插槽的名称，默认取TableColumns的prop                              | string                                         | —                                                                                                      | —      |
| props           | 各个类型自身的Attributes属性                                                          | object                                         | —                                                                                                      | —      |
| formatter       | 重写了TableColumns的formatter，新增了string类型，可以直接使用内置的formatter方法      | string/Function(row, column, cellValue, index) | dateFormat，convertCurrency，numberThousandth，desensitization                                         | —      |
| formatterParams | formatter用的是内置的方法时，需要的参数用这个传入                                     | array                                          | —                                                                                                      | —      |
| operations      | 操作列的按钮集合                                                                      | array                                          | —                                                                                                      | —      |
| renderType      | type为text时，是否开启tooltip                                                         | string                                         | —/tooltip                                                                                              | —      |
| ellipsis        | 开启tooltip时控制超过几行显示省略号                                                   | number                                         | —                                                                                                      | 1      |
| showMax         | type为operation时，最多显示几个按钮，显示不下的下拉展示                               | number                                         | —                                                                                                      | 1      |
| visible         | 当前列是否开启筛选，当有这个值的时候，Table的visibleCols失效                          | boolean                                        | —                                                                                                      | —      |
| readonly        | 设置只读后type为可编辑的类型时会变为文本或者禁用状态                                  | boolean                                        | —                                                                                                      | —      |
| hidden          | 设置显示隐藏                                                                          | boolean/Function(column)                       | —                                                                                                      | —      |
| children        | 设置复杂表头，TableColumns嵌套TableColumns                                            | array                                          | —                                                                                                      | —      |


### TableColumns formatter
| 方法名           | 说明                         | 参数                           |
| ---------------- | ---------------------------- | ------------------------------ |
| dateFormat       | 转换为相应格式的日期字符串   | 日期格式(DatePicker的日期格式) |
| convertCurrency  | 数字金额转化成大写金额       | —                              |
| numberThousandth | 将数字转为带千分位的金额数字 | 保留几位小数                   |
| desensitization  | 手机号脱敏                   | —                              |

### TableColumns 所有的type props
| 方法名   | 说明                                                                      | 参数                                           |
| -------- | ------------------------------------------------------------------------- | ---------------------------------------------- |
| ...      | 各个类型自身的Attributes属性                                              | —                                              | — | — |
| disabled | 是否禁用,可以是对象也可以是个函数，方便动态赋值设置列中每个单元的禁用状态 | object/Function(row, column, cellValue, index) |

### TableColumns type='selectDialog' props
| 方法名       | 说明                                                             | 参数                                           |
| ------------ | ---------------------------------------------------------------- | ---------------------------------------------- |
| ...          | HySelectDialog 选择器 Attributes属性                             | —                                              | — | — |
| reportConfig | 可以是对象也可以是个函数，方便动态赋值设置列中每个HySelectDialog | object/Function(row, column, cellValue, index) |

### TableColumns type='image' props
| 方法名 | 说明                         | 类型   | 可选值 | 默认值 |
| ------ | ---------------------------- | ------ | ------ | ------ |
| ...    | Image 图片 Attributes属性    | —      | —      | —      |
| width  | 图片的宽度                   | string | —      | '80px' |
| height | 图片的高度度                 | string | —      | —      |
| error  | 图片加载失败之后显示的占位图 | string | —      | —      |
