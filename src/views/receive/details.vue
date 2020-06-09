<!--
 * @Description: 
 * @Date: 2020-06-04 14:02:27
 * @LastEditTime: 2020-06-09 11:28:01
-->
<template>
  <Details leftBtnText="取消" rightBtnText="修改" :resUrl="resUrl" :id="id" @leftClick="cancelReceive" @rightClick="modifyReceive"></Details>
</template>

<script>
import Details from '../../components/details'
export default {
  components: { Details },
  data() {
    return {
      resUrl: '/receive',
      id: this.$route.params.id
    }
  },
  methods: {
    // 取消
    async cancelReceive() {
      this.$Dialog
        .confirm({
          message: '是否确认取消'
        })
        .then(async () => {
          let { data } = await this.$request({
            url: 'receive',
            method: 'delete',
            data: {
              id: parseInt(this.$route.params.id)
            }
          })
          this.$toast.success(data.msg)
          this.bthShow = true
          this.$router.push('/receiv')
        })
        .catch(() => {
          // on cancel
        })
    },
    // 修改
    async modifyReceive(id) {
      this.$store.commit('activeState/setReceiveActive', 0)
      this.$router.push(`/receive/modify/${this.id}`)
    }
  },
  created() {}
}
</script>

<style></style>
