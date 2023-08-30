<template>
  <div class="house-itemv3">
    <div class="inner">
      <div class="cover">
        <img :src="itemData?.image?.url" alt="">
      </div>
      <div class="content">
        <div class="location">
          <img src="@/assets/img/home/position.png" alt="">
          <div class="text">{{ itemData.location }}</div>
        </div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="price">
          <div class="final">￥{{ itemData.finalPrice }}</div>
          <div class="product">￥{{ itemData.productPrice }}</div>
          <!-- 如果undifined 以防报错先进行判断就不会渲染了  -->
          <div class="badge" v-if="itemData.priceTipBadge">{{ itemData.priceTipBadge.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 父子组件传递数据
defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})
</script>
<style scoped lang="less">
.house-itemv3 {
  width: 50%;

  .inner {
    position: relative;
    margin: 5px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    
    .cover {
      margin-bottom: 120px;
      img {
        width: 100%;

      }
    }

    .content {
      position: absolute;
      bottom: 0;
      padding: 8px 10px;
      color: #333;
      .location{
        display: flex;
        margin: 5px 0;
        img{
          width: 12px;
          margin-right: 2px;
        }
        .text{
          color: #666;
          font-size: 13px;
        }
      }

      .summary {
        font-size: 12px;
        margin: 5px 0;
      }

      .name {
        margin: 5px 0;
        // 超出加省略号
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price{
        margin: 5px 0;
        display: flex;
        .final{
          color: var(--primary--color);
        }
        .product{
          font-size: 12px;
          text-decoration-line:line-through;
          margin: 0 4px;
        }
        .badge{
          font-size: 12px;
          color: #fff;
          background-color:pink;
          border-radius: 10px;
          padding:0 4px;
          line-height: 1.5;
        }
      }
    }
  }
}
</style>