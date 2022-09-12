<template>
  <el-dialog
    ref="dialog"
    v-bind="_props"
    class="rd-dialog"
    :style="{
      '--minWidth': minWidth
    }"
    @update:visible="updateVisible"
    @open="open"
    @opened="opened"
    @close="close"
    @closed="closed"
  >
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <slot></slot>
    <template slot="footer">
      <span class="dialog-footer">
        <slot name="footer">
          <el-button v-if="showCancelButton" size="small" @click="cancel">{{
            cancelButtonText
          }}</el-button>
          <el-button
            v-if="showConfirmButton"
            type="primary"
            size="small"
            @click="confirm"
            >{{ confirmButtonText }}</el-button
          >
        </slot>
      </span>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: 'RdDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: false
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: true
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    width: {
      type: String,
      default: '50%'
    },

    fullscreen: Boolean,

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15vh'
    },
    beforeClose: Function,
    center: {
      type: Boolean,
      default: false
    },

    destroyOnClose: Boolean,

    /** 最小宽度 */
    minWidth: {
      type: String,
      default: '600px'
    },

    /** 确定按钮的文本内容 */
    confirmButtonText: {
      type: String,
      default: '确认'
    },

    /** 取消按钮的文本内容 */
    cancelButtonText: {
      type: String,
      default: '取消'
    },

    /** 是否显示确定按钮 */
    showConfirmButton: {
      type: Boolean,
      default: true
    },

    /** 是否显示取消按钮 */
    showCancelButton: {
      type: Boolean,
      default: true
    },

    /** 是否在关闭时清空form-list的校验 */
    clearValidate: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      visible: () => {
        if (this.clearValidate) {
          return this.visible;
        }
        return false;
      }
    };
  },
  methods: {
    /** 响应事件 */
    updateVisible(params) {
      this.$emit('update:visible', params);
    },
    open(params) {
      this.$emit('open', params);
    },
    opened(params) {
      this.$emit('opened', params);
    },
    close(params) {
      this.$emit('close', params);
    },
    closed(params) {
      this.$emit('closed', params);
    },

    /** 确认事件 */
    confirm() {
      this.$emit('confirm');
    },
    /** 取消事件
     * TODO 取消按钮也可以抛出取消事件，暂时没有这个需求，就未做处理
     */
    cancel() {
      // this.$emit('update:visible', false);
      // this.close();
      this.$emit('cancel');
      this.$refs.dialog.handleClose();
    }
  }
};
</script>
<style lang="scss" scoped>
.rd-dialog {
  $minWidth: var(--minWidth);

  ::v-deep {
    .el-dialog {
      min-width: $minWidth;
    }

    .el-dialog__body {
      position: relative;
      padding: 15px 15px 20px;
      max-height: 600px;
      overflow: hidden;
      overflow-y: auto;
    }

    .dialog-footer {
      display: flex;
      justify-content: center;
    }

    .is-fullscreen {
      display: flex;
      flex-direction: column;

      .el-dialog__body {
        flex: 1;
        height: 0;
        max-height: unset !important;
      }
    }
  }
}

@media screen and (max-height: 900px) {
  .el-dialog__body {
    max-height: 500px;
  }
}

@media screen and (max-height: 768px) {
  .el-dialog__body {
    max-height: 400px;
  }
}
</style>
