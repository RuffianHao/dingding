<!--
 * @Description: 
 * @Date: 2020-05-22 16:18:58
 * @LastEditTime: 2020-06-09 14:54:05
-->

<template>
  <div class="home">
    <van-cell-group v-for="route in permission_routes" :key="route.path">
      <van-cell v-if="route.meta.nav === true" :title="route.meta.title" size="large" icon="records" @click="$router.push(route.path)" />
    </van-cell-group>

    <!-- <van-cell title="物品管理" size="large" icon="records" @click="$router.push('stock')" />
    <van-cell title="采购申请" size="large" icon="records" @click="$router.push('purchase')" />
    <van-cell title="商品录入" size="large" icon="records" @click="$router.push('goods')" />
    <van-cell title="领用申请" size="large" icon="records" @click="$router.push('receive')" />
    <van-cell title="领用确认" size="large" icon="records" @click="$router.push('receive-consent')" />
    <van-cell title="签收入库" size="large" icon="records" @click="$router.push('purchaing-sign')" />
    <van-cell title="审批" size="large" icon="records" @click="$router.push('audit')" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['permission_routes'])
  },
  methods: {},
  created() {
    const that = this
    // this.$store
    //   .dispatch('user/login')
    //   .then(async (result) => {
    //     this.$toast.success('欢迎进入')
    //   })
    //   .catch((err) => {
    //     alert(err)
    //   })
  }
}
</script>

<style scoped lang="less">
.van-cell {
  margin-top: 6px;
  font-size: 14px;
  font-weight: 600;
}
</style>
