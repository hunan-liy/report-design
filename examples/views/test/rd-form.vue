<template>
  <div>
    <rd-form
      ref="formList"
      v-model="forms"
      :config="config"
      :formConfig="formConfig"
      :dropList="dropList"
      @change="formChange"
    >
      <div slot="username123" slot-scope="scope">我使用了插槽</div>
      <div slot="username1" slot-scope="scope">全部都是插槽哦</div>
    </rd-form>
    <el-button @click="test1">获取当前值</el-button>
    <el-button @click="test2">动态修改属性和值</el-button>
    <el-button @click="test3">提交</el-button>
    <el-button @click="test4">重置</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      config: {
        size: 'small',
        labelWidth: '130px'
        // readonly: true
      },
      formConfig: {
        id: {
          hidden: true
        },
        date: {
          label: '日期'
          // hidden: ()=>{
          //   return true
          // },
        },
        customer: {
          type: 'input',
          label: '客户',
          required: true
        },
        selectDialog: {
          type: 'selectDialog',
          label: 'selectDialog',
          col: 24,
          props: {
            // multiple: true,
            rowProps: {
              value: 'typeCode',
              label: 'typeName'
            },
            reportConfig: {
              headers: {
                // 高级搜索按钮
                search: {
                  type: 'search',
                  label: '高级搜索',
                  props: {
                    // TOCUS 高级搜索按钮打开的表单需要根据业务需求去配置
                    formConfig: {
                      typeCode: {
                        type: 'input',
                        label: '分类编码'
                      },
                      typeName: {
                        type: 'input',
                        label: '分类名称'
                      }
                    }
                  }
                },
                // 刷新按钮
                refresh: {
                  type: 'refresh',
                  label: '刷新'
                }
              },
              /** TOCUS 表格列头配置 */
              tableColumns: [
                {
                  label: '分类编码',
                  prop: 'typeCode',
                  sortProp: 'TypeCode',
                  sortable: 'custom'
                },
                {
                  label: '分类名称',
                  prop: 'typeName',
                  sortProp: 'TypeName',
                  sortable: 'custom'
                },
                {
                  label: '分类描述',
                  prop: 'typeDescribe',
                  sortProp: 'TypeDescribe',
                  sortable: 'custom'
                },
                {
                  label: '父分类名称',
                  prop: 'parentName',
                  sortProp: 'ParentName',
                  sortable: 'custom'
                }
              ],
              /** 请求接口相关配置 */
              httpConfig: {
                // TOCUS 请求数据的接口
                url: 'http://222.244.145.28:7089/SYS_TableType/QueryTableTypePage'
              }
            }
          },
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
          label: 'radio',
          col: 12,
          required: true
        },
        checkbox: {
          type: 'checkbox',
          label: 'checkbox',
          col: 12,
          required: true
        },
        inputNumber: {
          type: 'inputNumber',
          label: 'inputNumber',
          col: 12,
          required: true
        },
        serialNumber: {
          type: 'select',
          label: '系列号',
          col: 24,
          required: true
        },
        cascader: {
          type: 'cascader',
          label: 'cascader',
          col: 12,
          required: true
        },
        switch: {
          type: 'switch',
          label: 'switch',
          col: 12,
          required: true
        },
        slider: {
          type: 'slider',
          label: 'slider',
          col: 24,
          required: true
        },
        timePicker: {
          type: 'timePicker',
          label: 'timePicker',
          col: 12,
          required: true
        },
        datePicker: {
          type: 'datePicker',
          label: 'datePicker',
          propGroup: ['datePicker1', 'datePicker2'],
          props: {
            type: 'daterange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期'
          },
          col: 24,
          required: true
        },
        rate: {
          type: 'rate',
          label: 'rate',
          col: 12,
          required: true
        },
        colorPicker: {
          type: 'colorPicker',
          label: 'colorPicker',
          col: 12,
          required: true
        },
        transfer: {
          type: 'transfer',
          label: 'transfer',
          col: 24,
          props: {
            data: [
              {
                key: 1,
                label: '备选项1'
              },
              {
                key: 2,
                label: '备选项2'
              },
              {
                key: 3,
                label: '备选项3'
              },
              {
                key: 4,
                label: '备选项4',
                disabled: true
              },
              {
                key: 5,
                label: '备选项5'
              }
            ]
          },
          required: true
        },
        username: {
          type: 'slot',
          slotName: 'username123',
          label: '我是插槽哦',
          width: '50%'
        },
        username1: {
          type: 'slot',
          slotType: 'item',
          label: '我是插槽哦',
          width: '300px'
        },
        remark: {
          type: 'input',
          label: '备注',
          col: 24,
          props: {
            type: 'textarea',
            rows: 4,
            placeHolder: '请输入备注'
          }
        }
      },
      forms: {
        id: 123123,
        date: '2022-05-11',
        customer: '客户1',
        selectDialog: {
          label: '测试分类',
          value: 'TES'
        },
        checkbox: ['B', 'c'],
        upload: [
          {
            downUrl: 'Files/guest/false/749181.txt',
            extension: '.txt',
            fileId: 749181,
            isCdn: true,
            name: '新建文本文档.txt',
            originalName: '新建文本文档.txt',
            type: 'files',
            uid: 'file',
            url: 'resources/files/2022-05-25/350defb8-fe13-4ca4-9140-803fd9d25134.txt',
            viewPath: 'http://222.244.145.28:7303/Files/view/749181.pdf',
            viewUrl: 'Files/view/749181.pdf'
          }
        ],
        radio: 'B',
        inputNumber: 12,
        serialNumber: 'A',
        cascader: ['zujian', 'basic', 'layout']
      },
      dropList: {
        serialNumber: [
          { label: 'A系列', value: 'A' },
          { label: 'B系列', value: 'B' },
          { label: 'C系列', value: 'c' }
        ],
        radio: [
          { label: 'A系列', value: 'A' },
          { label: 'B系列', value: 'B' },
          { label: 'C系列', value: 'c' }
        ],
        checkbox: [
          { label: 'A系列', value: 'A' },
          { label: 'B系列', value: 'B' },
          { label: 'C系列', value: 'c' }
        ],
        cascader: [
          {
            value: 'zhinan',
            label: '指南',
            children: [
              {
                value: 'shejiyuanze',
                label: '设计原则',
                children: [
                  {
                    value: 'yizhi',
                    label: '一致'
                  },
                  {
                    value: 'fankui',
                    label: '反馈'
                  },
                  {
                    value: 'xiaolv',
                    label: '效率'
                  },
                  {
                    value: 'kekong',
                    label: '可控'
                  }
                ]
              },
              {
                value: 'daohang',
                label: '导航',
                children: [
                  {
                    value: 'cexiangdaohang',
                    label: '侧向导航'
                  },
                  {
                    value: 'dingbudaohang',
                    label: '顶部导航'
                  }
                ]
              }
            ]
          },
          {
            value: 'zujian',
            label: '组件',
            children: [
              {
                value: 'basic',
                label: 'Basic',
                children: [
                  {
                    value: 'layout',
                    label: 'Layout 布局'
                  },
                  {
                    value: 'color',
                    label: 'Color 色彩'
                  },
                  {
                    value: 'typography',
                    label: 'Typography 字体'
                  },
                  {
                    value: 'icon',
                    label: 'Icon 图标'
                  },
                  {
                    value: 'button',
                    label: 'Button 按钮'
                  }
                ]
              }
            ]
          },
          {
            value: 'ziyuan',
            label: '资源',
            children: [
              {
                value: 'axure',
                label: 'Axure Components'
              },
              {
                value: 'sketch',
                label: 'Sketch Templates'
              },
              {
                value: 'jiaohu',
                label: '组件交互文档'
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    test1() {
      console.log(this.forms);
    },
    test2() {
      this.formConfig.date.label = '开始日期';
      this.formConfig.serialNumber.col = 16;
      this.forms.remark = '这是修改的数据';
    },
    test3() {
      this.$refs.formList
        .submitForm()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formChange(params) {
      console.log(params);
    },
    test4() {
      this.$refs.formList.resetForm();
    }
  }
};
</script>
