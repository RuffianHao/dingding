<!--
 * @Description: 
 * @Date: 2020-06-04 10:55:58
 * @LastEditTime: 2020-06-04 10:55:59
-->
<template>
  <AckComp :reqUrl="reqUrl"></AckComp>
</template>

<script>
import AckComp from '../../components/content-list'
export default {
  components: { AckComp },
  data() {
    return {
      reqUrl: '/audit'
    }
  }
}
</script>

<style></style>
