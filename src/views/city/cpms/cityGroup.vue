<template>
    <div class="city-group">
        <!-- 两层for循环渲染数据 -->
        <van-index-bar :index-list="indexList">
            <van-index-anchor index="热门" />
            <div class="list">
                <template v-for="(item, index) in groupData.hotCities">
                    <div class="hot-city" @click="clickCity(item)">{{ item.cityName }} </div>
                </template>
            </div>
            <template v-for="( itemGroup, indexGroup ) in groupData?.cities" :key="indexGroup">
                <van-index-anchor :index="itemGroup.group" />
                <template v-for="(itemCity, indexCity) in itemGroup.cities" :key="indexCity">
                    <van-cell :title="itemCity.cityName" @click="clickCity(itemCity)" />
                </template>
            </template>
        </van-index-bar>

        <!-- <template v-for="( itemGroup, indexGroup ) in groupData?.cities" :key="indexGroup">
            <div class="group-item">
                <div class="title">标题{{ itemGroup.group }}</div>
                <div class="list">
                    <template v-for="(itemCity, indexCity) in itemGroup.cities" :key="indexCity">
                        <div class="city"> {{ itemCity.cityName }}</div>
                    </template>
                </div>
            </div>
        </template> -->
    </div>
</template>
<script setup>
import useCityStore from '@/stores/modules/city';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
// 传入props
const props = defineProps({
    groupData: {
        type: Object,
        default: () => { { } }
    }
})
// 分组定位
const indexList = computed(() => {
    const list = props.groupData.cities.map(item => item.group)
    list.unshift("#")
    return list
})
// 城市回显
const router = useRouter()
const cityStore = useCityStore()
const clickCity = (city) => {
    // console.log(city);
    cityStore.currentCity = city
    router.back()
}
</script>
<style scoped lang="less">
.city-group {
    --van-index-anchor-font-weight: 400;
    --van-font-bold: 400;

    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 10px;
        padding-right: 25px;

        .hot-city {
            height: 28px;
            width: 70px;
            background-color: #f8e8dd;
            border-radius: 14px;
            text-align: center;
            line-height: 28px;
            font-size: 12px;
            margin: 10px 0;
        }
    }
}
</style>