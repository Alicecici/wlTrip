import { defineStore } from "pinia";
const nowDate = new Date()
const newDate = new Date()
newDate.setDate(nowDate.getDate() + 1)
const useMainStote = defineStore("main", {
    state: () => ({
        token: "",
        nowDate: nowDate,
        newDate: newDate,
        isLoading:false 
    }),
    actions: {
    }
})
export default useMainStote