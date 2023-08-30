<template>
    <div class="home-categories">
        <template v-for="(item, index) in categories" :key="item.id">
            <div class="category">
                <img :src="item.pictureUrl" alt="">
                <div class="text">{{ item.title }}</div>
            </div>
        </template>
    </div>
</template>
<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from "pinia";
const homeStore = useHomeStore()
const { categories } = storeToRefs(homeStore)
</script>
<style scoped lang="less">
.home-categories {
    display: flex;
    padding: 8px 14px;
    overflow-x: auto;
    &::-webkit-scrollbar{
        display: none;
    }
    .category {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;  
        width: 80px;
        align-items: center;
        justify-content: center;
        text-align: center;
        img {
            width: 32px;
            height: 32px;
        }

        .text {
            color: #333;
        }
    }
}
</style>