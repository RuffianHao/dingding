<!--
 * @Description: 理事申请
 * @Date: 2020-05-28 16:34:19
 * @LastEditTime: 2020-06-08 11:33:02
-->
<template>
  <div class="applied">
    <van-tabs v-model="active" animated :sticky="true" @change="tabChange">
      <!-- 申请采购 -->
      <van-tab :title="`${$route.params.id ? '修改申请' : '申请采购'}`">
        <van-form ref="formData" @submit="onSubmit" validate-trigger validate-first>
          <!-- 申请理由 -->
          <van-field
            required
            error-message-align="right"
            v-model="formData.reason"
            name="申请理由"
            label="申请理由"
            placeholder="如:日常办公"
            input-align="right"
            :rules="[
              {
                required: true,
                message: '请填写申请理由'
              }
            ]"
          />
          <!-- 期望日期 -->
          <van-field
            required
            readonly
            error-message-align="right"
            v-model="formData.expectDate"
            is-link
            name="expectDate"
            label="期望日期"
            placeholder="请选择期望日期"
            input-align="right"
            :rules="[
              {
                required: true,
                message: '请输入正确的日期格式',
                pattern: datePattern
              }
            ]"
            @focus="dateFocus"
          >
          </van-field>

          <!-- 申请部门 -->
          <van-field
            required
            readonly
            error-message-align="right"
            v-model="departmentArr.name"
            name="申请部门"
            label="申请部门"
            placeholder="请选择"
            input-align="right"
            is-link
            :rules="[
              {
                required: true,
                message: '请选择你的部门'
              }
            ]"
            @focus="depFocus()"
          >
          </van-field>
          <!-- 物品详情 -->
          <div class="detailsBox">
            <div class="details" v-for="(item, index) in formData.details" :key="index">
              <p class="title">物品详情</p>
              <van-field
                readonly
                error-message-align="right"
                required
                is-link
                v-model="item.name"
                name="物品名称"
                label="物品名称"
                placeholder="请选择"
                input-align="right"
                :rules="[
                  {
                    required: true,
                    message: '请填写物品名称'
                  }
                ]"
                @focus="nameFocus(index)"
              />
              <van-field
                error-message-align="right"
                required
                v-model="item.num"
                type="number"
                name="数量"
                label="数量"
                placeholder="请输入"
                input-align="right"
                :rules="[{ required: true, message: '请填写数量' }]"
              />
              <van-field class="readonly" readonly v-model="item.memo" type="text" name="规格" label="规格" placeholder="" input-align="right"> 132</van-field>
              <van-field class="readonly" v-model="item.price" type="number" name="价格" label="价格" placeholder="" input-align="right" readonly />
            </div>
            <!-- 添加物品 -->
            <div class="addItem">
              <span class="tps">如果采购多种产品，请点击“增加明细”</span>
              <div @click="addItem()" class="addBtn">
                +添加明细
              </div>
            </div>
          </div>
          <!-- BUTTON -->
          <div style="margin-top:16px">
            <van-button round block type="info" native-type="submit">
              提交
            </van-button>
            <template v-if="$route.params.id">
              <van-button style="margin-top:15px" round block type="primary" @click="cancelSub">
                取消修改
              </van-button>
            </template>
          </div>
        </van-form>
      </van-tab>
      <!-- 我的申请 -->
      <van-tab title="我的申请">
        <MyApply ref="MyApply"></MyApply>
      </van-tab>
    </van-tabs>
    <!-- 物品选择弹层 -->
    <van-popup position="bottom" v-model="popupShow">
      <van-picker value-key="name" show-toolbar :columns="goods" @confirm="goodsConfirm" @cancel="onCancel" ref="picker" />
    </van-popup>
    <!-- 部门选择弹层 -->
    <van-popup position="bottom" v-model="depPopupShow">
      <van-picker value-key="name" show-toolbar :columns="goods" @confirm="depConfirm" @cancel="onCancel" />
    </van-popup>
    <!-- 日期 -->
    <van-popup position="bottom" v-model="datePupupShow">
      <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="dateConfirm" />
    </van-popup>
  </div>
</template>

