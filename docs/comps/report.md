## HyReport 报表组件
<font color="red" size="4"> HyReport组件的ref固定使用hyReport!!!!!!!!!!</font><br/>
用于报表展示，通过配置实现一个报表页面的完整功能

### 基础功能

:::demo
```html
<div style="width: 100%;height: 600px;">
  <rd-report ref="hyReport" :headers="headers" :tableColumns="tableColumns" :httpConfig="httpConfig"></rd-report>
</div>
<script>
export default {
  data() {
    return {
      /** 报表头部的按钮 TOCUS 这部分的数据需要根据实际需要哪些按钮去配置 */
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
                type: 'select',
                label: '分类名称'
              }
            },
            dropList: {
              typeName: []
            }
          }
        },
        // 刷新按钮
        refresh: {
          type: 'refresh',
          label: '刷新'
        }
      },
      tableColumns: [
        {
          label: '分类编码',
          prop: 'typeCode',
          sortProp: 'TypeCode',
          sortable: 'custom',
          filters: true
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
      httpConfig: {
        url: "http://222.244.145.28:7089/SYS_TableType/QueryTableTypePage",
        paramFormatter: (params)=>{
          params.formno = '118020';
          return params;
        }
      },
    }
  },
  mounted(){
    let options = [
      {
        label: '全部',
        value: -1
      }
    ];
    this.headers.search.props.dropList.typeName.push({
        label: '全部',
        value: -1
      });
  },
  methods: {
    init(){
    },
  }
}
</script>
```
:::


### 基础功能

:::demo
```html
<div style="width: 100%;height: 600px;">
<rd-report
  ref="hyReport"
  :table="table"
  :headers="headers"
  :tableColumns="tableColumns"
  :httpConfig="httpConfig"
  @table-click="tableClick"
  @row-item-click="rowItemClick"
  @row-change="rowChange"
  @selection-change="selectionChange"
  @sort-change="sortChange" >
  <span slot="batchEdit" slot-scope="scope">
    头部-{{scope.slotName}}
  </span>
  <div slot="typeName" slot-scope="scope">
    我使用了插槽{{scope.value}}
  </div>
  <span slot="parentName" slot-scope="scope">
    插槽{{scope.column.label}}
  </span>
</rd-report>
</div>
<script>
export default {
  data() {
    return {
      authorization: '',
      table: {
        multipleTable: true,
        visibleCols: true,
      },
      headers: {
        add: {
          label: '修改'
        },
        batchEdit:{
          type: 'slot',
          label: '删除'
        },
        search: {
          type: 'search',
          label: '高级搜索',
          props: {
            formConfig: {
              key1: {
                type: 'input',
                label: '表单名称'
              },
              key5: {
                type: 'input',
                label: '主题'
              },
              key3: {
                type: 'input',
                label: '单号'
              },
            },
            value: {
              companyCode: '0',
              key1: '',
              key2: '2022050601',
              key3: '',
              key5: '',
              key6: '0',
              key7: '',
              key8: '',
              key9: '',
            },
            dropList: {
              key6: [{ label: '全部', value: '' }, { label: '显示', value: '0' }, { label: '隐藏', value: '1' }],
              key9: []
            }
          }
        },
        
      },
      tableColumns: [
        {
          label: '分类编码',
          prop: 'typeCode',
          sortProp: 'TASKID',
          sortable: 'custom',
          fixed: true,
        },
        {
          type: 'slot',
          label: '分类名称',
          prop: 'typeName',
          width: '120px',
          filters: true,
          sortable: true
        },
        {
          label: '分类描述',
          prop: 'typeDescribe',
          width: 250,
          sortable: true
        },
        {
          label: '父分类名称',
          prop: 'parentName',
          headerSlotName: 'parentName',
          width: 130,
          sortable: true
        },
        {
          type: 'operation',
          label: '操作',
          prop: 'operation',
          width: 150,
          operations: [
            {
              prop: 'view',
              label: '查看'
            },
            {
              prop: 'hide',
              label: '隐藏'
            }
          ]
        },
      ],
      httpConfig: {
        url: "http://222.244.145.28:7089/SYS_TableType/QueryTableTypePage",
      },
    }
  },
  mounted(){
    setTimeout(() => {
      this.headers.search.props.dropList.key9 = [{ label: '全部', value: '' }, { label: '已审批', value: '4' }, { label: '未审批', value: '0' }, { label: '已拒绝', value: '10003' }];
    }, 200);
  },
  methods: {
    init(){
      this.$refs.hyReport.authorization = this.authorization;
      this.$refs.hyReport.openSearch();
    },
    tableClick(params){
      console.log(params);
    },
    rowItemClick(params){
      console.log(params);
    },
    rowChange(params){
      console.log(params);
    },
    selectionChange(params){
      console.log(params);
    },
    sortChange(params){
      console.log(params);
    },
  },
}
</script>
```
:::


