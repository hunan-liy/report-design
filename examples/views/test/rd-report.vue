<template>
  <div class="page">
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
</template>
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
};
</script>
<style scoped>
.page {
  width: 100%;
  height: 100%;
}
</style>
