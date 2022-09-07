## RdReport 报表组件
用于报表展示，通过配置实现一个报表页面的完整功能

### 基础功能

:::demo
```html
<div style="width: 100%;height: 600px;">
  <rd-report
    ref="rdReport"
    :filters="filters"
    :headers="headers"
    :tableColumns="tableColumns"
    :httpConfig="httpConfig"
    @header-click="headerClick"
    @row-item-click="rowItemClick"
  ></rd-report>
</div>
<script>
export default {
  data() {
    return {
      filters: {
        config: {
          col: 12
        },
        formConfig: {
          userName: {
            type: 'input',
            label: '姓名'
          },
          age: {
            type: 'select',
            label: '年龄'
          },
          sex: {
            type: 'input',
            label: '性别'
          },
          birthday: {
            type: 'select',
            label: '生日'
          },
          email: {
            type: 'input',
            label: '邮箱'
          },
          address: {
            type: 'select',
            label: '地址'
          }
        },
        dropList: {
          typeName: []
        }
      },
      headers: {
        add: {
          label: '新增'
        }
      },
      tableColumns: [
        {
          label: '姓名',
          prop: 'userName',
          sortable: 'custom',
          sortProp: 'userName'
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
            },
          ]
        },
      ],
      httpConfig: {
        url: 'https://www.fastmock.site/mock/de66cd0ff6569e78bb9857a0e42035f9/report-design/getReportData'
      }
    }
  },
  mounted(){
  },
  methods: {
    headerClick(params){
      console.log(params);
      let { clickItem } = params;
      let { prop } = clickItem || {};
      if(prop === 'add'){
        console.log('你点击了新增按钮');
      }
    },
    rowItemClick(params){
      console.log(params);
      let { clickItem } = params;
      let { prop } = clickItem || {};
      if(prop === 'edit'){
        console.log('你点击了修改按钮');
      }else if(prop === 'delete'){
        console.log('你点击了删除按钮');
      }
    },
  }
}
</script>
```
:::


### 通过requestMethod加载数据
在项目中我们一般会封装好类似于axios等公共的请求方法，可以将封装好的请求方法赋值给requestMethod，这样report组件最后加载数据时的token，接口报错的提示都能用我们统一封装好的东西
:::demo
```html
<div style="width: 100%;height: 600px;">
  <rd-report
    ref="rdReport"
    :filters="filters"
    :headers="headers"
    :tableColumns="tableColumns"
    :httpConfig="httpConfig"
    @header-click="headerClick"
    @row-item-click="rowItemClick"
  ></rd-report>
</div>
<script>
export default {
  data() {
    return {
      filters: {
        config: {
          col: 12
        },
        formConfig: {
          userName: {
            type: 'input',
            label: '姓名'
          },
          age: {
            type: 'select',
            label: '年龄'
          },
          sex: {
            type: 'input',
            label: '性别'
          },
          birthday: {
            type: 'select',
            label: '生日'
          },
          email: {
            type: 'input',
            label: '邮箱'
          },
          address: {
            type: 'select',
            label: '地址'
          }
        },
        dropList: {
          typeName: []
        }
      },
      headers: {
        add: {
          label: '新增'
        }
      },
      tableColumns: [
        {
          label: '姓名',
          prop: 'userName',
          sortable: 'custom',
          sortProp: 'userName'
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
            },
          ]
        },
      ],
      httpConfig: {
        requestMethod: this.requestMethod
      }
    }
  },
  mounted(){
  },
  methods: {
    // 处理请求
    requestMethod(params, requestConfig){
      return new Promise((resolve, reject)=>{
        // 模拟请求接口
        setTimeout(() => {
          let data = [
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
          resolve({
            status: 1,
            code: 1002,
            data: {
              list: data,
              total: 6,
              pageNum: 1
            }
          })
        }, 100);
      })
    },
    headerClick(params){
      console.log(params);
      let { clickItem } = params;
      let { prop } = clickItem || {};
      if(prop === 'add'){
        console.log('你点击了新增按钮');
      }
    },
    rowItemClick(params){
      console.log(params);
      let { clickItem } = params;
      let { prop } = clickItem || {};
      if(prop === 'edit'){
        console.log('你点击了修改按钮');
      }else if(prop === 'delete'){
        console.log('你点击了删除按钮');
      }
    },
  }
}
</script>
```
:::


