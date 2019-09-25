import { get, post, patch, put } from './httpASP'

export function GetPoDetail(data, config = {}) {
    return post('/PUR_HEAD/GetPoDetail', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function GetRelativePo(data, config = {}) {
    return post('/PUR_HEAD/GetRelativePo', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function GetTransDetail(data, config = {}) {
    return post('/PUR_HEAD/GetTransDetail', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//窗帘审核订单数据
// export function getCurtainOrders(data, config = {}) {
//     return post('/CTM_ORDER/getCurtainOrders', data, config).then((res) => {
//             return Promise.resolve(res);
//         }
//     }).catch((err) => {
//         return Promise.reject(err);
//     })
// }

// //墙纸和软装的订单提交
// export function normalOrderSettlement(data, config = {}) {
//     return post('/CTM_ORDER/normalOrderSettlement', data, config).then((res) => {
//             return Promise.resolve(res);
//     }).catch((err) => {
//         return Promise.reject(err);
//     })
// }
// //修改，退回，客户修改，审核通过
// export function updateCurtainOrder(data, config = {}) {
//     return post('/CTM_ORDER/updateCurtainOrder', data, config).then((res) => {
//             return Promise.resolve(res);
//     }).catch((err) => {
//         return Promise.reject(err);
//     })
// }
// //插入操作记录
// export function InsertOperationRecord(data, config = {}) {
//     return post('/ORDER_OPERATION_RECORD/InsertModel', data, config).then((res) => {
//             return Promise.resolve(res);
//     }).catch((err) => {
//         return Promise.reject(err);
//     })
// }
// //出货详情
// export function getPackDetailInfo(data, config = {}) {
//     return post('/PACK_DETAIL/getPackDetailInfo', data, config).then((res) => {
//             return Promise.resolve(res);
//     }).catch((err) => {
//         return Promise.reject(err);
//     })
// }