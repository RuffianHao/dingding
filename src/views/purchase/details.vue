<!--
 * @Description: 
 * @Date: 2020-06-04 14:02:27
 * @LastEditTime: 2020-06-08 11:22:58
-->
<template>
  <Details leftBtnText="取消" rightBtnText="修改" :resUrl="resUrl" :id="id" @leftClick="cancelpurchase" @rightClick="modifypurchase"></Details>
</template>

<script>
import Details from '../../components/details'
import { Dialog } from 'vant'
export default {
  components: { Details, [Dialog.Component.name]: Dialog.Component },
  data() {
    return {
      resUrl: '/purchase',
      id: this.$route.params.id
    }
  },
  methods: {
    // 取消
    async cancelpurchase() {
      Dialog.confirm({
        message: '是否确认取消'
      })
        .then(async () => {
          let { data } = await this.$request({
            url: 'purchase',
            method: 'delete',
            data: {
              id: parseInt(this.$route.params.id)
            }
          })
          this.$toast.success(data.msg)
          this.bthShow = true
          this.$router.go(-1)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 修改
    async modifypurchase(id) {
      this.$router.push(`/purchase/modify/${this.id}`)
      this.$store.commit('activeState/setPurActive', 0)
    }
  },
  created() {}
}
</script>

<style></style>