### 通过tableData设置数据
通过监听组件的loadData事件去请求数据并赋值给tableData进行展示
:::demo
```html
<div style="width: 100%;height: 600px;">
  <rd-report
    ref="rdReport"
    :filters="filters"
    :headers="headers"
    :tableColumns="tableColumns"
    :tableData="tableData"
    :pagination="pagination"
    @loadData="loadData"
    @header-click="headerClick"
    @row-item-click="rowItemClick"
  ></rd-report>
</div>
<script>
export default {
  data() {
    return {
      filters: {
        config: {
          col: 12
        },
        formConfig: {
          userName: {
            type: 'input',
            label: '姓名'
          },
          age: {
            type: 'select',
            label: '年龄'
          },
          sex: {
            type: 'input',
            label: '性别',

          },
          birthday: {
            type: 'select',
            label: '生日'
          },
          email: {
            type: 'input',
            label: '邮箱'
          },
          address: {
            type: 'select',
            label: '地址'
          }
        },
        dropList: {
          typeName: []
        }
      },
      headers: {
        add: {
          label: '新增'
        }
      },
      tableColumns: [
        {
          label: '姓名',
          prop: 'userName',
          sortable: 'custom',
          sortProp: 'userName'
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
            },
          ]
        },
      ],
      tableData: [],
      pagination: {
        total: 0
      }
    }
  },
  mounted(){
  },
  methods: {
    // 处理请求
    loadData(params){
      return new Promise((resolve, reject)=>{
        // 模拟请求接口
        setTimeout(() => {
          let data = [
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
          this.tableData = data;
          this.pagination.total = 6;
        }, 100);
      })
    },
    headerClick(params){
      console.log(params);
      let { clickItem } = params;
      let { prop } = clickItem || {};
      if(prop === 'add'){
        console.log('你点击了新增按钮');
      }
    },
    rowItemClick(params){
      console.log(params);
      let { clickItem } = params;
      let { prop } = clickItem || {};
      if(prop === 'edit'){
        console.log('你点击了修改按钮');
      }else if(prop === 'delete'){
        console.log('你点击了删除按钮');
      }
    },
  }
}
</script>
```
:::


### 不分页
可以通过设置httpConfig.isPaging 为false来控制组件不分页，这样可以一次请求加载全部数据
:::demo
```html
<div style="width: 100%;height: 600px;">
  <rd-report
    ref="rdReport"
    :filters="filters"
    :headers="headers"
    :tableColumns="tableColumns"
    :httpConfig="httpConfig"
    @header-click="headerClick"
    @row-item-click="rowItemClick"
  ></rd-report>
</div>
<script>
export default {
  data() {
    return {
      filters: {
        config: {
          col: 12
        },
        formConfig: {
          userName: {
            type: 'input',
            label: '姓名'
          },
          age: {
            type: 'select',
            label: '年龄'
          },
          sex: {
            type: 'input',
            label: '性别'
          },
          birthday: {
            type: 'select',
            label: '生日'
          },
          email: {
            type: 'input',
            label: '邮箱'
          },
          address: {
            type: 'select',
            label: '地址'
          }
        },
        dropList: {
          typeName: []
        }
      },
      headers: {
        add: {
          label: '新增'
        }
      },
      tableColumns: [
        {
          label: '姓名',
          prop: 'userName',
          sortable: 'custom',
          sortProp: 'userName'
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
            },
          ]
        },
      ],
      httpConfig: {
        url: 'https://www.fastmock.site/mock/de66cd0ff6569e78bb9857a0e42035f9/report-design/getReportData',
        isPaging: false
      }
    }
  },
  mounted(){
  },
  methods: {
    headerClick(params){
      console.log(params);
      let { clickItem } = params;
      let { prop } = clickItem || {};
      if(prop === 'add'){
        console.log('你点击了新增按钮');
      }
    },
    rowItemClick(params){
      console.log(params);
      let { clickItem } = params;
      let { prop } = clickItem || {};
      if(prop === 'edit'){
        console.log('你点击了修改按钮');
      }else if(prop === 'delete'){
        console.log('你点击了删除按钮');
      }
    },
  }
}
</script>
```
:::


