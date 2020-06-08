<!--
 * @Description: 
 * @Date: 2020-06-05 10:42:41
 * @LastEditTime: 2020-06-05 15:06:35
-->
<template>
  <Details
    ref="details"
    leftBtnText="开始采购"
    rightBtnText="采购完成"
    :lfDisabled="lfDisabled"
    :riDisabled="riDisabled"
    :resUrl="resUrl"
    :id="id"
    :isShow="isShow"
    @leftClick="startPur"
    @rightClick="confirmPur"
  ></Details>
</template>

<script>
import Details from '../../components/details'
export default {
  components: { Details },
  data() {
    return {
      resUrl: '/purchaing-sign',
      id: this.$route.params.id,
      riDisabled: true,
      lfDisabled: false,
      isShow: false
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
      if (data.body.data.schedule === 1) {
        this.lfDisabled = false
        this.riDisabled = true
        this.isShow = true
      } else if (data.body.data.schedule === 3) {
        this.lfDisabled = true
        this.riDisabled = false
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    startPur() {
      this.$Dialog
        .confirm({
          message: '是否开始采购'
        })
        .then(async () => {
          let { data } = await this.$request({
            url: 'purchaing-sign',
            method: 'post',
            data: {
              id: this.id,
              event: 3
            }
          })
          if (data.status === 200) {
            this.lfDisabled = true
            this.riDisabled = false
            this.$toast.success(data.msg)
          } else {
            this.$toast.fail(data.msg)
          }
        })
    },
    confirmPur() {
      this.$Dialog
        .confirm({
          message: '是否确认采购'
        })
        .then(async () => {
          let { data } = await this.$request({
            url: 'purchaing-sign',
            method: 'post',
            data: {
              id: this.id,
              event: 4
            }
          })
          if (data.status === 200) {
            this.isShow = true
            this.$toast.success(data.msg)
          }
        })
    }
  },
  created() {
    this.getDetails()
  }
}
</script>

<style></style>
