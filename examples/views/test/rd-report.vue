<template>
  <div class="page">
    <rd-report
      ref="hyReport"
      :filters="filters"
      :headers="headers"
      :tableColumns="tableColumns"
      :httpConfig="httpConfig"
    ></rd-report>
  </div>
</template>
<script>
export default {
  data() {
    return {
      authorization: '',
      filters: {
        formConfig: {
          typeCode: {
            type: 'input',
            label: '分类编码'
          },
          typeName: {
            type: 'select',
            label: '分类名称'
          },
          typeCode1: {
            type: 'input',
            label: '分类编码'
          },
          typeName1: {
            type: 'select',
            label: '分类名称'
          },
          typeCode2: {
            type: 'input',
            label: '分类编码'
          },
          typeName2: {
            type: 'select',
            label: '分类名称'
          }
        },
        dropList: {
          typeName: []
        }
      },
      /** 报表头部的按钮 TOCUS 这部分的数据需要根据实际需要哪些按钮去配置 */
      headers: {
        // 刷新按钮
        refresh: {
          label: '刷新'
        }
      },
      tableColumns: [
        {
          label: '姓名',
          prop: 'userName',
          filters: true
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
        url: 'https://www.fastmock.site/mock/de66cd0ff6569e78bb9857a0e42035f9/report-design/getReportData',
        paramFormatter: (params) => {
          params.formno = '118020';
          return params;
        }
      }
    };
  },
  mounted() {},
  methods: {
    init() {}
  }
};
</script>
<style scoped>
.page {
  width: 100%;
  height: 100%;
}
</style>
