import axios from 'axios'

import { BASE_URL, TIMEOUT } from './cofig'
import useMainStote from '@/stores/modules/main'
const mainStore=useMainStote()
class hyRequest {
    constructor(baseURL, timeout = 10000) {
        this.instance = axios.create({
            baseURL,
            timeout
        })
        //拦截器的请求和响应进行控制变量的改变
        this.instance.interceptors.request.use(config => {
            mainStore.isLoading=true
            return config
        }, err => {
            return err
        })
        this.instance.interceptors.response.use(res => {
            mainStore.isLoading=false
            return res
        }, err => {
            mainStore.isLoading=false
            return err
        })
    }
    request(config) {
        return new Promise((resolve, reject) => {
            this.instance.request(config).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    get(config) {
        return this.request({ ...config, method: "get" })
    }
    post(config) {
        return this.request({ ...config, method: "post" })
    }
}

export default new hyRequest(BASE_URL, TIMEOUT)