import { onUnmounted } from "vue"
import { onMounted } from "vue"
import { ref } from "vue";
import { throttle } from "underscore"

/* 
import { onUnmounted } from "vue"
import { onMounted } from "vue"
// 1.传入一个回调函数
export default function useScroll(reachBottonCB) {
    const scrollLirenerHandler = () => {
        // clientHeight 可见区域高度
        const clientHeight = document.documentElement.clientHeight
        // scrollTop 滚动调顶部到浏览器高度
        const scrollTop = document.documentElement.scrollTop
        // scrollHeight 滚动视口高度(也就是当前元素的真实高度)
        const scrollHeight = document.documentElement.scrollHeight
        // scrollTop + clientHeight >= scrollHeight时，说明滑到底部 此时发送网络请求，加载下一页数据
        if (clientHeight + scrollTop >= scrollHeight) {
            if (reachBottonCB) { reachBottonCB() }
            }
    }
    // 用onMounted生命周期来挂载监听
    onMounted(() => {
        window.addEventListener("scroll", scrollLirenerHandler)
    })
    // 用onUNmounted生命周期移除监听
    onUnmounted(() => {
        window.removeEventListener("scroll", scrollLirenerHandler)
    })
} 
*/
export default function useScroll(elRef) {
    let el = window
    const isReachBottom = ref(false)
    const clientHeight = ref(0)
    const scrollTop = ref(0)
    const scrollHeight = ref(0)
    // throttle 节流 节省监听滚动的频率
    const scrollLirenerHandler = throttle(() => {
        if (el === window) {
            // 监听window滚动
            clientHeight.value = document.documentElement.clientHeight
            scrollTop.value = document.documentElement.scrollTop
            scrollHeight.value = document.documentElement.scrollHeight
            console.log("监听到滚动");
        } else {
            // 监听元素的滚动
            clientHeight.value = el.clientHeight
            scrollTop.value = el.scrollTop
            scrollHeight.value = el.scrollHeight
        }

        if (clientHeight.value + scrollTop.value + 1 >= scrollHeight.value) {
            isReachBottom.value = true
            console.log("滚动到底部");
        }
    }, 100)
    onMounted(() => {
        if (elRef) el = elRef.value
        el.addEventListener("scroll", scrollLirenerHandler)
    })
    onUnmounted(() => {
        el.removeEventListener("scroll", scrollLirenerHandler)
    })
    return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}
