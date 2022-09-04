## RdTable 表格组件
用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

### 基础功能

表格基础类型用法展示。

:::demo
```html
<rd-table
  ref="rdTable"
  :table="table"
  :headers="headers"
  :tableColumns="tableColumns"
  :tableData="tableData"
  :dropList="dropList"
  @header-click="headerClick"
  @row-item-click="rowItemClick"
  @row-change="rowChange">
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
          label: '新增'
        },
        edit:{
          label: '删除'
        },
        delete:{
          label: '删除-隐藏',
          hidden: ()=>{
            return true
          }
        }
      },
      tableColumns: [
        {
          label: '原始列',
          prop: 'id',
        },
        {
          type: 'text',
          label: 'text',
          prop: 'text',
          width: 150
        },
        {
          type: 'input',
          label: 'input',
          prop: 'input',
          width: 150
        },
        {
          type: 'inputNumber',
          label: 'inputNumber',
          prop: 'inputNumber',
          width: 150
        },
        {
          type: 'select',
          label: 'select',
          prop: 'select',
          width: 150
        },
        {
          type: 'checkbox',
          label: 'checkbox',
          prop: 'checkbox',
          width: 100
        },
        {
          type: 'switch',
          label: 'switch',
          prop: 'switch',
          width: 100
        },
        {
          type: 'image',
          label: 'image',
          prop: 'image',
          width: 150
        },
        {
          type: 'html',
          label: 'html',
          prop: 'html',
          width: 200
        },
        {
          type: 'link',
          label: 'link',
          prop: 'link',
          width: 100
        },
        {
          type: 'selectDialog',
          label: 'selectDialog',
          prop: 'selectDialog',
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
          width: 260
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
              prop: 'tuik',
              label: '退款'
            },
            {
              prop: 'view',
              label: '查阅'
            },
          ]
        },
      ],
      tableData: [
        {
          id: 1,
          text: 'text1',
          input: 'input1',
          inputNumber: 'inputNumber1',
          select: 1,
          checkbox: true,
          switch: false,
          image: 'https://gd-hbimg.huaban.com/d0f717318df4aafaeb5e4707a9c6525c55dd7a4b6efd-pW1zUz_fw658',
          html: '<a href="https://www.baidu.com/" target="_blank">百度一下你就知道</a>',
          link: 'https://www.baidu.com/',
          selectDialog: {
            label: '陆芳',
            value: 2
          },
        },
        {
          id: 2,
          text: 'text2',
          input: 'input2',
          inputNumber: 'inputNumber2',
          select: 2,
          checkbox: true,
          switch: false,
          image: 'http://qimg.hxnews.com/2017/0522/1495440192702.jpg',
          html: '<span>简单的一段文字</span>',
          link: '点击查看',
          selectDialog: {
            label: '卢军',
            value: 4
          },
        },
        {
          id: 3,
          text: null,
          input: null,
          inputNumber: null,
          select: null,
          checkbox: false,
          switch: true,
          image: null,
          html: null,
          link: null,
          selectDialog: null,
        },
        {
          id: 4,
          text: 'text4',
          input: 'input4',
          inputNumber: 'inputNumber4',
          select: 1,
          checkbox: false,
          switch: true,
          image: 'http://picapi.zhituad.com/photo/88/21/47BDF.jpg',
          html: '<i class="el-icon-edit"></i>',
          link: '详情',
          selectDialog: {
            label: '丁洋',
            value: 8
          },
        },
      ],
      dropList: {
        select: this.getSelectOptions,
      },
      row_record: null,
    }
  },
  methods: {
    // 动态获取下拉项
    getSelectOptions(row, column, cellValue, index){
      if(index%2 === 0){
        return [
          { label: '男', value: 1 },
          { label: '女', value: 2 },
        ]
      }else {
        return [
          { label: '是', value: 1 },
          { label: '否', value: 2 },
        ]
      }
    },
    headerClick(params){
      console.log(params);
      // console.log(this.$refs.rdTable.getTableData());
    },
    rowItemClick(params){
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

### 数据格式化

对表格进行筛选，可快速查找到自己想看的数据。

:::demo
```html
<rd-table ref="table" :tableColumns="tableColumns" :tableData="tableData"></rd-table>
<script>
export default {
  data() {
    return {
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
          prop: 'sex',
          formatter: (row, column, cellValue, index)=>{
            let { sex } = row;
            if(sex === 1){
              return '男';
            }else {
              return '女';
            }
          }
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
            }
          ],
          formatter: (row, column, cellValue, index)=>{
            let { sex } = row;
            if(sex === 1){
              return [
                {
                  prop: 'edit',
                  label: '修改男'
                },
                {
                  prop: 'delete',
                  label: '删除'
                }
              ];
            }else {
              return [
                {
                  prop: 'edit',
                  label: '修改女'
                },
                {
                  prop: 'delete',
                  label: '删除'
                }
              ];
            }
          }
        }
      ],
      tableData: [
        {
          "id": 1,
          "age": 24,
          "sex": 1,
          "birthday": "1982-11-05",
          "email": "s.ylverdbkr@mlcxkb.cc",
          "address": "新和县",
          "userName": "武芳"
        },
        {
          "id": 2,
          "age": 15,
          "sex": 2,
          "birthday": "2010-11-22",
          "email": "x.phqdyoxwx@dlgj.name",
          "address": "平川区",
          "userName": "龙丽"
        },
        {
          "id": 3,
          "age": 20,
          "sex": 1,
          "birthday": "2020-12-01",
          "email": "c.gkybrgtla@oqfzodtgi.iq",
          "address": "磐安县",
          "userName": "蔡芳"
        },
        {
          "id": 4,
          "age": 20,
          "sex": 1,
          "birthday": "1998-01-14",
          "email": "v.pbmk@gndxbcjee.lk",
          "address": "河北区",
          "userName": "夏丽"
        },
        {
          "id": 5,
          "age": 15,
          "sex": 2,
          "birthday": "2003-04-11",
          "email": "n.jtjsirxdlq@kbemg.an",
          "address": "-",
          "userName": "戴丽"
        },
        {
          "id": 6,
          "age": 16,
          "sex": 1,
          "birthday": "1972-01-28",
          "email": "n.iqt@gxcbmi.cq",
          "address": "彝良县",
          "userName": "卢丽"
        }
      ]
    };
  },
}
</script>
```
:::


### 合并功能

多行或多列共用一个数据时，可以合并行或列

:::demo
```html
<div>
  <rd-table :table="table" :tableColumns="tableColumns" :tableData="tableData"></rd-table>
  <rd-table :table="table1" :tableColumns="tableColumns" :tableData="tableData"></rd-table>
