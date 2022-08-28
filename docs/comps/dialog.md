## Dialog 对话框
基本功能和用法与element-ui的对话框一样，只是对其进行了扩展

### 基础功能

Dialog 弹出一个对话框，适合需要定制性更大的场景。

:::demo 需要设置visible属性，它接收Boolean，当为true时显示 Dialog。Dialog 分为两个部分：body和footer，footer需要具名为footer的slot。title属性用于定义标题，它是可选的，默认值为空。最后，本例还展示了before-close的用法。默认footer有确定和取消按钮。
```html
<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
<rd-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="60%"
  :before-close="handleClose">
    <span>这是一段信息</span>
</rd-dialog>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        formConfig: {
          customer: {
            type: 'input',
            label: '客户',
            required: true,
          },
        }
        // test: { left:'200px'}
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>
```
:::

### 关闭时清空内部form的校验

通过clearValidate控制弹窗被关闭时是否清空内部form的校验信息，默认为true，适合新增/修改业务时的弹窗。

:::demo 
```html
<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
<rd-dialog
  title="提示"
  :visible.sync="dialogVisible"
  :clearValidate="true"
  @confirm="confirm">
    <rd-form ref="rdForm" :formConfig="formConfig"></rd-form>
</rd-dialog>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        formConfig: {
          userName: {
            type: 'input',
            label: '姓名',
            required: true,
          },
        }
      };
    },
    methods: {
      confirm() {
        this.$refs.rdForm.submitForm();
      }
    }
  };
</script>
```
:::


### Attributes
| 参数                  | 说明                                                                                                   | 类型                                 | 可选值 | 默认值  |
| --------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------ | ------ | ------- |
| visible               | 是否显示                                                                     Dialog，支持 .sync 修饰符 | boolean                              | —      | false   |
| title                 | Dialog 的标题，也可通过具名 slot （见下表）传入                                                        | string                               | 提示   | —       |
| width                 | Dialog 的宽度                                                                                          | string                               | —      | 50%     |
| fullscreen            | 是否为全屏 Dialog                                                                                      | boolean                              | —      | false   |
| top                   | Dialog CSS 中的 margin-top 值                                                                          | string                               | —      | 15vh    |
| modal                 | 是否需要遮罩层                                                                                         | boolean                              | —      | true    |
| modal-append-to-body  | 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上                           | boolean                              | —      | true    |
| append-to-body        | Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true                           | boolean                              | —      | false   |
| lock-scroll           | 是否在 Dialog 出现时将 body 滚动锁定                                                                   | boolean                              | —      | true    |
| custom-class          | Dialog 的自定义类名                                                                                    | string                               | —      | —       |
| close-on-click-modal  | 是否可以通过点击 modal 关闭 Dialog                                                                     | boolean                              | —      | true    |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog                                                                       | boolean                              | —      | true    |
| show-close            | 是否显示关闭按钮                                                                                       | boolean                              | —      | true    |
| before-close          | 关闭前的回调，会暂停 Dialog 的关闭                                                                     | function(done)，done 用于关闭 Dialog | —      | —       |
| center                | 是否对头部和底部采用居中布局                                                                           | boolean                              | —      | false   |
| destroy-on-close      | 关闭时销毁 Dialog 中的元素                                                                             | boolean                              | —      | false   |
| minWidth              | 对话框最小宽度                                                                                         | string                               | —      | '600px' |
| showButton            | 是否显示底部按钮                                                                                       | boolean                              | —      | true    |
| confirmButtonText     | 确定按钮的文本内容                                                                                     | string                               | —      | '确认'  |
| cancelButtonText      | 取消按钮的文本内容                                                                                     | string                               | —      | '取消'  |
| showConfirmButton     | 是否显示确定按钮                                                                                       | boolean                              | —      | true    |
| showCancelButton      | 是否显示取消按钮                                                                                         | boolean                              | —      | true    |
| clearValidate         | 是否在关闭时清空内部form-list的校验信息                                                                | boolean                              | —      | true    |

### Slot
| name   | 说明                    |
| ------ | ----------------------- |
| —      | Dialog 的内容           |
| title  | Dialog 标题区的内容     |
| footer | Dialog 按钮操作区的内容 |

### Events
| 事件名称 | 说明                        | 回调参数 |
| -------- | --------------------------- | -------- |
| open     | Dialog 打开的回调           | —        |
| opened   | Dialog 打开动画结束时的回调 | —        |
| close    | Dialog 关闭的回调           | —        |
| closed   | Dialog 关闭动画结束时的回调 | —        |
| confirm  | 确定按钮点击事件            | —        |
| cancel   | 取消按钮点击事件            | —        |
