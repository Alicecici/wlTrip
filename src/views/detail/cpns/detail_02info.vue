<template>
  <div class="infos">
    <div class="title">
      {{ infosData.houseName }}
    </div>
    <div class="content">
      <template v-for="(item, index) in infosData.houseTags" :key="index">
        <span class="item" v-if="item.tagText" :style="{color:item.tagText.color,background: item.tagText.background.color}">{{ item.tagText.text }}</span>
      </template>
    </div>
    <div class="comment extra">
      <div class="left">
        <span class="overall">{{ infosData.commentBrief.overall }}</span>
        <span class="score-title">{{ infosData.commentBrief.scoreTitle }}</span>
        <span class="comment-brief">{{ infosData.commentBrief.commentBrief }}</span>
      </div>
      <div class="right">
        {{ infosData.commentBrief.totalCount }}条评论 >
      </div>
    </div>
    <div class="position extra">
      <div class="left">{{ infosData.nearByPosition.address }}</div>
      <div class="right">地图•周边 ></div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  infosData: {
    type: Object,
    default: () => ({})
  }
})
</script>
<style scoped lang="less">
.infos{
  padding: 14px;
  background-color: #fff;
  .title{
    font-weight: 700;
    font-size: 20px;
    color:#333;
    text-align: justify;
    line-height: 24px;
    overflow: hidden;
    margin-bottom: 6px;  
  }
  .content{
    margin: 10px 0;
    .item{
      font-size: 12px;
      margin: 0 2px;
      padding: 1px 3px;
    }
  }
  .extra{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    margin: 12px 0;
    border-radius: 5px;
    font-size: 12px;
    background-color: #f5f7fa;
    .right{
      color: #ff9645;
    }
  }
  .comment{
    .overall{
      font-size: 18px;
      font-weight: 700;
      color: #333;
    }
    .score-title{
      color: #333;
      font-weight: 700;
      margin: 0 3px;
    }
    .comment-brief{
      color: #666;
    }
  }
  .position{
    .left{
      color: #333;
      font-weight: 700;
      font-size: 14px;
    }
  }
}
</style>