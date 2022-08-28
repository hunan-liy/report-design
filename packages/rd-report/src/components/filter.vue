<template>
  <div class="top-form">
    <div class="jyf-form" :class="isFold ? 'fold' : ''">
      <div v-if="isShowFoldButton" class="fold-button">
        <div v-if="isFold" class="fold-button-item" @click="flodClick('1')">
          展开
          <i style="margin-left: 2px" class="el-icon-arrow-down"></i>
        </div>
        <div v-else class="fold-button-item" @click="flodClick('2')">
          收起
          <i style="margin-left: 2px" class="el-icon-arrow-up"></i>
        </div>
      </div>
      <j-form
        ref="jyfForm"
        :formConfig="formConfig"
        :formData.sync="filtersData_"
        class="form"
        @update:formData="updateFormData"
        @change="formDataChange"
        @submit="submitForm"
      >
        <template v-for="item in formSlots" v-slot:[item.slotName]="scope">
          <slot :name="item.slotName_topForm" v-bind="scope"></slot>
        </template>
        <template v-slot:form-button>
          <div class="jyf-button">
            <!-- 提交 -->
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
              @click="submitClick"
              >查询</el-button
            >
            <!-- 重置 -->
            <el-button size="small" icon="el-icon-refresh" @click="resetClick"
              >重置</el-button
            >
          </div>
        </template>
      </j-form>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      isFold: true
    }
  }
}
</script>
// <script lang="ts">
// import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
// import { cloneDeep } from 'lodash-es';
// import JForm from '../../../form/index';
// import commJs from '../../../libs/comm';
// import JTabs from '../../../tabs/index';

// @Component({
//   name: 'topForm',
//   components: {
//     JForm,
//     JTabs
//   }
// })
// export default class topForm extends Vue {
//   /** 组件名称，ts方式需要定义该属性，否则打包后找不到name */
//   static componentName = 'topForm';

//   $refs!: {
//     jyfForm: JForm | any;
//   };

//   @Prop({
//     type: [Array, Object]
//   })
//   filters;

//   @Prop({
//     type: Object
//   })
//   filtersData;

//   @Prop({
//     type: Boolean
//   })
//   httpLoading;

//   topTabs = null;
//   formConfigAll = []; // 存储所有的条件
//   formConfig = []; // 存储用作展示的条件
//   isShowFoldButton = false; // 是否要显示 展开/收起 按钮
//   isFold = true; // 是否折叠状态
//   formSlots = [];
//   buttonIndex = 0;
//   filtersData_ = {};

//   @Watch('filters', {
//     deep: true,
//     immediate: true
//   })
//   filtersChange(newValue) {
//     this.initData(newValue);
//   }

//   @Watch('filtersData', {
//     deep: true,
//     immediate: true
//   })
//   filtersDataChange(newValue) {
//     this.filtersData_ = cloneDeep(newValue);
//   }

