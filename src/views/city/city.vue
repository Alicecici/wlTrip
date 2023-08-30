<template>
    <div class="city">
        <div class="top">
            <!-- 1.顶部搜索栏 -->
            <form action="/">
                <van-search v-model="searchValue" show-action placeholder="城市/区域/位置" @cancel="onCancel" shape="round" />
            </form>
            <!-- 2.标签栏 -->
            <van-tabs v-model:active="activeTab" color="var( --primary--color)" title-active-color="#555">
                <!-- v-for遍历标题 -->
                <template v-for="(value, key, index) in allCities" :key="key">
                    <van-tab :title="value.title" :name="key">

                    </van-tab>
                </template>
            </van-tabs>
        </div>
        <!-- 3.对应的城市内容 -->
        <div class="content">
            <!-- 频繁切换渲染过慢 考虑使用v-show -->
            <template v-for="(value,key,index) in allCities" :key="index">
                <city-group v-show="activeTab === key" :group-data="value"></city-group>
            </template>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getCityAll } from "@/services"
import useCityStore from "@/stores/modules/city";
import { storeToRefs } from "pinia";
import { computed } from "@vue/reactivity";
import cityGroup from "./cpms/cityGroup.vue"
const searchValue = ref("")
const router = useRouter()
// 点击取消返回上一级页面
const onCancel = () => {
    router.back()
}
const activeTab = ref()
// 1.网络请求 请求城市数据
// hyRequest.get({
//     url:"/city/all"
// }).then(res => {
//     console.log(res);
// })
// 2.封装后 直接调用
// getCityAll().then(res => {
//     console.log(res);
// })
// 3.从store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

// 默认直接获取的数据不是响应式的，要包裹computed
const currentGroup = computed(() => allCities.value[activeTab.value])
</script>
<style scoped lang="less">
.city {
    --van-tabs-line-height: 40px;

    // 内容滚动 (也可以让定部固定)
    .content {
        height: calc(100vh - 94px);
        overflow-y: auto;
    }
}
</style>