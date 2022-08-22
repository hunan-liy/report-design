<template>
  <div>
    <rd-table
      :table="table"
      :headers="headers"
      :tableColumns="tableColumns"
      :tableData="tableData"
      :dropList="dropList"
      @row-item-click="rowClick"
      @row-change="rowChange"
    >
      <div slot="test" slot-scope="scope">我使用了插槽{{ scope.value }}</div>
      <span slot="header1" slot-scope="scope">
        插槽-{{ scope.column.label }}
      </span>
      <span slot="headerSlot" slot-scope="scope">
        头部-{{ scope.slotName }}
      </span>
    </rd-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      table: {
        multipleTable: true,
        visibleCols: true
      },
      headers: {
        add: {
          label: '修改'
        },
        batchEdit: {
          label: '删除'
        },
        batchDelete: {
          label: '删除',
          hidden: () => {
            return true;
          }
        },
        headerSlot: {
          type: 'slot'
        }
      },
      tableColumns: [
        {
          label: '月份',
          prop: 'month',
          minWidth: 100,
          sortable: true
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
                }
              ],
              /** 请求接口相关配置 */
              httpConfig: {
                // TOCUS 请求数据的接口
                url: 'http://222.244.145.28:7089/SYS_TableType/QueryTableTypePage'
              }
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
            disabled: (row, column, value, index) => {
              if (index === 2) {
                return true;
              }
              return false;
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
              label: '删除1'
            },
            {
              prop: 'delete',
              label: '删除2'
            },
            {
              prop: 'delete',
              label: '删除3'
            },
            {
              prop: 'delete',
              label: '删除4'
            },
            {
              prop: 'delete',
              label: '删除5'
            }
          ]
        }
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
          checkbox: true
        },
        {
          id: 2,
          month: '2022-06',
          test: '插槽数据2',
          name: '吴彦祖',
          link: '链接文字',
          switch: true,
          selectDialog: null,
          jobNumber: '124578963',
          inputNumber: '2',
          avatar:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          html: '<p>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>',
          sex: 2,
          checkbox: false
        },
        {
          id: 3,
          month: '2022-07',
          test: '插槽数据3',
          name: '刘德华',
          link: '链接文字',
          switch: false,
          selectDialog: null,
          jobNumber: '124578963',
          inputNumber: '2',
          avatar:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          html: '<p>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>',
          sex: 2,
          checkbox: true
        },
        {
          id: 4,
          month: '2022-08',
          test: '插槽数据4',
          name: '古天乐',
          link: '链接文字',
          switch: true,
          selectDialog: null,
          jobNumber: '124578963',
          inputNumber: '2',
          avatar:
            'https://fuss10.elemecdn.com/e/5d/4a731a905941a4af5f44c0c25941171jpeg.jpeg',
          html: '<p>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>',
          sex: 1,
          checkbox: true
        }
      ],
      dropList: {
        sex: [
          {
            label: '男',
            value: 1
          },
          {
            label: '女',
            value: 2
          }
        ]
      },
      row_record: null
    };
  },
  methods: {
    rowClick(params) {
      console.log('你点击了行内元素', params);
    },
    rowChange(params) {
      console.log('你change', params);
    }
  }
};
</script>
