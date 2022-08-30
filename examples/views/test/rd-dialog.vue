<template>
  <div>
    <el-button type="text" @click="dialogVisible = true" id="test"
      >点击打开 Dialog</el-button
    >
    <rd-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :clearValidate="false"
      :before-close="handleClose"
    >
      <rd-form ref="formList" :formConfig="formConfig">
        <!-- <span>111</span> -->
      </rd-form>
    </rd-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      formConfig: {
        customer: {
          type: 'input',
          label: '客户',
          required: true
        },
        upload: {
          type: 'upload',
          label: 'upload',
          col: 24,
          required: true
        },
        radio: {
          type: 'radio',
          label: 'radradioradioradioio',
          col: 12,
          required: true
        },
        checkbox: {
          type: 'checkbox',
          label: 'checkbox',
          col: 12,
          required: true
        }
      }
      // test: { left:'200px'}
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
v-deep .el-dialog {
  padding: 0;
}

.el-table__header.el-table__body {
  margin: 0;
}
/* 重置 markdown 表格样式 start */
.el-table__header,
.el-table__body {
  margin: 0;
}

.el-table {
  table {
    display: table;

    tr {
      background-color: #fff;
    }
  }

  th,
  td {
    border: none;
  }
}

/* 重置 markdown 表格样式 end */

/* 重置 markdown 日期表格样式 start */
.el-picker-panel {
  table {
    margin: 0;
    display: table;
    border-spacing: 0;

    tr {
      border: 0;
      background-color: #fff;
    }

    th,
    td {
      border: 0;
    }
  }

  .el-date-table th {
    border-bottom: solid 1px #ebeef5;
  }
}

// .el-table__header,
// .el-table__body {
//     margin: 0;
// }

// .el-table table {
//     display: table;
// }

// .el-table table tr {
//     background-color: #fff;
// }

// .el-table th,td {
//     border: none;
// }

// .el-picker-panel table {
//     margin: 0;
//     display: table;
//     border-spacing: 0;
// }

// .el-picker-panel table tr {
//     border: 0;
//     background-color: #fff;
// }

// .el-picker-panel table th,td {
//     border: 0;
// }

// .el-picker-panel .el-date-table th {
//     border-bottom: solid 1px #ebeef5;
// }
</style>
