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
