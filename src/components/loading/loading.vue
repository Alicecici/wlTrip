<template>
    <!-- 使用变量进行判断是否展示loading -->
    <div class="loading" v-if="mainStore.isLoading" @click="close">
        <div class="bg">
            <img src="../../assets/img/main/picture_gif1_yuan.gif" alt="">
        </div>
    </div>
</template>
<script setup>
import useMainStote from '@/stores/modules/main';

const mainStore = useMainStote()
const close = () => {
    mainStore.isLoading=false
}
</script>
<style scoped lang="less">
.loading {
    background-color: rgba(0, 0, 0, .25);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    .bg{
        background-color: rgba(255, 255, 255, 0.9);
        width: 104px;
        height: 104px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 100px;
            height: 100px;
        }
    }
}
</style>