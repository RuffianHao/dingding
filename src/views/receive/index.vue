<!--
 * @Description: 理事申请
 * @Date: 2020-05-28 16:34:19
 * @LastEditTime: 2020-06-09 10:25:00
-->
<template>
  <div class="applied">
    <van-tabs v-model="active" animated :sticky="true" @change="tabChange">
      <!-- 申请采购 -->
      <van-tab :title="`${$route.params.id ? '修改领用' : '领用采购'}`">
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
            <div class="details">
              <p class="title">物品详情</p>
              <van-field
                readonly
                error-message-align="right"
                required
                is-link
                v-model="formData.name"
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
                @focus="nameFocus()"
              />
              <van-field
                error-message-align="right"
                required
                v-model="formData.num"
                type="number"
                name="数量"
                label="数量"
                placeholder="请输入"
                input-align="right"
                :rules="[{ required: true, message: '请填写数量' }]"
              />
              <van-field readonly v-model="formData.memo" type="text" name="规格" label="规格" placeholder="" input-align="right" />
              <van-field v-model="formData.price" type="number" name="价格" label="价格" placeholder="" input-align="right" readonly />
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
      <van-tab title="我的领用">
        <MyApply ref="myApply"></MyApply>
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
  name: 'purchase',
  components: { MyApply },
  data() {
    return {
      minDate: new Date(), // 最小日期
      maxDate: new Date(2025, 10, 1), // 最大日期
      currentDate: new Date(), // 当前日期
      active: this.$store.state.activeState.receiveActive, // tab 默认选项
      defaultUserFormSearch: {}, // 默认formdara的值
      formData: {
        reason: '', // 理由
        expectDate: null, // 期望日期
        name: '', //姓名
        gid: '',
        num: null, // 数量
        memo: '',
        price: null,
        department: null
      },
      departmentArr: {}, // 部门列表
      datePattern: /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/, // 日期规则
      goods: [], // 物品选项
      popupShow: false, // 弹层状态
      depPopupShow: false,
      datePupupShow: false
    }
  },
  methods: {
    // tab 切换
    tabChange() {
      this.$store.commit('activeState/setReceiveActive', this.active)
    }, // 获取物品名称
    async getGoodsName() {
      let { data } = await this.$request({
        method: 'get',
        url: 'goods'
      })
      let newArr = data.body.data
      this.goods = newArr.map((item) => {
        return { gid: item.id, name: item.name, price: item.price, memo: item.memo }
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
      Object.keys(val).forEach((key) => {
        this.formData[key] = val[key]
      })
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
      this.goods = [
        { name: '中关村AIII组', id: 65556082 },
        { name: '丰台总部', id: 65556082 }
      ]
      alert(this.$store.state.user.userInfo)
      this.depPopupShow = true
    },
    // 点击物品名称触发
    nameFocus() {
      this.getGoodsName() // 所有商品名
      this.popupShow = true
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
        url: 'receive',
        data: this.formData
      })
      if (data.status == 201) {
        this.$toast.success('申请成功')
        this.formData = JSON.parse(JSON.stringify(this.defaultUserFormSearch))
        this.departmentArr = {}
        this.active = 1
        setTimeout(() => {
          //     // 进行/完成 状态切换
          this.$refs.myApply.stateChange()
        }, 10)
        this.$store.commit('activeState/setReceiveActive', this.active)
      } else {
        this.$toast.fail(data.msg)
      }
    },

    // 取消
    onCancel() {
      this.popupShow = false
      this.depPopupShow = false
      this.datePupupShow = false
    },
    // 修改
    async getModify() {
      let { id } = this.$route.params

      if (id) {
        let { data } = await this.$request({
          url: 'receive',
          method: 'get',
          params: {
            id
          }
        })
        let items = data.body.data
        Object.keys(items).forEach((key) => {
          this.formData[key] = items[key]
        })
        let goods = items.goods
        Object.keys(goods).forEach((key) => {
          this.formData[key] = goods[key]
        })
        this.formData.expectDate = this.$moment(this.formData.expectDate).format('YYYY-MM-DD')
        this.departmentArr = items.department
        this.formData.department = items.department.id
      }
    },
    //cancelSub 取消修改
    cancelSub() {
      this.$router.push(`/receive/details/${this.$route.params.id}`)
      this.formData = this.defaultUserFormSearch
    }
  },
  created() {
    // 保存默认formdata值
    this.defaultUserFormSearch = JSON.parse(JSON.stringify(this.formData))
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
</style>
