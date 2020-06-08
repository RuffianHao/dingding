<!--
 * @Description: 理事申请
 * @Date: 2020-05-28 16:34:19
 * @LastEditTime: 2020-06-04 16:18:46
-->
<template>
  <div class="applied">
    <van-dropdown-menu overlay>
      <van-dropdown-item @change="stateChange" v-model="dropdownValue" :options="option" get-container=".applied" />
    </van-dropdown-menu>

    <van-list :immediate-check="immedFlag" offset="50" v-model="loading" :finished="finished" finished-text="没有更多了!" @load="onLoad" :border="false">
      <van-cell v-for="item in list" :key="item.id" :title="item.goods.name" is-link :to="{ path: `/receive/details/${item.id}` }">
        <template #label> 申请时间:{{ item.create_time | formatDate }} </template>
        <span :style="{ color: item.cancel === true ? '#ccc' : item.color }">{{ item.cancel === true ? '已取消' : item.chState }}</span>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'applied',
  data() {
    return {
      dropdownValue: 0,
      option: [
        { text: '进行中', value: 0 },
        { text: '已完成', value: 1 }
      ],
      list: [],
      page_size: 10,
      page_num: 1,
      loading: false,
      finished: false,
      history: 0, //默认为0（获取当前正在进行中的） 1（获取历史数据，已完成的）
      immedFlag: true
    }
  },
  methods: {
    getColor(items) {
      items.data.forEach((el) => {
        switch (el.schedule) {
          case 0:
            el.chState = '待审核'
            el.color = '#F5A623'
            break
          case 1:
            el.chState = '通过'
            el.color = '#7ED321'
            break
          case 2:
            el.chState = '不通过'
            el.color = '#D0021B'
            break
          case 3:
            el.chState = '采购中'
            el.color = '#F5A623'
            break
          case 4:
            el.chState = '采购完成'
            el.color = '#7ED321'
            break
        }
      })
      return items
    },
    // 历史申请
    async getAllData(page) {
      let { data } = await this.$request({
        url: 'receive',
        method: 'get',
        params: {
          page_num: page,
          page_size: this.page_size,
          history: this.history
        }
      })
      let items = this.getColor(data.body)
      return items
    },
    // 进行/完成 状态切换
    async stateChange() {
      this.history = this.dropdownValue
      this.list = []
      this.page_num = 1
      this.finished = false
      this.loading = true
      if (this.loading) {
        this.onLoad()
      }
    },
    async onLoad() {
      setTimeout(async () => {
        const items = await this.getAllData(this.page_num)
        if (this.list.length > 0 && items.page_num == 1) {
          return
        }
        this.list.push(...items.data)

        this.page_num = this.page_num + 1

        if (items.has_next == false) {
          this.finished = true
        }
        // 关闭上拉loading
        this.loading = false
      }, 1000)
    }
  },
  created() {}
}
</script>

<style></style>
