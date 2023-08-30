import { getHotSuggest, getCategories, getHomeHouselist } from "@/services";
import { defineStore } from "pinia";
const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggests: [],
        categories: [],
        houselist: [],
        currentPage:1
    }),
    actions: {
        async fetchHotSuggestData() {
            const res = await getHotSuggest()
            this.hotSuggests = res.data
        },
        async fecCategoriesData() {
            const res = await getCategories()
            this.categories = res.data
        },
        // 对数据进行追加，当本页加载完后加载下一页
        async fetchHouselistData() {
            const res = await getHomeHouselist(this.currentPage)
            // 传递的数据是数组形式 进行解构
            this.houselist.push(...res.data)
            this.currentPage++
        }
    }
})
export default useHomeStore