<script>
import MyApply from './my-apply'
export default {
  components: { MyApply },
  name: 'purchase',
  data() {
    return {
      minDate: new Date(), // 最小日期
      maxDate: new Date(2025, 10, 1), // 最大日期
      currentDate: new Date(), // 当前日期
      active: this.$store.state.activeState.purActive, // tab 默认选项
      defaultUserFormSearch: {}, // 默认formdara的值
      formData: {
        reason: '', // 理由
        expectDate: null, // 期望日期
        details: [
          {
            name: '', //姓名
            id: '',
            num: null, // 数量
            memo: '',
            price: null
          }
        ],
        department: null
      },
      departmentArr: {}, // 部门列表
      datePattern: /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/, // 日期规则
      goods: [], // 物品选项
      popupShow: false, // 弹层状态
      depPopupShow: false,
      datePupupShow: false,
      nowIndex: '', // 当前点击的物品索引
      pickerIndex: 0 // 选择的物品索引
    }
  },
  methods: {
    // tab 切换
    tabChange(name) {
      this.active = name
      this.$store.commit('activeState/setPurActive', name)
    }, // 获取物品名称
    async getGoodsName() {
      let { data } = await this.$request({
        method: 'get',
        url: 'goods'
      })
      let newArr = data.body.data
      this.goods = newArr.map((item) => {
        return { id: item.id, name: item.name, price: item.price, memo: item.memo }
      })
    },
    // 部门确认
    depConfirm(val) {
      Object.keys(val).forEach((key) => {
        this.departmentArr[key] = val[key]
      })
      this.formData.department = val.id
      this.depPopupShow = false
    },
    // 物品确认
    goodsConfirm(val) {
      var details = this.formData.details[this.nowIndex]
      Object.keys(val).forEach((key) => {
        details[key] = val[key]
      })
      this.formData.details[this.nowIndex] = details
      this.popupShow = false
    },
    // 确认日期
    dateConfirm(date) {
      this.formData.expectDate = this.$moment(date).format('YYYY-MM-DD')
      this.datePupupShow = false
    },
    // 日期
    dateFocus() {
      this.datePupupShow = true
    },
    // 部门
    depFocus() {
      let userInfo = this.$store.state.user.userInfo
      this.goods = userInfo.departments
      this.depPopupShow = true
    },
    // 点击物品名称触发
    nameFocus(index) {
      this.getGoodsName() // 所有商品名
      this.nowIndex = index
      this.pickerIndex = this.goods.findIndex((item, item_index, arr) => {
        return item.name === this.formData.details[index].name
      })
      console.log(this.pickerIndex)
      if (this.pickerIndex != -1) {
        this.$refs.picker.setColumnIndex(0, this.pickerIndex)
      }

      this.popupShow = true
    },
    // 添加
    addItem() {
      this.formData.details.push({
        name: '',
        num: '',
        id: '',
        price: '',
        memo: ''
      })
    },
    //提交
    async onSubmit() {
      let method = ''
      if (this.$route.params.id) {
        method = 'PUT'
        this.formData.id = parseInt(this.$route.params.id)
      } else {
        method = 'POST'
      }
      let { data } = await this.$request({
        method: method,
        url: 'purchase',
        data: this.formData
      })
      if (data.status == 200) {
        this.$toast.success('申请成功')
        this.formData = JSON.parse(JSON.stringify(this.defaultUserFormSearch))
        this.departmentArr = {}
        this.active = 1
        setTimeout(() => {
          //     // 进行/完成 状态切换
          this.$refs.MyApply.stateChange()
        }, 10)
        this.$store.commit('activeState/setPurActive', 1)
      } else {
        this.$toast.fail(data.msg)
      }
    },

    // 取消
    onCancel() {
      this.popupShow = false
      this.depPopupShow = false
    },
    // 修改
    async getModify() {
      let { id } = this.$route.params

      if (id) {
        let { data } = await this.$request({
          url: 'purchase',
          method: 'get',
          params: {
            id
          }
        })
        let items = data.body.data
        this.formData.details = items.application_items
        this.formData.reason = items.reason
        this.formData.expectDate = this.$moment(items.expectDate).format('YYYY-MM-DD')
        this.departmentArr = items.department
        this.formData.department = items.department.id
      }
    },
    //cancelSub 取消修改
    cancelSub() {
      this.$router.push(`/purchase/details/${this.$route.params.id}`)
      this.formData = this.defaultUserFormSearch
    }
  },
  created() {
    // 保存默认formdata值
    this.defaultUserFormSearch = JSON.parse(JSON.stringify(this.formData))
    console.log(this.defaultUserFormSearch)
    // 修改
    this.getModify()
  }
}
</script>

<style lang="less" scoped>
.van-form {
  & > .van-cell {
    margin-top: 20px;
  }
}

.detailsBox {
  .details {
    .title {
      font-size: 14px;
      padding: 15px 15px;
      color: #aaa;
    }
  }
}
.addItem {
  .tps {
    font-size: 14px;
    color: #999;
  }
}
.addBtn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #1989fa;
  margin: 15px 0;
  background: #fff;
}
/deep/ .readonly {
  .van-field__control {
    color: #999;
  }
}
</style>
