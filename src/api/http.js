import Axios from 'axios'
import Cookies from "js-cookie";

const CODE_OK = 0;
//Axios.defaults.baseURL = 'http://14.29.223.114:10250/yulan-order';//正式
Axios.defaults.baseURL = 'http://120.79.140.75:567/yulan-order';//测试
Axios.defaults.withCredentials = true;
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//Axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
/* 添加一个请求拦截器
Axios.interceptors.request.use(function (config) {  
    if(config.method=="post" || config.method=="put"){
        config.data=qs.stringify(config.data);
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
*/

/**
 * 封装get方法
 * @param url 
 * @param params 
 * @returns {Promise} 
 */
export function get(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
        if (Cookies.get("cid") && sessionStorage.getItem("_userId") && sessionStorage.getItem("_userId") != Cookies.get("cid")) {
            vm.$router.push({
                path: '/login'
            });
            reject('登录失效');
        }
        Axios.get(url, {
            params: params,
        }, config)
            .then(response => {
                if (response.data.code === CODE_OK) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
        if (Cookies.get("cid") && sessionStorage.getItem("_userId") && sessionStorage.getItem("_userId") != Cookies.get("cid")) {
            vm.$router.push({
                path: '/login'
            });
            reject('登录失效');
        }
        Axios.post(url, data, config)
            .then(response => {
                if (response.data.code === CODE_OK) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(error => {
                reject(error);
            })
        // ,err => {
        //         reject(err)
        //     })
    })
}
/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
        if (Cookies.get("cid") && sessionStorage.getItem("_userId") && sessionStorage.getItem("_userId") != Cookies.get("cid")) {
            vm.$router.push({
                path: '/login'
            });
            reject('登录失效');
        }
        Axios.patch(url, data, config)
            .then(response => {
                if (response.data.code === CODE_OK) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(error => {
                reject(error);
            })
        // ,err => {
        //     reject(err)
        // })
    })
}
/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
        if (Cookies.get("cid") && sessionStorage.getItem("_userId") && sessionStorage.getItem("_userId") != Cookies.get("cid")) {
            vm.$router.push({
                path: '/login'
            });
            reject('登录失效');
        }
        Axios.put(url, data, config)
            .then(response => {
                if (response.data.code === CODE_OK) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            }, err => {
                reject(err)
            })
    })
}