### 插槽
:::demo
```html
<div style="width: 100%;height: 600px;">
  <rd-report
    ref="rdReport"
    :filters="filters"
    :headers="headers"
    :tableColumns="tableColumns"
    :httpConfig="httpConfig"
    @header-click="headerClick"
    @row-item-click="rowItemClick"
  >
    <div slot="filter_userName">
      <el-input v-model="filters.value.userName" placeholder="请输入姓名" @change="filterUserNameChange"></el-input>
    </div>
    <span slot="headerSlot">
      头部插槽
    </span>
    <div slot="userName" slot-scope="scope">
      插槽+{{scope.value}}
    </div>
  </rd-report>
</div>
<script>
export default {
  data() {
    return {
      filters: {
        config: {
          col: 12
        },
        formConfig: {
          userName: {
            type: 'slot',
            slotName: 'filter_userName',
            label: '姓名'
          },
          age: {
            type: 'select',
            label: '年龄'
          },
          sex: {
            type: 'input',
            label: '性别'
          },
          birthday: {
            type: 'select',
            label: '生日'
          },
          email: {
            type: 'input',
            label: '邮箱'
          },
          address: {
            type: 'select',
            label: '地址'
          }
        },
        value: {
          userName: '张三'
        },
        dropList: {
          typeName: []
        }
      },
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
          type: 'slot',
          label: '姓名',
          prop: 'userName'
        },
        {
          label: '年龄',
          prop: 'age'
        },
        {
          label: '性别',
          prop: 'sex',
          formatter: (row) => {
            let { sex } = row;
            if (sex === 1) {
              return '男';
            } else {
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
          ]
        }
      ],
      httpConfig: {
        url: 'https://www.fastmock.site/mock/de66cd0ff6569e78bb9857a0e42035f9/report-design/getReportData',
        isPaging: false
      }
    };
  },
  mounted() {},
  methods: {
    /** 插槽中使用的input的change事件 */
    filterUserNameChange(value){
      this.filters.value.userName = value;
    },
    headerClick(params) {
      console.log(params);
      let { clickItem } = params;
      let { prop } = clickItem || {};
      if (prop === 'add') {
        console.log('你点击了新增按钮');
      }
    },
    rowItemClick(params) {
      console.log(params);
      let { clickItem } = params;
      let { prop } = clickItem || {};
      if (prop === 'edit') {
        console.log('你点击了修改按钮');
      } else if (prop === 'delete') {
        console.log('你点击了删除按钮');
      }
    }
  }
}
</script>
```
:::


### Attributes
| 参数         | 说明                                                 | 类型   | 可选值 | 默认值 |
| ------------ | ---------------------------------------------------- | ------ | ------ | ------ |
| table        | 表格配置（同rd-table）                               | object | —      | —      |
| filters      | 过滤条件配置                                         | object | —      | —      |
| headers      | 表头部配置（同rd-table）                             | object | —      | —      |
| tableColumns | 表格列配置（同rd-table）                             | array  | —      | []     |
| tableData    | 表格数据（同rd-table）                               | array  | —      | []     |
| httpConfig   | 请求配置                                             | object | —      | —      |
| pagination   | 分页配置，ElementUI的Pagination 分页的所有Attributes | object | —      | —      |




### Events
| 事件名称         | 说明                                                                                                                     | 回调参数                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| loadData         | 加载数据时触发                                                                                                           | params（请求参数）       |
| loadSuccess      | 接口加载完成之后触发                                                                                                     | tableData                |
| reset            | 重置按钮点击事件                                                                                                         | —                        |
| header-click     | 表格头部按钮点击事件                                                                                                     | params                   |
| selection-change | 当选择项发生变化时会触发该事件                                                                                           | —                        |
| sort-change      | 当表格的排序条件发生变化的时候会触发该事件                                                                               | —                        |
| row-change       | 行数据change事件                                                                                                         | params                   |
| row-item-click   | 行内元素点击事件，只支持部分type                                                                                         | params                   |
| cell-click       | 当某个单元格被点击时会触发该事件                                                                                         | row, column, cell, event |
| cell-dblclick    | 当某个单元格被双击击时会触发该事件                                                                                       | row, column, cell, event |
| row-click        | 当某一行被点击时会触发该事件                                                                                             | row, column, event       |
| row-contextmenu  | 当某一行被鼠标右键点击时会触发该事件                                                                                     | row, column, event       |
| row-dblclick     | 当某一行被双击时会触发该事件                                                                                             | row, column, event       |
| expand-change    | 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded） | row, (expandedRows       | expanded) |




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
- rows 列的type为selectDailog时才会有，表示dialogSelect弹窗确定是弹窗中选中的行数据

