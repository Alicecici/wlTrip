<template>
  <div class="app">
    <!-- 切换页面keep-alive -->
    <router-view v-slot="props">
      <keep-alive isclude="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <!-- 判断是否隐藏底部栏 -->
    <tabbar v-show="!route.meta.tabbarShow"></tabbar>
    <loading></loading>
  </div>
</template>
<script setup>
import tabbar from "@/components/tabbar/tabbar.vue"
import { useRoute } from "vue-router";
import loading from "./components/loading/loading.vue";
const route=useRoute()
</script>
<style scoped lang="less"></style>