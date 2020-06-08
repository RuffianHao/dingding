<!--
 * @Description: 
 * @Date: 2020-06-02 16:13:44
 * @LastEditTime: 2020-06-04 16:04:43
-->
<template>
  <receive-consent :reqUrl="reqUrl"></receive-consent>
</template>

<script>
import receiveConsent from '../../components/content-list'
export default {
  components: { receiveConsent },
  data() {
    return {
      reqUrl: '/receive-consent'
    }
  }
}
</script>

<style></style>
