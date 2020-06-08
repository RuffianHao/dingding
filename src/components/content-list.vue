<!--
 * @Description: 审批页
 * @Date: 2020-05-22 12:08:15
 * @LastEditTime: 2020-06-08 16:39:18
-->
<template>
  <div class="audit">
    <van-tabs @change="stateChange" v-model="active" animated>
      <van-tab title="未审核">
        <van-list offset="50" v-model="loading" :finished="finished" finished-text="没有更多了!" @load="onLoad" :border="false">
          <van-cell v-for="item in list" :key="item.id" :title="item.user" :label="`部门:${item.department.name}`" :to="{ path: `${reqUrl}/details/${item.id}` }">
            <span :style="{ color: item.color }">{{ item.chState }}</span>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="已审核">
        <van-list offset="50" v-model="loading" :finished="finished" finished-text="没有更多了!" @load="onLoad" :border="false">
          <van-cell v-for="item in list" :key="item.id" :title="item.user" :label="`部门:${item.department.name}`" :to="{ path: `${reqUrl}/details/${item.id}` }">
            <span :style="{ color: item.cancel === true ? '#ccc' : item.color }">{{ item.cancel === true ? '已取消' : item.chState }}</span>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  props: ['reqUrl'],
  data() {
    return {
      active: 0,
      list: [],
      page_num: 1,
      page_size: 10,
      loading: false,
      finished: false,
      history: 0
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
    // 获取数据
    async getAllData() {
      let { data } = await this.$request({
        url: this.reqUrl,
        method: 'get',
        params: {
          history: this.history,
          page_size: this.page_size,
          page_num: this.page_num
        }
      })
      this.getColor(data.body)
      return data.body
      // this.list = data.body.data
    },
    async onLoad() {
      setTimeout(async () => {
        const items = await this.getAllData()
        if (this.list.length > 0 && items.page_num == 1) {
          return
        }
        this.list.push(...items.data)

        this.page_num = this.page_num + 1

        if (!items.has_next) {
          this.finished = true
        }
        // 关闭上拉loading
        this.loading = false
      }, 1000)
    },
    // 进行/完成 状态切换
    stateChange() {
      this.history = this.active
      this.list = []
      this.page_num = 1
      this.finished = false
      this.loading = true
      if (this.loading) {
        this.onLoad()
      }
    }
  },
  created() {
    // this.getAllData()
  }
}
</script>

<style lang="less" scoped></style>
