import hyRequest from '../request'
export function getHotSuggest() {
    return hyRequest.get({
        url:"/home/hotSuggests"
    })
}
export function getCategories() {
    return hyRequest.get({
        url:"home/categories"
    })
}
// 分页数据传递参数
export function getHomeHouselist(currentPage) {
    return hyRequest.get({
        url: "/home/houselist",
        params: {
            page:currentPage
        }
    })
}