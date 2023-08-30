<template>
  <div class="home" ref="homeRef">
    <homeHead></homeHead>
    <div class="homebgimg">
      <img src="@/assets/img/home/homebg.jpg" alt="">
    </div>
    <homeSearchBox />
    <homeCategories />
    <!-- 搜索框的实现 -->
    <div class="showSearch" v-if="isShowSearchBar">
      <searchBar></searchBar>
    </div>
    <homeContent />
    <!-- <button @click="clickmore()">加载更多</button> -->
  </div>
</template>
<script>
export default {
  name:"home"
}
</script >
<script setup>
import searchBar from "@/components/searchBar/searchBar.vue"
import homeHead from './cpns/homeHead.vue';
import homeCategories from './cpns/homeCategories.vue'
import homeSearchBox from "./cpns/homeSearchBox.vue";
import useHomeStore from '@/stores/modules/home';
import homeContent from "./cpns/homeContent.vue"
import useScroll from "@/hooks/useScroll"
import { watch, ref, onActivated } from 'vue';
import { onUnmounted } from "vue"
import { onMounted } from "vue"
import { computed } from '@vue/reactivity';
// 1.在首页发起网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fecCategoriesData()
homeStore.fetchHouselistData()
// 默认加载更多
// const clickmore = () => {
//   console.log("加载更多数据");
//   homeStore.fetchHouselistData()
// }
// 2.使用封装的hook
// 1.传入一个回调函数
// useScroll(() => {
//   homeStore.fetchHouselistData()
// })
// 2.传参 判断
// 监听页面元素的滚动
const homeRef=ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false
    })
  }
})
// 3.不封装
// const scrollLirenerHandler = () => {
//   const clientHeight = document.documentElement.clientHeight
//   const scrollTop = document.documentElement.scrollTop
//   const scrollHeight = document.documentElement.scrollHeight
//   // console.log(clientHeight, scrollTop, scrollHeight);
//   if (scrollHeight <= clientHeight + scrollTop + 1) {
//     homeStore.fetchHouselistData()
//   }
// }
// onMounted(() => {
//   window.addEventListener("scroll", scrollLirenerHandler)
// })
// onUnmounted(() => {
//   window.removeEventListener("scroll", scrollLirenerHandler)
// })

// 3.滚动都一定区域显示搜索栏
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop > 100
// })
// 定义的可响应式数据，依赖另外一个可响应式的数据，那么可以使用计算属性(computed)
const isShowSearchBar = computed(() => {
  return scrollTop.value>=500
})
// 跳转回home时,保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top:scrollTop.value
  })
})
</script>
<style scoped lang="less">
.home {
  padding-bottom: 60px;
  // 不要监听windeow的滚动
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;

  .homebgimg img {
    height: 150px;
    width: 100%;
  }
  .showSearch{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    z-index: 9;
    background-color: #fff;
  }
}
</style>