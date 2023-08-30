<template>
    <van-tabbar v-model="nowindex" active-color=var(--primary--color) route>
        <template v-for="(item, index) in tabbarData">
            <van-tabbar-item :to="item.path">
                <template #default>
                    <span>{{ item.text }}</span>
                </template>
                <template #icon>
                    <img v-if="nowindex !== index" :src="getAssetURL(item.image)" alt="">
                    <img v-else :src="getAssetURL(item.imageActive)" alt="">
                </template>
            </van-tabbar-item>
        </template>
    </van-tabbar>


    <!-- 
    <div class="tab-bar">
        <template v-for="(item, index) in tabbarData">
            <div class="tab-bar-item" :class="{ active: nowindex === index }" @click="clickItem(index, item)">
                <img v-if="nowindex !== index" :src="getAssetURL(item.image)" alt="">
                <img v-else :src="getAssetURL(item.imageActive)" alt="">
                <span class="text">{{ item.text }}</span>
            </div>
        </template>
    </div> -->
</template>
<script setup>
import { tabbarData } from "@/assets/data/tabbarData";
import { getAssetURL } from "@/utils/getAssetURL";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
// 监听路由改变时，找到对应的索引，设置nowindex
const nowindex = ref(0)
const route = useRoute()
watch(route, (newRoute) => {
    const index = tabbarData.findIndex(item => item.path === newRoute.path)
    if (index === -1) return
    nowindex.value = index
})
// const clickItem = (index, item) => {
//     nowindex.value = index
//     router.push(item.path)
// }
</script>
<style scoped lang="less">
// .van-tabbar-item--active {
//     color: var(--primary--color);
// }
</style>