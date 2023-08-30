<template>
  <div class="landlord">
    <detailSection title="房东介绍" more-text="查看房东主页">
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
.landlord{
  .inner{
     height: 300px;
     background-color:pink;
  }
 
}
</style>