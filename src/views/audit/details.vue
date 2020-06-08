<!--
 * @Description: 
 * @Date: 2020-06-04 14:02:27
 * @LastEditTime: 2020-06-04 16:30:59
-->
<template>
  <Details leftBtnText="拒绝" rightBtnText="通过" :resUrl="resUrl" :id="id" @leftClick="onIsPass(2)" @rightClick="onIsPass(1)"></Details>
</template>

<script>
import Details from '../../components/details'
import { Dialog } from 'vant'
export default {
  components: { Details, [Dialog.Component.name]: Dialog.Component },
  data() {
    return {
      resUrl: '/audit',
      id: this.$route.params.id
    }
  },
  methods: {
    // 通过审批
    async onIsPass(isPass) {
      // var method = isPass === 0 ? 'POST' : 'delete'
      this.$Dialog
        .confirm({
          message: `是否${isPass === 1 ? '通过' : '拒绝'}此申请`
        })
        .then(async () => {
          let { data } = await this.$request({
            url: 'audit',
            method: 'post',
            data: { id: this.$route.params.id, isPass: isPass }
          })

          if (data.status === 200) {
            this.$router.go(-1)
            this.$toast.success(data.msg)
          } else {
            this.$toast.fail(data.msg)
          }
        })
        .catch((err) => {
          // on cancel
        })
    }
  },
  created() {}
}
</script>

<style></style>
