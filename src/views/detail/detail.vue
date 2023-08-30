<template>
    <div class="detail hidden-tabbar" ref="detailRef">
        <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
        <detailTabbar @movieslist="listcontent" :titles="['描述', '设施', '房东', '评论', '须知', '位置']" v-if="showTabbar"
            ref="tabbarRef">
        </detailTabbar>
        <div class="main" v-if="mainPart">
            <detailSwipe :swipe-data="mainPart.topModule.housePicture.housePics"></detailSwipe>
            <!-- ref v-bind动态绑定函数 -->
            <detail_02infoVue :infos-data="mainPart.topModule" :ref="getSectionRef"></detail_02infoVue>
            <!-- 组件复用 使用插槽 -->
            <detail_03facility :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" :ref="getSectionRef">
            </detail_03facility>
            <detail_04landlord :ref="getSectionRef"></detail_04landlord>
            <detail_05comment :ref="getSectionRef"></detail_05comment>
            <detail_06notice :ref="getSectionRef"></detail_06notice>
            <detail_07map :position="mainPart.dynamicModule.positionModule" :ref="getSectionRef"></detail_07map>
            <detail_08intro></detail_08intro>
        </div>
        <div class="foot">
            foot区域
        </div>
    </div>
</template>
<script setup>
import detailTabbar from "@/components/detailTabbar/detailTabbar.vue";
import detailSwipe from "./cpns/detail_01Swipe.vue";
import detail_02infoVue from "./cpns/detail_02info.vue";
import detail_03facility from "./cpns/detail_03facility.vue";
import detail_04landlord from "./cpns/detail_04landlord.vue";
import detail_05comment from "./cpns/detail_05comment.vue";
import detail_06notice from "./cpns/detail_06notice.vue";
import detail_07map from "./cpns/detail_07map.vue";
import detail_08intro from "./cpns/detail_08intro.vue";
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getDetailInfos } from "@/services/index"
import useScroll from "@/hooks/useScroll";
const route = useRoute()
console.log(route.params.id);
// 1.返回
const router = useRouter()
const onClickLeft = () => {
    router.back()
}
// 2.在页面中发送网络请求获取数据
const houseId = route.params.id
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)

getDetailInfos(houseId).then(res => {
    detailInfos.value = res.data
})
// 3.tabbar的滚动位置和交互实现
// 监听元素的滚动 传入动态绑定的参数
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
// 变量 控制tabbar显示与隐藏
const showTabbar = computed(() => {
    return scrollTop.value > 300
})
// 数组存储元素
const sectionEls = []
// 组件调用函数
const getSectionRef = (value) => {
    if (!value) return
    sectionEls.push(value.$el)
}
// 点击事件 记录索引
let isClick = false
let currentDistance = -1
const listcontent = (index) => {
    // 记录组件的offsettop值
    let instance = sectionEls[index].offsetTop
    if (index !== 0) {
        // 除了描述区域 向下偏移tabbar的高度
        instance = instance - 44
    }
    isClick = true
    currentDistance = instance
    // 界面滚动到指定位置
    detailRef.value.scrollTo({
        top: instance,
        behavior: "smooth"
    })
}
// 4.页面滚动 滚动时匹配tabbar对应的索引  
const tabbarRef = ref()
watch(scrollTop, (newValue) => {
    // 获取所有区域的offsetTop
    if (newValue === currentDistance) {
        isClick = false
    }
    if (isClick) return
    const els = Object.values(sectionEls)
    const values = els.map(el => el.offsetTop)
    // 根据newValue去匹配想要的索引
    // let index = values.length - 1
    let index = 5
    for (let i = 0; i < values.length; i++) {
        if (values[i] > newValue + 44 + 1) {
            index = i - 1
            //   console.log("打印", i);
            break
        }
    }
    console.log(index);
    // 匹配tabbar的nowindex里
    tabbarRef.value?.setNowindex(index)
})
</script>
<style scoped lang="less">
.detail {
    .foot {
        height: 200px;
        background-color: orange;
    }
}
</style>