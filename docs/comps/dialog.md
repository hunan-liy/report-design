## HyDialog 统一风格的对话框
带有确定和取消按钮的对话框

### 基础功能

功能和dialog一致，使用文档请参考dialog

:::demo
```html

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
          upload: {
            type: 'upload',
            label: 'upload',
            col: 24,
            required: true,
          },
          radio: {
            type: 'radio',
            label: 'radradioradioradioio',
            col: 12,
            required: true,
          },
          checkbox: {
            type: 'checkbox',
            label: 'checkbox',
            col: 12,
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


### Attributes
| 参数              | 说明                                    | 类型    | 可选值 | 默认值  |
| ----------------- | --------------------------------------- | ------- | ------ | ------- |
| ...               | Dialog 对话框的所有Attributes属性       | —       | —      | —       |
| minWidth          | 对话框最小宽度                          | string  | —      | '600px' |
| showButton        | 是否显示底部按钮                        | boolean | —      | true    |
| confirmButtonText | 确定按钮的文本内容                      | string  | —      | '确认'  |
| cancelButtonText  | 取消按钮的文本内容                      | string  | —      | '取消'  |
| showConfirmButton | 是否显示确定按钮                        | boolean | —      | true    |
| showCancelButton  | 对话框最小宽度                          | boolean | —      | true    |
| clearValidate     | 是否在关闭时清空内部form-list的校验信息 | boolean | —      | true    |

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
