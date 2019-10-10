import { get, post, patch, put } from './httpASP'
//根据id查找汇款单
export function GetPaymentById(data, config = {}) {
    return post('/PAYMENT_BILL/GetPaymentById', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}