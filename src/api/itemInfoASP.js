import { get, post, patch, put } from './httpASP'

//通过productType和授权的仓库查询物料
export function GetItemByProductType(data, config = {}) {
    return post('/ITEM/GetItemByProductType', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//通过stockId查询物料
export function GetStockByItemNo(data, config = {}) {
    return post('/ITEM/GetStockByItemNo', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//根据userid查询仓库权限
export function GetStockByUser(data, config = {}) {
    return post('/STOCK_USER/GetStockByUser', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}