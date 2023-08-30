<template>
    <div class="comment">
        <detailSection title="热门评论" :more-text="`查看全部99条评论`">
            <div class="inner">
                <h1>内容区</h1>
            </div>
        </detailSection>
    </div>
</template>
<script setup>
import detailSection from '@/components/detailSection/detailSection.vue';
</script>
<style scoped lang="less">
.comment{
    .inner{
     height: 300px;
     background-color:skyblue;
  }
}
</style>