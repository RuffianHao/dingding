<!--
 * @Description: 
 * @Date: 2020-04-27 17:36:03
 * @LastEditTime: 2020-06-04 15:52:40
 -->
<template>
  <!-- content -->
  <div class="list">
    <van-list offset="100" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :border="false">
      <van-swipe-cell bor v-for="(item, index) in list" :key="index">
        <van-cell center :title="item.name" :label="`规格:${item.memo}`" size="large">
          <div>
            库存数量：{{ item.num }}
            <p style="font-size:12px;paddin:0">单价：{{ item.price ? item.price : '无' }}</p>
          </div>
        </van-cell>
        <template #right>
          <van-button square class="mybtn" type="danger" @click="remove(item.id, index)">删除</van-button>
          <van-button square class="mybtn" type="primary" @click="modify(item)">修改</van-button>
        </template>
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  components: { [Dialog.Component.name]: Dialog.Component },
  name: 'Stock',
  data() {
    return {
      list: [], //  列表数据
      loading: false, // 加载状态
      noData: '没有更多数据',
      finished: false, // 加载结束
      page_num: 1, //页码
      page_size: 10,
      keyword: this.$route.query.keyword
    }
  },
  methods: {
    // 获取数据
    async getStock(page) {
      const { data } = await this.$request({
        url: 'goods',
        method: 'get',
        params: {
          page_num: page,
          page_size: this.page_size,
          keyword: this.keyword
        }
      })
      return data.body
    },
    //列表
    // 上拉加载

    async onLoad() {
      const body = await this.getStock(this.page_num)
      this.page_num++
      if (!body.has_next) {
        this.finished = true
      }
      this.list.push(...body.data)

      // 关闭上拉loading
      this.loading = false
    },
    //修改
    modify(params) {
      this.$router.push({ name: 'Goods', params })
    },
    //删除
    remove(id, index) {
      Dialog.confirm({
        message: '是否确认删除'
      })
        .then(async () => {
          let { data } = await this.$request({
            method: 'delete',
            url: 'goods',
            data: {
              id
            }
          })
          this.list.splice(index, 1)
          this.$toast(data.msg)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 查看记录
    history({ id, number }) {
      this.$router.push({
        name: 'History',
        query: {
          id,
          number
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.van-button {
  height: 100%;
}
</style>
