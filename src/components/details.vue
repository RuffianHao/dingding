<!--
 * @Description: 
 * @Date: 2020-06-04 11:15:28
 * @LastEditTime: 2020-06-05 14:07:01
-->

<template>
  <div class="details">
    <div class="content">
      <template v-if="Array.isArray(goodsInfo)">
        <van-cell-group v-for="(item, index) in goodsInfo" :key="item.id" :title="`物品${index + 1}`">
          <van-cell title="名称" :value="item.name" />
          <van-cell title="规格" :value="item.memo" />
          <van-cell title="数量" :value="item.num" />
          <van-cell title="单价" :value="item.price" />
        </van-cell-group>
      </template>
      <template v-else>
        <van-cell-group v-if="detailsInfo">
          <van-cell title="名称" :value="detailsInfo.goods.name" />
          <van-cell title="规格" :value="detailsInfo.goods.memo" />
          <van-cell title="数量" :value="detailsInfo.num" />
          <van-cell title="单价" :value="detailsInfo.goods.price" />
        </van-cell-group>
      </template>
      <div class="info" v-cloak v-if="detailsInfo">
        <div><span class="label">申请人</span>{{ detailsInfo.user }}</div>
        <div><span class="label">申请原由: </span>{{ detailsInfo.reason }}</div>
        <div><span class="label">申请部门</span>{{ detailsInfo.department.name }}</div>
        <div><span class="label">期望时间</span>{{ detailsInfo.expectDate | formatDate }}</div>
        <div><span class="label">发起时间</span>{{ detailsInfo.create_time | formatTime }}</div>
        <div><span class="label">最近修改</span>{{ detailsInfo.update_time | formatTime }}</div>
        <div>
          <span class="label">当前状态</span>
          <strong style="  font-weight: 600;">
            <template v-if="detailsInfo.cancel">申请已取消</template>
            <template v-else> {{ detailsInfo.schedule | nowState }} </template>
          </strong>
        </div>
        <div v-if="detailsInfo.auditor">
          <span class="label">审批人</span><strong style="  font-weight: 600;">{{ detailsInfo.auditor }}</strong>
        </div>
      </div>
    </div>

    <div class="btnArr" v-cloak v-if="(detailsInfo.schedule === 0 && detailsInfo.cancel === false) || isShow === true">
      <div style="background:#fff" v-cloak>
        <van-button :disabled="lfDisabled" round type="danger" style="margin-right:25px" @click="leftClick()">{{ leftBtnText }}</van-button>
        <van-button :disabled="riDisabled" round type="primary" @click="rightClick()">{{ rightBtnText }}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resUrl: {
      type: String,
      required: true
    },
    id: {
      required: true
    },
    leftBtnText: {
      type: String,
      required: true
    },
    rightBtnText: {
      type: String,
      required: true
    },
    isShow: {
      type: Boolean,
      required: false
    },
    lfDisabled: {
      type: Boolean,
      required: false
    },
    riDisabled: {
      type: Boolean,
      required: false
    }
  },
  filters: {
    nowState: function(el) {
      switch (el) {
        case 0:
          return '待审核'

        case 1:
          return '通过'

        case 2:
          return '请求未通过'

        case 3:
          return '采购中'

        case 4:
          return '采购完成'
      }
    }
  },
  data() {
    return {
      goodsInfo: '',
      detailsInfo: ''
    }
  },
  methods: {
    // 获取数据
    async getDetails() {
      let { data } = await this.$request({
        url: this.resUrl,
        method: 'get',
        params: {
          id: this.id
        }
      })
      if (data.body.data.hasOwnProperty('application_items')) {
        this.goodsInfo = data.body.data.application_items
      } else {
        this.goodsInfo = data.body.data.goods
      }
      this.detailsInfo = data.body.data
      this.bthShow = data.body.data.cancel
    },
    leftClick() {
      this.$emit('leftClick')
    },
    rightClick() {
      this.$emit('rightClick')
    }
    // 通过审批
  },
  created() {
    this.getDetails()
  }
}
</script>
<style lang="less">
.info {
  padding: 15px;
  background: #fff;
  margin-top: 15px;
  div {
    padding: 2px 0;
    .label {
      color: #aaa;
      padding-right: 15px;
    }
  }
}
.details {
  margin-bottom: 60px;
}

.btnArr {
  width: 100%;
  text-align: right;
  // background: #fff;
  height: 60px;
  line-height: 60px;
  padding: 4px 10px 4px 0;
  position: fixed;
  bottom: 0;
  right: 0;
  overflow-y: scroll;
}
[v-cloak] {
  display: none;
}
</style>
