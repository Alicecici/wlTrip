<template>
    <div class="navmovies">
        <!-- v-for遍历父组件的titles数组 -->
        <template v-for="(item, index) in titles" :key="item">
            <!-- active 当前生效的索引 -->
            <div class="movieslists" :class="{ active: index === nowindex }" @click="movieslistclick(index)">
                <slot :itema="item">
                    <span class="text">{{ item }}</span>
                </slot>
            </div>
        </template>
    </div>
</template>
<script>

export default {
    // 接收父组件传来的titles 类型为Array
    props: {
        titles: {
            type: Array,
            // 默认传值对象类型
            default: () => []
        }
    },
    data() {
        return {
            nowindex: 0
        }
    },
    methods: {
        //数组形式记录传过去的字符名
        emits: ["movieslist"],
        movieslistclick(index) {
            this.nowindex = index
            // 子传父 传过去的是索引
            this.$emit("movieslist", index)
        },
        setNowindex(index) {
            this.nowindex = index
        }
    }
}
</script>
<style scoped lang="less">
.navmovies {
    display: flex;
    text-align: center;
    height: 44px;
    line-height: 44px;
    background-color: #f8f9fa;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;

    .movieslists {
        flex: 1;
        color: #333;
        position: relative;

    }

    .active {
        color: var(--primary--color);
        // border-bottom: 3px solid #e1aab1;
    }

    // .movieslists::before {
    //     content: '';
    //     height: 2px;
    //     background-color: var(--primary--color);
    //     width: 100%;
    //     position: absolute;
    //     left: 0;
    //     bottom: 8px;
    //     transform: scaleX(0);
    //     transition: .3s;
    // }

    // .movieslists:hover::before {
    //     transform: scaleX(1);
    // }
}
</style>