<!--
 * @Description: 
 * @Date: 2020-04-27 17:36:03
 * @LastEditTime: 2020-06-08 16:07:50
 -->
<template>
  <div class="stock">
    <!-- Header -->
    <div class="header">
      <!-- NAV -->
      <div class="quick_nav">
        <div @click="toStockIn()" class="icon-box" style=" border-right: 1px solid #fff;">
          <span class="iconfont icon-ruku"></span>
          新增入库
        </div>
        <div @click="record()" class="icon-box" style="  border-left: 1px solid #fff;">
          <span class="iconfont icon-kucun"></span>
          查看记录
        </div>
      </div>
      <!-- SEARCH -->
      <van-search v-model="searchValue" show-action placeholder="请输入搜索关键词" @search="onSearch">
        <template #action>
          <div @click="onSearch(searchValue)">搜索</div>
        </template>
      </van-search>
    </div>
    <!-- content -->
    <List></List>
  </div>
</template>

<script>
import List from './components/list'
export default {
  components: { List },
  name: 'Stock',
  data() {
    return {
      searchValue: ''
    }
  },
  methods: {
    toStockIn() {
      this.$router.push('/goods')
    },
    record() {
      this.$router.push('/record')
    },
    async onSearch(q) {
      this.$router.push({ path: '/search-result', query: { keyword: this.searchValue } })
    }
  }
}
</script>
<style lang="less" scoped>
.van-button {
  height: 100%;
}
.quick_nav {
  width: 100%;
  height: 60px;
}
.icon-box {
  width: 50%;
  height: 60px;
  line-height: 60px;
  background: #1989fa;
  float: left;
  text-align: center;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 18px;
  span {
    font-size: 26px;
  }
}
</style>
