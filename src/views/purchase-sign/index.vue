<!--
 * @Description: 采购确认
 * @Date: 2020-06-05 10:37:59
 * @LastEditTime: 2020-06-05 10:40:03
-->
<template>
  <List :reqUrl="reqUrl"></List>
</template>

<script>
import List from '../../components/content-list'
export default {
  components: { List },
  data() {
    return {
      reqUrl: '/purchaing-sign'
    }
  }
}
</script>

<style></style>
