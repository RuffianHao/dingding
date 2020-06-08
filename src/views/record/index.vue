<!--
 * @Description: 
 * @Date: 2020-04-27 17:55:49
 * @LastEdittime: 2020-05-13 10:59:55
 -->
<template>
  <div class="home">
    <!-- <Header title="历史记录" /> -->
    <van-list offset="500" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell @click="show = true">
        <template #title>
          <span style="color:#999;font-size:16px">
            {{ $moment(currentDate).format('YYYY-MM') }}
            <van-icon name="arrow-down" />
          </span>
        </template>
      </van-cell>
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker v-model="currentDate" type="year-month" :formatter="formatter" :min-date="minDate" :max-date="maxDate" @confirm="confirm" />
      </van-popup>
      <!-- <van-cell
        center
        v-for="(item, index) in list"
        :key="index"
        :title="item.name"
        value="内容"
        size="large"
      >
        <template #label>
          <p>{{ item.in_time | formatDate }}</p>
        </template>
        <div class="history-info">
          <span class="change_num"
            >{{ item.change_type === "1" ? "+" : "-" }}{{ item.number }}</span
          >
          <p class="stock_num">库存剩余 100</p>
          <p class="remark">备注:{{ item.memo }}</p>
        </div>
      </van-cell> -->
      <van-collapse class="history-info" v-model="activeNames">
        <van-collapse-item :label="item.create_time | formatDate" v-for="item in list" :key="item.tid" :name="item.id">
          <template #title> {{ item.goods }} </template>
          <template #value>
            <span class="change_num" style="color:orange" v-if="item.event === 0"> + {{ item.num }} </span>
            <span class="change_num" style="color:red" v-else-if="item.event === 1"> - {{ item.num }} </span>
            <span class="change_num" style="color:orange" v-else-if="item.event === 2"> +{{ item.num }} </span>
            <span class="change_num" style="color:red" v-else-if="item.event === 3">
              删除
            </span>
            <div v-if="item.event !== 3">{{ item.event | cnState }}</div>
          </template>
          <div class="detail">
            <p>操作人:{{ item.user }}</p>
            <p>操作时间:{{ item.create_time | formatTime }}</p>
            <p v-if="item.event !== 3">仓库剩余:{{ item.remaining }}</p>
            <p class="remark" v-if="item.memo">备注:{{ item.memo }}</p>
          </div>
        </van-collapse-item>
      </van-collapse>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'history',
  filters: {
    cnState: function(val) {
      switch (val) {
        case 0:
          return '采购'

        case 1:
          return '领用'

        case 2:
          return '创建'

        case 3:
          return '删除'
      }
    }
  },
  data() {
    return {
      list: [],
      store_id: this.$route.query.id,
      page_num: 1,
      page_size: 10,
      loading: false,
      finished: false,
      date: '',
      minDate: new Date(2020, 1, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      show: false,
      activeNames: []
    }
  },
  methods: {
    async onLoad() {
      setTimeout(async () => {
        const body = await this.getData()
        if (this.list.length > 0 && body.page_num == 1) {
          return
        }
        this.list.push(...body.data)

        this.page_num = this.page_num + 1

        if (body.has_next == false) {
          this.finished = true
        }
        // 关闭上拉loading
        this.loading = false
      }, 1000)
    },
    showPopup() {
      this.show = true
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      return val
    },
    confirm(value) {
      this.show = false
      this.page_num = 1
      this.list = []
      this.onLoad()
      // var year = value.getFullYear()
      // var month = value.getMonth() + 1
      // this.date = `${year}年${month}月`
    },
    async getData() {
      const { data } = await this.$request({
        url: `ghistory`,
        method: 'get',
        params: {
          // store_id: this.store_id,
          page_num: this.page_num,
          page_size: this.page_size,
          date: this.$moment(this.currentDate).format('YYYY-MM')
        }
      })
      return data.body
    }
  },
  created() {}
}
</script>
<style lang="less" scoped>
.history-info {
  .change_num {
  }
  .stock_num {
  }
  p {
    padding: 0;
    margin: 0;
    font-weight: 500;
    font-size: 14px;
    margin: 4px 0;
  }
}
</style>
