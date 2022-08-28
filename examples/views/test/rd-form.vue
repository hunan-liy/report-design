<template>
  <div>
    <rd-form
      ref="rdForm"
      v-model="forms"
      :config="config"
      :formConfig="formConfig"
      @change="formChange"
    >
    </rd-form>
    <el-button @click="getValue">获取当前值</el-button>
    <el-button @click="setValue">动态修改属性和值</el-button>
    <el-button @click="submitForm">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      config: {
        labelWidth: '200px',
        labelSuffix: '123',
        hideRequiredAsterisk: true,
        // showMessage: false,
        disabled: true,
        readonly: true
      },
      formConfig: {
        input: {
          type: 'input',
          label: 'input',
          props: {
            type: 'textarea',
            rows: 8
          },
          required: true
        }
      },
      // 设置初始值
      forms: {
        input: 'input'
      },
      // 选项数据值
      dropList: {}
    };
  },
  methods: {
    // 获取值
    getValue() {
      console.log(this.forms);
      let value = this.$refs.rdForm.getValue();
      console.log(value);
    },
    // 动态修改数据
    setValue() {
      // 修改配置项
      this.formConfig.text.label = '重置label';
      // 修改form的值
      this.forms.input = '这是修改的数据';
    },
    // 提交表单
    submitForm() {
      this.$refs.rdForm
        .submitForm()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置表单
    reset() {
      this.$refs.rdForm.resetFields();
    },
    // 表单所有元素的change事件
    formChange(params) {
      console.log(params);
    }
  }
};
</script>
