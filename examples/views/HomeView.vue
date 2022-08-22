<template>
  <div class="home">
    <el-button @click="test">点击</el-button>
    <el-button @click="test1">点击打开 Dialog</el-button>
    <rd-dialog :visible.sync="dialogVisible"></rd-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false
    };
  },
  methods: {
    test() {
      console.log(1);
      this.dialogVisible = true;
    },
    test1() {
      console.log(1);
      this.dialogVisible1 = true;
    },
    handleClose(done) {
      console.log(111);

      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {});
    }
  }
};
</script>
