<template>
  <rd-select-dialog
    v-model="selectDialog"
    :reportConfig="reportConfig"
    :rowProps="rowProps"
    @change="selectDialogChange"
  >
  </rd-select-dialog>
</template>
<script>
export default {
  data() {
    return {
      selectDialog: {
        value: 4,
        label: '卢军'
      },
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
      // test: { left:'200px'}
    };
  },
  methods: {
    selectDialogChange(val, rows) {
      console.log(val, this.selectDialog, rows);
    }
  }
};
</script>