### Attributes
| 参数         | 说明                                      | 类型   | 可选值 | 默认值 |
| ------------ | ----------------------------------------- | ------ | ------ | ------ |
| table        | 表格配置（同hy-table）                    | object | —      | —      |
| headers      | 表头部配置（同hy-table）                  | object | —      | —      |
| tableColumns | 表格列配置（同hy-table）                  | array  | —      | []     |
| tableData    | 表格数据（同hy-table）                    | array  | —      | []     |
| httpConfig   | 请求配置                                  | object | —      | —      |
| pagination   | 分页配置，Pagination 分页的所有Attributes | object | —      | —      |



### Slot
| name                   | 说明           |
| ---------------------- | -------------- |
| tableColumns的slotName | 表格的内容     |
| headers的slotName      | 表格头部的内容 |


### Events
| 事件名称         | 说明                                       | 回调参数                 |
| ---------------- | ------------------------------------------ | ------------------------ |
| loadData         | 加载数据时触发                             | —                        |
| table-click      | 表格头部按钮点击事件                       | —                        |
| selection-change | 当选择项发生变化时会触发该事件             | —                        |
| sort-change      | 当表格的排序条件发生变化的时候会触发该事件 | —                        |
| row-change       | 行数据change事件                           | —                        |
| row-item-click   | 行内元素点击事件，只支持部分type           | —                        |
| cell-click       | 当某个单元格被点击时会触发该事件           | row, column, cell, event |
| cell-dblclick    | 当某个单元格被双击击时会触发该事件         | row, column, cell, event |
| row-click        | 当某一行被点击时会触发该事件               | row, column, event       |
| row-contextmenu  | 当某一行被鼠标右键点击时会触发该事件       | row, column, event       |
| row-dblclick     | 当某一行被双击时会触发该事件               | row, column, event       |

### Headers
| 参数     | 说明                                                                                    | 类型   | 可选值                | 默认值 |
| -------- | --------------------------------------------------------------------------------------- | ------ | --------------------- | ------ |
| type     | 指定表格头部是内容                                                                      | string | —/slot/search/refresh | —      |
| prop     | header元素的key值                                                                       | string | —                     | —      |
| slotName | 当type为slot时，使用插槽的名称，默认取prop                                              | string | —                     | —      |
| props    | type为—的时候Button 按钮的所有Attributes属性，为search的时候为form-list的Attributes属性 | object | —                     | —      |

### HttpConfig
| 参数           | 说明                               | 类型               | 可选值   | 默认值 |
| -------------- | ---------------------------------- | ------------------ | -------- | ------ |
| immediate      | 是否在页面加载时初始化调用一次接口 | boolean            | —        | true   |
| url            | 接口请求的地址                     | string             | —        | —      |
| method         | 请求的方式                         | string             | post/get | post   |
| header         | 设置请求头                         | object             | —        | —      |
| paramFormatter | 请求入参的拦截回调                 | Function(params)   | —        | —      |
| dataFormatter  | 请求返回的数据的拦截回调           | Function(data,res) | —        | —      |
| isPaging       | 数据是否分页显示                   | boolean            | —        | true   |

### Methods
| 方法名     | 说明             | 参数 |
| ---------- | ---------------- | ---- |
| loadData   | 刷新数据         | —    |
| initHeight | 刷新页面布局高度 | —    |
| openSearch | 打开高级搜索弹窗 | —    |