//   // 初始化数据
//   initData(data) {
//     let _data = cloneDeep(data);
//     if (data) {
//       this.formConfig = [];
//       _data.forEach((ele) => {
//         // 将tabs过滤出来
//         if (ele.type && ele.type === 'tabs') {
//           this.topTabs = cloneDeep(ele);
//         } else {
//           // 解析slot
//           if (ele.type === 'slot' && !ele.slotName_topForm) {
//             if (!ele.slotName) {
//               ele.slotName = ele.prop;
//             }
//             ele.slotName_topForm = ele.slotName;
//             ele.slotName = ele.slotName + '-topForm';
//             this.formSlots.push(ele);
//           }
//           this.formConfig.push(cloneDeep(ele));
//         }
//       });
//       this.$nextTick(() => {
//         this.setformConfig();
//       });
//     }
//   }
//   // 展开/收起 按钮点击事件
//   flodClick(type) {
//     if (type === '1') {
//       // 展开
//       this.formConfig[this.buttonIndex].hidden = true;
//       this.formConfig[this.formConfig.length - 1].hidden = false;
//       this.isFold = false; // 状态设置为展开
//     } else {
//       // 收起
//       this.formConfig[this.buttonIndex].hidden = false;
//       this.formConfig[this.formConfig.length - 1].hidden = true;
//       this.isFold = true; // 状态设置为收起
//     }
//     this.$emit('flodClick', type);
//   }
//   // 设置收起状态时的formConfig的值
//   setformConfig() {
//     let width = 0;
//     let formWidth = this.$refs.jyfForm.$el.clientWidth - 20;
//     this.formConfig.forEach((ele, i) => {
//       if (ele.col) {
//         width = width + formWidth * (ele.col / 24);
//       } else if (ele.width) {
//         let w = 0;
//         if (ele.width.indexOf('px') !== -1) {
//           w = parseFloat(ele.width.split('px')[0]);
//         } else if (ele.width.indexOf('%') !== -1) {
//           w = (formWidth * parseFloat(ele.width.split('%')[0])) / 100;
//         }
//         width = width + w;
//       }
//       if (width + formWidth * 0.2 <= formWidth) {
//         this.buttonIndex = i + 1;
//       } else {
//         this.isShowFoldButton = true;
//       }
//     });
//     this.formConfig.splice(this.buttonIndex, 0, {
//       type: 'slot',
//       prop: 'el_component' + Math.ceil(Math.random() * 10000),
//       slotName: 'form-button',
//       slotType: 'item',
//       width: '20%',
//       hidden: !this.isFold
//     });
//     this.formConfig.push({
//       type: 'slot',
//       prop: 'el_component' + Math.ceil(Math.random() * 10000),
//       slotName: 'form-button',
//       slotType: 'item',
//       width: '20%',
//       hidden: this.isFold
//     });
//   }
//   // 是否显示权限
//   isHasPermission(item) {
//     if (item.permission) {
//       return commJs.isHasPermission(item.permission);
//     } else {
//       return true;
//     }
//   }
//   // 查询按钮点击事件
//   submitClick() {
//     this.$refs.jyfForm.submitForm();
//   }
//   // 重置按钮点击事件
//   resetClick() {
//     this.$refs.jyfForm.resetFields();
//     this.summit();
//   }
//   // form表单change事件
//   formDataChange(params) {
//     this.$emit('change', params);
//   }
//   // form表单提交事件
//   submitForm() {
//     this.summit();
//   }
//   // 页签点击事件
//   // tabsClick(tabItem) {
//   //   if (!this.httpLoading) {
//   //     if (this.filtersData_[this.topTabs.prop] === tabItem.value) {
//   //       return;
//   //     }
//   //     if (!this.filtersData_[this.topTabs.prop]) {
//   //       this.$set(this.filtersData_, this.topTabs.prop, tabItem.value);
//   //     } else {
//   //       this.filtersData_[this.topTabs.prop] = tabItem.value;
//   //     }
//   //     this.$emit('change', {
//   //       [this.topTabs.prop]: tabItem.value,
//   //     });
//   //     this.summit();
//   //   }
//   // },
//   tabsChange(tabItem) {
//     this.$emit('change', tabItem);
//     this.summit();
//   }
//   // 整个组件的submit事件 通知父组件请求接口
//   summit() {
//     // 因为from表单组件中没有包含tab的值，所以不能用form表单返回的参数，只能使用this.filtersData_
//     this.$emit('submit', this.getFormData());
//   }
//   // 获取表单数据值
//   getFormData() {
//     // 删除自动填充的key
//     let data = {};
//     if (this.filtersData_) {
//       Object.keys(this.filtersData_).forEach((ele) => {
//         if (ele.indexOf('el_component') === -1) {
//           data[ele] = this.filtersData_[ele];
//         }
//       });
//     }
//     return data;
//   }
//   // 响应form组件中的update:formData事件
//   updateFormData() {
//     this.$emit('update:filtersData', this.getFormData());
//   }
// }
// </script>
<style lang="scss" scoped>
.filter {
  box-sizing: border-box;
  padding: 5px 20px 0;
  background-color: #fff;
  border-radius: 10px;

  div {
    box-sizing: border-box;
  }

  .jyf-tabs {
    display: flex;
    padding: 15px 0 9px;
    color: #999;
    font-size: 16px;
    font-family: PingFangSC-Medium, 'PingFang SC', sans-serif;
    border-bottom: 1px solid #eeeff5;

    .tabs-item {
      position: relative;
      margin-right: 60px;
      padding: 0 0 10px;
      cursor: pointer;

      .badge {
        position: absolute;
        top: -16px;
        right: -15px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 20px;
        color: red;
        font-weight: normal;
        font-size: 12px;
        background: rgba(255, 255, 255, 1);
        border-radius: 12px;
        box-shadow: 0 3px 6px 0 rgba(222, 224, 234, 1);
      }

      .active-circle {
        position: absolute;
        bottom: 0;
        left: calc(50% - 2px);
        width: 4px;
        height: 4px;
        background: rgba(51, 51, 51, 1);
        border-radius: 50%;
      }
    }

    .active {
      color: #333;
      font-weight: bold;
    }
  }

  .jyf-form {
    position: relative;
    padding-right: 90px;
    overflow: hidden;

    .fold-button {
      position: absolute;
      top: 15px;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 32px;
      padding-left: 5px;
      color: #4ba2ff;
      font-size: 14px;
      background: rgba(244, 245, 250, 1);
      border-radius: 100px 0 0 100px;
      cursor: pointer;

      .fold-button-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    }

    .form {
      padding: 15px 0 0;
    }
  }

  .fold {
    height: 69px;
  }

  .jyf-button {
    display: flex;
    width: 100%;
    height: 34px;
    margin-bottom: 20px;
  }

  .primary {
    border: 1px solid #409eff;
  }

  .success {
    border: 1px solid #67c23a;
  }

  .info {
    border: 1px solid #909399;
  }

  .warning {
    border: 1px solid #e6a23c;
  }
  .danger {
    border: 1px solid #f56c6c;
  }
}
</style>
