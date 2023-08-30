<template>
    <div class="tab-bar">
        <!-- v-for遍历数据包含文字和图片 -->
        <template v-for="(item, index) in tabbarData">
            <!-- 添加点击事件 active样式 nowindex记录索引 -->
            <div class="tab-bar-item" :class="{ active: nowindex === index }" @click="clickItem(index, item)">
                <!-- 如果没有点击 图片为默认状态，否则替换为active图片；getAssetURL为vite中遍历图片的方法 -->
                <img v-if="nowindex !== index" :src="getAssetURL(item.image)" alt="">
                <img v-else :src="getAssetURL(item.imageActive)" alt="">
                <span class="text">{{ item.text }}</span>
            </div>
        </template>
    </div>
</template>
<script setup>
import { tabbarData } from "@/assets/data/tabbarData";
import { getAssetURL } from "@/utils/getAssetURL";
import { ref } from "vue";
import { useRouter } from "vue-router";
// 默认为首页第一个索引
const nowindex = ref(0)
const router = useRouter()
const clickItem = (index, item) => {
    // clickItem方法 点击时改变nowindex的值为当前索引；同时实现路由跳转
    nowindex.value = index
    router.push(item.path)
}
</script>
<style scoped lang="less">
.tab-bar {
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    position: fixed;
    display: flex;
    border-top: 1px solid #ddd;

    .tab-bar-item {
        // flex布局 item均匀分布
        display: flex;
        flex: 1;
        // 在父元素中设置一下两个属性使得子元素垂直水平居中
        align-items: center;
        justify-content: center;
        // 排列方式 使得每一个-item里元素垂直排列
        flex-direction: column;

        &.active {
            // 变量
            color: var(--primary--color)
        }

        img {
            width: 22px;
        }

        .text {
            margin-top: 2px;
            font-size: 12px;
        }
    }
}
</style>