#### row-item-click 行内元素点击事件，只支持部分type
- type 当前点击元素的类型
- prop 点击的列的prop
- index 点击的元素所对应的行下标
- row 点击元素所对应的行数据
- value 点击元素的值
- rows 列的type为selectDailog时才会有，表示dialogSelect弹窗确定是弹窗中选中的行数据
- clickItem 当前点击的对象
  - label 点击的按钮的label
  - prop 点击的按钮的prop

### Methods
| 方法名                    | 说明                                                                                                                           | 参数            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| loadData                  | 刷新数据                                                                                                                       | —               |
| initHeight                | 刷新页面布局高度                                                                                                               | —               |
| getRequestParams          | 获取组装完成后的接口请求参数                                                                                                   | —               |
| getTableData              | 获取表格数据                                                                                                                   | —               |
| clearSelection            | 用于多选表格，清空用户的选择                                                                                                   | —               |
|                           |
| toggleRowSelection        | 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）                    | row, selected   |
| toggleRowSelectionByIndex | 重写了table的toggleRowSelection，第一个参数为行下标（因为内部数据用深拷贝进行了隔离，所以只能用下标去获取内部数据的row再设置） | index, selected |
| toggleRowExpansion        | 用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）        | row, selected   |
| toggleRowExpansionByIndex | 重写了table的toggleRowExpansion，第一个参数为行下标（因为内部数据用深拷贝进行了隔离，所以只能用下标去获取内部数据的row再设置） | index, selected |
| toggleAllRowExpans        | 用于可展开表格与树形表格，切换所有行的展示状态                                                                                 | selected        |


### Slot
| name                   | 说明                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------- |
| tableColumns的slotName | 表格的内容，头部插槽参数为 { column, $index }，内容插槽参数为 { row, column, $index } |
| headers的slotName      | 表格头部的内容，参数为 { ...header的属性, selections }                                |


### Filters
rd-form组件的配置
| 参数       | 说明                                   | 类型   | 可选值 | 默认值 |
| ---------- | -------------------------------------- | ------ | ------ | ------ |
| config     | 表单组件整体配置                       | object | —      | {}     |
| formConfig | 表单元素配置项                         | object | —      | {}     |
| value      | 初始化数据值                           | object | —      | {}     |
| dropList   | 表单中下拉项的数据与formConfig配合使用 | object | —      | {}     |

### HttpConfig
report数据请求的方式有三种：
- 第一种是外部直接请求好数据，通过tableData设置report的值
- 第二种是通过内置的ajax进行数据请求，url(完整路径，必填)、method、header三个配置就是给这种方式使用的
- 第三种是通过传一个封装好的请求，这个请求需要返回一个Promise（推荐使用这种方式）

| 参数              | 说明                                                                                                           | 类型                                         | 可选值   | 默认值 |
| ----------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | -------- | ------ |
| immediate         | 是否在页面加载时初始化调用一次接口                                                                             | boolean                                      | —        | true   |
| url               | 接口请求的地址                                                                                                 | string                                       | —        | —      |
| method            | 请求的方式                                                                                                     | string                                       | post/get | post   |
| header            | 设置请求头                                                                                                     | object                                       | —        | —      |
| requestMethod     | 封装好的请求方法，必须通过返回Promise返回请求结果，params是处理好的请求参数                                    | Function(params, requestConfig, httpLoading) | —        | —      |
| requestConfig     | 给requestMethod使用的参数                                                                                      | object                                       | —        | —      |
| interceptRequest  | 对请求参数进行拦截，可以自定义处理，要求返回请求参数，filters为过滤条件数据，page为分页数据，order为排序数据   | Function({filters, page, order}, httpConfig) | —        | —      |
| interceptResponse | 对接口返回数据进行拦截，可自定义处理，要求返回{tableData, total}，tableData是展示使用的数据，total为数据总条数 | Function({res, httpConfig)                   | —        | —      |
| paramFormatter    | 功能同interceptRequest，请求入参的拦截，params是处理interceptRequest好的请求参数，要求返回请求参数             | Function(params)                             | —        | —      |
| dataFormatter     | 功能同interceptResponse，但是这里只处理tableData，请求返回的数据的拦截回，要求返回tableData                    | Function(data,res)                           | —        | —      |
| isPaging          | 数据是否分页显示                                                                                               | boolean                                      | —        | true   |


