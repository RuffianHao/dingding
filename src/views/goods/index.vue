<!--
 * @Description: 商品录入
 * @Date: 2020-05-25 10:36:26
 * @LastEditTime: 2020-05-29 15:49:29
-->
<template>
  <div class="purchase">
    <van-form @submit="onSubmit">
      <!-- 物品详情 -->

      <div class="details">
        <van-field
          error-message-align="right"
          required
          v-model="formdata.name"
          name="物品名称"
          label="物品名称"
          placeholder="请输入"
          input-align="right"
          :rules="[
            {
              required: true,
              message: '请填写物品名称'
            }
          ]"
        />
        <van-field
          error-message-align="right"
          required
          v-model="formdata.num"
          type="number"
          name="数量"
          label="数量"
          placeholder="请输入"
          input-align="right"
          :rules="[{ required: true, message: '请填写数量' }]"
        />
        <van-field
          required
          error-message-align="right"
          v-model="formdata.memo"
          type="text"
          name="规格"
          label="规格"
          placeholder="如:24/箱"
          :rules="[
            {
              required: true,
              message: '请填写规格'
            }
          ]"
          input-align="right"
        />
        <van-field v-model="formdata.price" type="number" name="价格" label="价格" placeholder="请输入" input-align="right" />
      </div>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        name: null,
        memo: null,
        price: '0.00',
        num: null
      }
    }
  },
  methods: {
    async onSubmit() {
      var newData = {}
      Object.keys(this.formdata).forEach((key) => {
        if (this.formdata[key] !== '') {
          if (key === 'price') {
            newData[key] = parseFloat(this.formdata[key])
          }
          newData[key] = this.formdata[key]
        }
      })
      try {
        let { id } = this.$route.params
        var method = 'post'
        if (id) {
          method = 'put'
        }
        let { data } = await this.$request({
          url: 'goods',
          method: method,
          data: {
            ...newData
          }
        })
        if (data.status == 200) {
          this.$toast('提交成功')
          this.$router.push('stock')
        } else {
          this.$toast('提交失败')
        }
      } catch (error) {
        this.$toast.fail(error)
      }
    },
    async getModify() {
      let { id } = this.$route.params
      if (id) {
        let { data } = await this.$request({
          url: 'goods',
          method: 'get',
          params: {
            id
          }
        })
        this.formdata = data.body.data[0]
      }
    }
  },
  created() {
    this.getModify()
  }
}
</script>

<style lang="less" scoped>
.purchase {
  .van-form {
    & > .van-cell {
      margin-top: 20px;
    }
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
</style>