</div>
<script>
export default {
  data() {
    return {
      table: {
        spanMethod: ({ row, column, rowIndex, columnIndex })=> {
          if (rowIndex % 2 === 0) {
            if (columnIndex === 0) {
              return [1, 2];
            } else if (columnIndex === 1) {
              return [0, 0];
            }
          }
        }
      },
      table1: {
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
}
</script>
```
:::

### 单选功能

multipleTable设置为‘radio’可以让表格单选

:::demo
```html
<rd-table ref="table" :table="table" :tableColumns="tableColumns" :tableData="tableData"></rd-table>
<script>
export default {
  data() {
    return {
      table: {
        multipleTable: 'radio',
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
          label: '数值 1',
          prop: 'amount1'
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
    };
  },
}
</script>
```
:::

### 筛选功能

对表格进行筛选，可快速查找到自己想看的数据。

:::demo
```html
<rd-table ref="table" :table="table" :tableColumns="tableColumns" :tableData="tableData"></rd-table>
<script>
export default {
  data() {
    return {
      table: {
        multipleTable: 'radio',
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
          filters: [
            { text: '张三', value: '张三' },
            { text: '李四', value: '李四' },
            { text: '王五', value: '王五' },
            { text: '老六', value: '老六' }
          ],
          filterMethod: this.filterHandler,
          sortable: true
        },
        {
          label: '数值 1',
          prop: 'amount1'
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
    };
  },
}
</script>
```
:::


### 复杂表头

暂时只支持到2级复杂表头

:::demo
```html
<rd-table ref="table" :table="table" :tableColumns="tableColumns" :tableData="tableData">
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
}
</script>
```
:::

### 树形数据
要使用树形数据，表格的第一列不能指定type（使用element-ui table自己的列）

:::demo
```html
<rd-table ref="table" :table="table" :tableColumns="tableColumns" :tableData="tableData"></rd-table>
<script>
export default {
  data() {
    return {
      table: {
        rowKey: 'id',
        expandRowKeys: ['12987122', '12987122-1'],
        treeProps: { children: 'children' }
      },

      tableColumns: [
        {
          label: 'ID',
          prop: 'id',
          align: 'left',
          width: 200
        },
        {
          label: '姓名',
          prop: 'name',
        },
        {
          label: '数值 1',
          prop: 'amount1'
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
    };
  },
}
</script>
```
:::


### 插槽

:::demo
```html
<rd-table ref="table" :headers="headers" :tableColumns="tableColumns" :tableData="tableData">
  <span slot="headerSlot" slot-scope="scope">
    头部插槽
  </span>
  <span slot="label" slot-scope="scope">
    label插槽
  </span>
  <div slot="amount1" slot-scope="scope">
    插槽+{{scope.value}}
  </div>
</rd-table>
<script>
export default {
  data() {
    return {
      headers: {
        add: {
          label: '新增'
        },
        headerSlot: {
          type: 'slot',
          label: '插槽'
        }
      },
      tableColumns: [
        {
          label: 'ID',
          prop: 'id',
          align: 'left'
        },
        {
          label: 'label使用插槽',
          headerSlotName: 'label',
          prop: 'name',
        },
        {
          type: 'slot',
          label: '内容使用插槽',
          prop: 'amount1'
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
    };
  },
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


### Events
| 事件名称         | 说明                                                                                                                     | 回调参数                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| header-click     | 表格头部按钮点击事件                                                                                                     | params                          |
| selection-change | 当选择项发生变化时会触发该事件                                                                                           | selection                       |
| sort-change      | 当表格的排序条件发生变化的时候会触发该事件                                                                               | { column, prop, order }         |
| row-change       | 行数据change事件                                                                                                         | params                          |
| row-item-click   | 行内元素点击事件，只支持部分type                                                                                         | params                          |
| cell-click       | 当某个单元格被点击时会触发该事件                                                                                         | row, column, cell, event        |
| cell-dblclick    | 当某个单元格被双击击时会触发该事件                                                                                       | row, column, cell, event        |
| row-click        | 当某一行被点击时会触发该事件                                                                                             | row, column, event              |
| row-contextmenu  | 当某一行被鼠标右键点击时会触发该事件                                                                                     | row, column, event              |
| row-dblclick     | 当某一行被双击时会触发该事件                                                                                             | row, column, event              |
| expand-change    | 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded） | row, (expandedRows \| expanded) |

### Events params参数
#### header-click 表格头部按钮点击事件
- type 当前点击元素的类型
- selections 当前选中的行（selection开启才能选择行）
- clickItem 当前点击的对象
  - label 点击的按钮的label
  - prop 点击的按钮的prop

#### row-change 表格头部按钮点击事件
- prop 点击的列的prop
- value 点击元素的值
- index 点击的元素所对应的行下标
- row 点击元素所对应的行数据
- rows 列的type为selectDailog时才会有，表示selectDialog弹窗确定是弹窗中选中的行数据

#### row-item-click 行内元素点击事件，只支持部分type
- type 当前点击元素的类型
- prop 点击的列的prop
- index 点击的元素所对应的行下标
- row 点击元素所对应的行数据
- value 点击元素的值
- rows 列的type为selectDailog时才会有，表示selectDialog弹窗确定是弹窗中选中的行数据
- clickItem 当前点击的对象
  - label 点击的按钮的label
  - prop 点击的按钮的prop

### Form Methods
| 方法名             | 说明                                                | 参数            |
| ------------------ | --------------------------------------------------- | --------------- |
| doLayout           | 对 Table 进行重新布局                               | -               |
| toggleRowSelection | 重写了table的toggleRowSelection，第一个参数为行下标 | index, selected |
| clearSelection     | 用于多选表格，清空用户的选择                        | -               |
| getTableData       | 获取表格数据                                        | -               |


### Slot
| name                   | 说明                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------- |
| tableColumns的slotName | 表格的内容，头部插槽参数为 { column, $index }，内容插槽参数为 { row, column, $index } |
| headers的slotName      | 表格头部的内容，参数为 { ...header的属性, selections }                                |

### Table
部分原有属性未验证其是否能完全正常使用，请见谅
| 参数                    | 说明                                                                                                                                                                                                | 类型                                                  | 可选值                       | 默认值                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------- | ------------------------------------------------------ |
| height                  | Table 的高度                                                                                                                                                                                        | string/number                                         | —                            | —                                                      |
| max-height              | Table 的最大高度                                                                                                                                                                                    | string/number                                         | —                            | —                                                      |
| stripe                  | 是否为斑马纹 table                                                                                                                                                                                  | boolean                                               | —                            | false                                                  |
| border                  | 是否带有纵向边框                                                                                                                                                                                    | boolean                                               | —                            | true                                                   |
| size                    | Table 的尺寸                                                                                                                                                                                        | string                                                | medium / small / mini        | —                                                      |
| fit                     | 列的宽度是否自撑开                                                                                                                                                                                  | boolean                                               | —                            | true                                                   |
| show-header             | 是否显示表头                                                                                                                                                                                        | boolean                                               | —                            | true                                                   |
| highlight-current-row   | 是否要高亮当前行                                                                                                                                                                                    | boolean                                               | —                            | false                                                  |
| current-row-key         | 当前行的 key，只写属性                                                                                                                                                                              | string/number                                         | —                            | —                                                      |
| row-class-name          | 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className                                                                                                                         | Function({row, rowIndex})/String                      | —                            | —                                                      |
| row-style               | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style                                                                                                                         | Function({row, rowIndex})/Object                      | —                            | —                                                      |
| cell-class-name         | 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className                                                                                                                 | Function({row, column, rowIndex, columnIndex})/String | —                            | —                                                      |
| cell-style              | 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。                                                                                                               | Function({row, column, rowIndex, columnIndex})/Object | —                            | —                                                      |
| header-row-class-name   | 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className                                                                                                                 | Function({row, rowIndex})/String                      | —                            | —                                                      |
| header-row-style        | 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style                                                                                                                 | Function({row, rowIndex})/Object                      | —                            | —                                                      |
| header-cell-class-name  | 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className                                                                                                         | Function({row, column, rowIndex, columnIndex})/String | —                            | —                                                      |
| header-cell-style       | 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style                                                                                                         | Function({row, column, rowIndex, columnIndex})/Object | —                            | —                                                      |
| row-key                 | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function | Function(row)/String                                  | —                            | —                                                      |
| empty-text              | 空数据时显示的文本内容，也可以通过 slot="empty" 设置                                                                                                                                                | String                                                | —                            | 暂无数据                                               |
| default-expand-all      | 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效                                                                                                                                     | Boolean                                               | —                            | false                                                  |
| expand-row-keys         | 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组                                                                                                    | Array                                                 | —                            | —                                                      |
| default-sort            | 默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序                                                                                                                 | Object                                                | order: ascending, descending | 如果只指定了prop, 没有指定order, 则默认顺序是ascending |
| tooltip-effect          | tooltip effect 属性                                                                                                                                                                                 | String                                                | dark/light                   | —                                                      |
| show-summary            | 是否在表尾显示合计行                                                                                                                                                                                | boolean                                               | —                            | false                                                  |
| sum-text                | 合计行第一列的文本                                                                                                                                                                                  | String                                                | —                            | 合计                                                   |
| summary-method          | 自定义的合计计算方法                                                                                                                                                                                | Function({ columns, data })                           | —                            | —                                                      |
| span-method             | 合并行或列的计算方法                                                                                                                                                                                | Function({ row, column, rowIndex, columnIndex })      | —                            | —                                                      |
| select-on-indeterminate | 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行                                                                                 | Boolean                                               | —                            | true                                                   |
| indent                  | 展示树形数据时，树节点的缩进                                                                                                                                                                        | Number                                                | —                            | 16                                                     |
| lazy                    | 是否懒加载子节点数据                                                                                                                                                                                | Boolean                                               | —                            | —                                                      |
| load                    | 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息                                                                                                                       | Function(row, treeNode, resolve)                      | —                            | —                                                      |
| tree-props              | 渲染嵌套数据的配置选项                                                                                                                                                                              | Object                                                | —                            | { hasChildren: 'hasChildren', children: 'children' }   |
| multipleTable           | 是否开启表格行选择（type为selection的列）,radio时为单选                                                                                                                                             | boolean/string                                        | false/true/radio             | —                                                      |
| visibleCols             | 是否开启表格列筛选，为true代表所有列都可以筛选，Array的话只有Array中的列开启                                                                                                                        | boolean/array                                         | —                            | —                                                      |
| readonly                | 设置只读模式，如果列中有可编辑的元素，将自动转化为文本                                                                                                                                              | boolean/array                                         | —                            | —                                                      |
| selectable              | 开启表格行选择后可以通过该属性设置当前行的选择功能是否禁用                                                                                                                                          | Function(row, index)                                  | —                            | —                                                      |


### Headers
| 参数     | 说明                                       | 类型                     | 可选值 | 默认值 |
| -------- | ------------------------------------------ | ------------------------ | ------ | ------ |
| type     | 指定表格头部是按钮还是插槽                 | string                   | —/slot | —      |
| prop     | header元素的key值                          | string                   | —      | —      |
| slotName | 当type为slot时，使用插槽的名称，默认取prop | string                   | —      | —      |
| props    | Button 按钮的所有Attributes属性            | object                   | —      | —      |
| hidden   | 设置显示隐藏                               | boolean/Function(header) | —      | —      |

### TableColumns
部分原有属性未验证其是否能完全正常使用，请见谅
| 参数             | 说明                                                                                                                                                                                  | 类型                                    | 可选值                                                                                            | 默认值                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------- |
| column-key       | column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件                                                                                              | string                                  | —                                                                                                 | —                                 |
| label            | 显示的标题                                                                                                                                                                            | string                                  | —                                                                                                 | —                                 |
| prop             | 对应列内容的字段名                                                                                                                                                                    | string                                  | —                                                                                                 | —                                 |
| width            | 对应列的宽度                                                                                                                                                                          | string                                  | —                                                                                                 | —                                 |
| min-width        | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列                                                                           | string                                  | —                                                                                                 | —                                 |
| fixed            | 列是否固定在左侧或者右侧，true 表示固定在左侧                                                                                                                                         | string, boolean                         | true, left, right                                                                                 | —                                 |
| sortable         | 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件                                                                                   | boolean, string                         | true, false, 'custom'                                                                             | false                             |
| sortProp         | sortable='custom'时，指定排序字段的值,默认等于列的prop，主要给report组件使用                                                                                                          | string                                  | —                                                                                                 | —                                 |
| sort-method      | 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致                                                                          | Function(a, b)                          | —                                                                                                 | —                                 |
| sort-by          | 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推 | String/Array/Function(row, index)       | —                                                                                                 | —                                 |
| sort-orders      | 数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序                                            | array                                   | 数组中的元素需为以下三者之一：ascending 表示升序，descending 表示降序，null 表示还原为原始顺序    | ['ascending', 'descending', null] |
| resizable        | 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）                                                                                                              | boolean                                 | —                                                                                                 | true                              |
| align            | 对齐方式                                                                                                                                                                              | String                                  | left/center/right                                                                                 | left                              |
| class-name       | 列的 className                                                                                                                                                                        | string                                  | —                                                                                                 | —                                 |
| filters          | 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。                                                                                                                     | Array[{ text, value }]                  | —                                                                                                 | —                                 |
| filter-placement | 过滤弹出框的定位                                                                                                                                                                      | String                                  | 与 Tooltip 的 placement 属性相同                                                                  | —                                 |
| filter-multiple  | 数据过滤的选项是否多选                                                                                                                                                                | boolean                                 | —                                                                                                 | true                              |
| filter-method    | 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示                                                                                            | Function(value, row, column)            | —                                                                                                 | —                                 |
| filtered-value   | 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性                                                                                                                  | Array                                   | —                                                                                                 | —                                 |
| type             | 表格列类型，重写了type                                                                                                                                                                | string                                  | —，text，input，inputNumber，select，checkbox，switch，image，html，link，selectDialog，operation |
| slotName         | 当type为slot时，使用插槽的名称，默认取TableColumns的prop                                                                                                                              | string                                  | —                                                                                                 | —                                 |
| headerSlotName   | lable部分使用插槽时，插槽的名称                                                                                                                                                       | string                                  | —                                                                                                 | —                                 |
| props            | 各个类型自身的Attributes属性                                                                                                                                                          | object                                  | —                                                                                                 | —                                 |
| formatter        | 重写了TableColumns的formatter                                                                                                                                                         | Function(row, column, cellValue, index) | —                                                                                                 | —                                 |
| operations       | 操作列的按钮集合                                                                                                                                                                      | array                                   | —                                                                                                 | —                                 |
| ellipsis         | 开启tooltip时控制超过几行显示省略号                                                                                                                                                   | number                                  | —                                                                                                 | —                                 |
| showMax          | type为operation时，最多显示几个按钮，显示不下的下拉展示                                                                                                                               | number                                  | —                                                                                                 | 2                                 |
| visible          | 当前列是否开启筛选，当有这个值的时候，Table的visibleCols失效                                                                                                                          | boolean                                 | —                                                                                                 | —                                 |
| readonly         | 设置只读后type为可编辑的类型时会变为文本或者禁用状态                                                                                                                                  | boolean                                 | —                                                                                                 | —                                 |
| hidden           | 设置显示隐藏                                                                                                                                                                          | boolean/Function(column)                | —                                                                                                 | —                                 |
| children         | 设置复杂表头，TableColumns嵌套TableColumns                                                                                                                                            | array                                   | —                                                                                                 | —                                 |


### TableColumns 所有的type props
| 方法名      | 说明                                                                        | 参数                                           |
| ----------- | --------------------------------------------------------------------------- | ---------------------------------------------- |
| ...         | 各个类型自身的Attributes属性                                                | —                                              | — | —     |
| placeholder | 占位文本，输入框默认`请输入${label}`，选择框默认`请选择${label}`            | string                                         | — | —     |
| disabled    | 是否禁用,可以是对象也可以是个函数，方便动态赋值设置列中每个单元的禁用状态   | object/Function(row, column, cellValue, index) |
| clearable   | 是否可清空                                                                  | boolean                                        | — | true  |
| readonly    | 是否开启只读模式。若设置为 true，大部分表单元素变为text，部分变为disabled效 | boolean                                        | — | false |


### TableColumns type='selectDialog' props
| 方法名       | 说明                                                             | 参数                                           |
| ------------ | ---------------------------------------------------------------- | ---------------------------------------------- |
| ...          | RdSelectDialog 选择器 Attributes属性                             | —                                              | — | — |
| reportConfig | 可以是对象也可以是个函数，方便动态赋值设置列中每个RdSelectDialog | object/Function(row, column, cellValue, index) |

### TableColumns type='image' props
| 方法名 | 说明                         | 类型   | 可选值 | 默认值 |
| ------ | ---------------------------- | ------ | ------ | ------ |
| ...    | Image 图片 Attributes属性    | —      | —      | —      |
| width  | 图片的宽度                   | string | —      | '80px' |
| height | 图片的高度度                 | string | —      | —      |
| error  | 图片加载失败之后显示的占位图 | string | —      | —      |
