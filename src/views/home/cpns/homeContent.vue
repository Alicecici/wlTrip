<template>
  <div class="home-content">
    <h2 class="title">热门精选</h2>
    <div class="list">
        <!-- v-for遍历数据 v-if通过类型判断展示哪个组件 -->
        <template v-for="(item,index) in houselist" :key="item.data.houseId">
            <houseItemv3 v-if="item.discoveryContentType === 3" :item-data="item.data" @click="itemClick(item.data)"></houseItemv3>
            <houseItemv9 v-if="item.discoveryContentType === 9" :item-data="item.data" @click="itemClick(item.data)"></houseItemv9>
        </template>
    </div>
  </div>
</template>
<script setup>
import useHomeStore from '@/stores/modules/home';
import houseItemv9 from '@/components/houseItemv9/houseItemv9.vue';
import houseItemv3 from '@/components/houseItemv3/houseItemv3.vue'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const homeStore = useHomeStore()
const { houselist } = storeToRefs(homeStore)
const router= useRouter()
const itemClick = (item) => {
    router.push("/detail/"+item.houseId)
}
</script>
<style scoped lang="less">
.home-content{
  h2{
    margin-left: 10px;
  }
  .list{
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
  }
}
</style>