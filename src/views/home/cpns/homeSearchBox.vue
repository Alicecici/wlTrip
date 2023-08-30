<template>
    <div class="home-search-box">
        <!-- 1.城市位置 -->
        <div class="location">
            <div class="city" @click="clickCity">{{ currentCity.cityName }}</div>
            <div class="mylocation" @click="clickPosition">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/location.png" alt="">
            </div>
        </div>
        <!-- 2.入住时间 -->
        <div class="time" @click="show = true">
            <div class="start">
                <span class="text">入住</span>
                <span>{{ startDate }}</span>
            </div>
            <div class="day">
                <span>共{{ countDay }}晚</span>
            </div>
            <div class="end">
                <span class="text">离店</span>
                <span>{{ endDate }}</span>
            </div>
        </div>
        <van-calendar v-model:show="show" type="range" @confirm="onConfirm" />
        <!-- 3.标语 -->
        <div class="text">
            <div class="one item">
                <span>价格不限</span>
                <span>人数不限</span>
            </div>
            <div class="tow item">
                关键字/位置/民宿
            </div>
        </div>
        <!-- 4.热门城市建议 -->
        <div class="item suggest">
            <template v-for="(item, index) in hotSuggests" :key="index">
                <div class="hot-city" :style="{ color: item.color, background: item.tagText.background.color }">{{
                    item.tagText.text }}</div>
            </template>
        </div>
        <!-- 搜索按钮 -->
        <div class="search item">
            <div class="search-button" @click="clickButton">开始搜索</div>
        </div>
    </div>
</template>
<script setup>
import useCityStore from '@/stores/modules/city';
import useMainstore from '@/stores/modules/main'
import { formatMonthDay, getDiffDays } from '@/utils/format_data';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ref } from "vue";
import useHomeStore from "@/stores/modules/home"
import { computed } from '@vue/reactivity';
// 跳转到城市页面
const router = useRouter()
const clickCity = () => {
    router.push("/city")
}
const clickPosition = () => {
    // 获取位置 一个api 实际上获取的是经纬度信息 应从服务器获取具体城市 或者调用百度或者高德地图api
    // 该函数传入三个参数 两个回调函数一个option对象
    navigator.geolocation.getCurrentPosition(res => {
        console.log("获取位置成功", res);
    }, err => {
        console.log("获取位置失败", err);
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    })
}
// 城市回显
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)
// 日期范围的处理
const mainStore = useMainstore()
const { nowDate, newDate } = storeToRefs(mainStore)
const startDate = computed(()=>formatMonthDay(nowDate.value))
const endDate = computed(()=>formatMonthDay(newDate.value))
const countDay = ref(getDiffDays(nowDate.value, newDate.value))
// 日历的显示
const show = ref(false)
const onConfirm = (value) => {
    const selectStartDate = value[0]
    const selectEndDate = value[1]
    mainStore.nowDate = selectStartDate
    mainStore.newDate = selectEndDate
    countDay.value = getDiffDays(selectStartDate, selectEndDate)
    //隐藏日历
    show.value = false
}
// 热门建议
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)
// 搜索页面跳转
const clickButton = () => {
    router.push({
        path: "/search",
        query: {
            startDate: startDate.value,
            endDate: endDate.value,
            currentCity: currentCity.value.cityName
        }
    })
}
</script>
<style scoped lang="less">
.home-search-box {
    .item {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 0 28px;
        color: #999;
        height: 44px;
    }

    .location {
        display: flex;
        height: 44px;
        align-items: center;
        justify-content: center;

        .city {
            flex: 1;
            margin-left: 28px;
            color: #333;
            font-size: 14px;
        }

        .mylocation {
            align-items: center;
            justify-content: center;
            position: relative;
            font-size: 14px;
            color: #666;

            img {
                // 定位微调下图片的位置
                position: relative;
                top: 3px;
                height: 16px;
                padding-left: 5px;
                margin-right: 28px;
            }
        }
    }

    .time {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 28px;
        height: 44px;

        .text {
            color: #666;
            font-size: 13px;
        }

        .start {
            display: flex;
            flex-direction: column;
        }

        .day {
            color: #333;
        }

        .end {
            display: flex;
            flex-direction: column;
        }
    }

    .text {
        .one {
            display: flex;
            justify-content: space-between;
        }
    }

    .suggest {
        height: auto;

        .hot-city {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            // margin: 4px;
            margin: 4px 4px 2px 0px;
        }
    }

    .search {
        .search-button {
            margin-top: 8px;
            width: 342px;
            height: 38px;
            max-height: 100px;
            text-align: center;
            line-height: 38px;
            font-size: 18px;
            font-weight: 600;
            color: #fff;
            border-radius: 28px;
            background-image: linear-gradient(90deg, var(--primary--color), #fcaf3f);
        }
    }
}
</style>