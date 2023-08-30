<template>
    <div class="map">
        <detailSection title="位置周边" more-text="查看更多位置周边">
            <div class="inner" ref="mapRef">
                
            </div>
        </detailSection>
    </div>
</template>
<script setup>
import detailSection from '@/components/detailSection/detailSection.vue';
import { onMounted, ref } from 'vue';
const props = defineProps({
    position: {
        type: Object,
        default:()=>({})
    }
})
const mapRef = ref()
// 集成百度地图 调用api
onMounted(() => {
    const map = new BMapGL.Map(mapRef.value);          // 创建地图实例 
    const point = new BMapGL.Point(props.position.longitude, props.position.latitude);  // 创建点坐标 
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
    const marker = new BMapGL.Marker(point);        // 创建标注   
    map.addOverlay(marker);                     // 将标注添加到地图中
})
</script>
<style scoped lang="less">
.map{
    .inner{
        height: 250px;
    }
}
</style>