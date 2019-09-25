import { get, post, patch, put } from './httpASP'
//根据用户ID查找用户区域
export function getOrderByAreaCustomer(data, config = {}) {
    return post('/CTM_ORDER/getOrderByAreaCustomer', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}