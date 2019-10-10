import { get, post, patch, put } from './httpASP'
//根据用户ID查找用户区域
export function getAreaCode(data, config = {}) {
    return post('/PACK_DETAIL/getAreaCode', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//通过区域查片区
export function getDistrictByAreaCode(data, config = {}) {
    return post('/PACK_DETAIL/getDistrictByAreaCode', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

//通过区域查客户
export function getCustomerByAreaCode(data, config = {}) {
    return post('/PACK_DETAIL/getCustomerByAreaCode', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

//通过提货单查详情
export function getPackDetailsBySaleNo(data, config = {}) {
    return post('/PACK_DETAIL/getPackDetailsBySaleNo', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

//根据时间及客户编码查提货单
export function getPackDetails(data, config = {}) {
    return post('/PACK_DETAIL/getPackDetails', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
