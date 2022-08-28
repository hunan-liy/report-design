<template>
  <div class="filters">
    <div class="filters-box" :class="isFold ? 'fold' : ''">
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
      <div class="form-box">
        <rd-form
          ref="rdForm"
          v-model="filtersData_"
          :config="config"
          :formConfig="formConfig_"
          class="form"
          @input="formDataChange"
          @submit="submitForm"
        >
          <template v-for="item in formSlots" v-slot:[item.slotName]="scope">
            <slot :name="item.slotName_topForm" v-bind="scope"></slot>
          </template>
          <template v-slot:filters-button>
            <div class="filters-button">
              <div class="button-box">
                <!-- 提交 -->
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-search"
                  @click="submitClick"
                  >查询</el-button
                >
                <!-- 重置 -->
                <el-button
                  size="small"
                  icon="el-icon-refresh"
                  @click="resetClick"
                  >重置</el-button
                >
              </div>
            </div>
          </template>
        </rd-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    /** filters配置 */
    filters: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      formConfig_: {}, // 存储用作展示的条件
      isShowFoldButton: false, // 是否要显示 展开/收起 按钮
      isFold: true, // 是否折叠状态
      formSlots: [],
      buttonIndex: 0,
      filtersData_: {},
      dropList: {}
    };
  },
  watch: {
    filters: {
      handler(newVal) {
        this.initData(newVal);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    initData(data) {
      let { config = {}, formConfig = {}, value = {}, dropList = {} } = data;
      this.initConfig(config);
      this.initFormConfig(formConfig);
      this.filtersData_ = value;
      this.dropList = dropList;
    },

    initConfig(config) {
      let { size = 'small', col = 6 } = config;
      this.config = {
        size,
        col,
        ...config
      };
    },

    initFormConfig(formConfig) {
      let formConfigArray = Object.entries(formConfig);
      let formConfig_ = {};

      let { col = 6 } = this.config;
      let length = 24 / col;

      if (formConfigArray.length > length) {
        this.isShowFoldButton = true;
      } else {
        this.isShowFoldButton = false;
      }

      formConfigArray.map(([prop, ele], index) => {
        formConfig_[prop] = {
          ...ele
        };
        if (formConfigArray.length > length && index === length - 2) {
          let prop_ = '&rd_filters' + Math.ceil(Math.random() * 10000);
          formConfig_[prop_] = {
            type: 'slot',
            slotName: 'filters-button',
            slotType: 'item',
            hidden: () => {
              return !this.isFold;
            }
          };
        }
      });

      let prop_1 = '&rd_filters' + Math.ceil(Math.random() * 10000);
      formConfig_[prop_1] = {
        type: 'slot',
        slotName: 'filters-button',
        slotType: 'item',
        hidden: () => {
          return this.isFold;
        }
      };
      this.formConfig_ = formConfig_;
      console.log('this.formConfig_', this.formConfig_);
    },

    // initFormConfig(formConfig) {
    //   let formConfigArray = Object.entries(formConfig);
    //   let formConfig_ = {};

    //   if (formConfigArray.length > 4) {
    //     this.isShowFoldButton = true;
    //   } else {
    //     this.isShowFoldButton = false;
    //   }

    //   let width = 0;
    //   let formWidth =
    //     this.$refs.rdForm.$el.clientWidth -
    //     20 -
    //     this.$refs.rdForm.$el.clientWidth * 0.2;
    //   formConfigArray.map(([prop, ele], index) => {
    //     if (!ele.col && !ele.width) {
    //       ele.col = this.config.col ? this.config.col : 8;
    //     }

    //     if (ele.col) {
    //       width = formWidth * (ele.col / 24);
    //     } else if (ele.width) {
    //       let w = 0;
    //       if (ele.width.indexOf('px') !== -1) {
    //         w = parseFloat(ele.width.split('px')[0]);
    //       } else if (ele.width.indexOf('%') !== -1) {
    //         w = (formWidth * parseFloat(ele.width.split('%')[0])) / 100;
    //       }
    //       width = width + w;
    //     }

    //     formConfig_[prop] = {
    //       width,
    //       ...ele
    //     };
    //     if (formConfigArray.length > 4 && index === 3) {
    //       let prop_ = '&rd_filters' + Math.ceil(Math.random() * 10000);
    //       formConfig_[prop_] = {
    //         type: 'slot',
    //         slotName: 'filters-button',
    //         slotType: 'item',
    //         width: '20%',
    //         hidden: () => {
    //           return !this.isFold;
    //         }
    //       };
    //     }
    //   });

    //   let prop_1 = '&rd_filters' + Math.ceil(Math.random() * 10000);
    //   formConfig_[prop_1] = {
    //     type: 'slot',
    //     slotName: 'filters-button',
    //     slotType: 'item',
    //     width: '20%',
    //     hidden: () => {
    //       return this.isFold;
    //     }
    //   };
    //   this.formConfig_ = formConfig_;
    //   console.log('this.formConfig_', this.formConfig_);
    // },

    /** 展开/收起 按钮点击事件 */
    flodClick(type) {
      if (type === '1') {
        // 展开
        this.isFold = false; // 状态设置为展开
      } else {
        // 收起
        this.isFold = true; // 状态设置为收起
      }
      this.$emit('flodClick', type);
    },

    /** 查询按钮点击事件 */
    submitClick() {
      this.$refs.rdForm.submitForm();
    },
    /** 重置按钮点击事件 */
    resetClick() {
      this.$refs.rdForm.resetForm();
      this.summit();
    },

    /** 整个组件的submit事件 通知父组件请求接口 */
    summit() {
      // 因为from表单组件中没有包含tab的值，所以不能用form表单返回的参数，只能使用this.filtersData_
      this.$emit('submit', this.getFormData());
    },

    /** 获取表单数据值 */
    getFormData() {
      // 删除自动填充的key
      let data = {};
      if (this.filtersData_) {
        Object.keys(this.filtersData_).forEach((ele) => {
          if (ele.indexOf('&rd_filters') === -1) {
            data[ele] = this.filtersData_[ele];
          }
        });
      }
      return data;
    },

    formDataChange() {
      this.$emit('merge', this.getFormData());
    },

    submitForm() {
      this.summit();
    }
  }
};
</script>
<style lang="scss" scoped>
.filters {
  width: 100%;
  background-color: #f5f7fa;
  border-radius: 5px;
  padding-top: 15px;

  .fold {
    height: 49px;
  }

  .filters-box {
    position: relative;
    padding-right: 90px;
    overflow: hidden;

    .fold-button {
      position: absolute;
      top: 0;
      right: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 32px;
      padding-left: 5px;
      color: #4ba2ff;
      font-size: 14px;
      background: #fff;
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
  }
  .form-box {
    padding: 0 10px 0 10px;

    ::v-deep {
      .form-wrap .form-item {
        margin-bottom: 15px;
      }
    }

    .filters-button {
      display: flex;
      align-items: baseline;
      width: 100%;
      height: 34px;
      margin-bottom: 20px;
      padding-left: 20px;

      .button-box {
        display: flex;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
