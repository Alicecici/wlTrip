<template>
    <div class="notice">
        <detailSection title="预定须知">
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
.notice{
    .inner{
     height: 300px;
     background-color:aquamarine;
  }
}
</style>