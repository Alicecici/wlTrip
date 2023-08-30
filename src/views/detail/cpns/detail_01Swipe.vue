<template>
  <div class="swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>
      <!-- 自定义指示器 -->
      <template #indicator="{ active, total }">
        <div class="indicator">
          <template v-for="(value ,key,index) in swipeGroup" :key="key">
            <!-- 需要判断当前活跃的index和类别的index -->
            <span 
            class="item"
            :class="{active: swipeData[active]?.enumPictureCategory==key}"
            >
              <span class="text">{{ getName(value[0].title) }}</span>
              <span class="count" v-if="(swipeData[active]?.enumPictureCategory == key)">
                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>
<script setup>
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => []
  }
})
const swipeGroup = {}
// 一次循环
for (const item of props.swipeData) {
  let valueArray = swipeGroup[item.enumPictureCategory]
  if (!valueArray) {
    valueArray = []
    swipeGroup[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}
// 去掉数据的【】
const nameReg = /【(.*?)】/i
const getName = (name) => {
  const result = nameReg.exec(name)
  return result[1]
}
// 获取active的动态索引
const getCategoryIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory]
  return valueArray.findIndex(data => data === item) + 1
}
</script>
<style scoped lang="less">
.my-swipe {
  .item {
    img {
      width: 100%;
    }
  }

  .indicator {
    position: absolute;
    right: 5px;
    bottom: 8px;
    display: flex;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.8);
    .item{
      margin: 0 3px;
      &.active{
        padding: 0 3px;
        border-radius: 5px;
        background-color: #fff;
        color: #333;
      }
    }
  }
}
</style>