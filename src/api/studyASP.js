import { get, post, patch, put } from './httpASP'

//获得用户可见调查表
export function GetCustomerStudy(data, config = {}) {
    return post('/STUDY_FORM/GetCustomerStudy', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//获得用户必须填写调查表
export function GetCustomerMustWriteStudy(data, config = {}) {
    return post('/STUDY_FORM/GetCustomerMustWriteStudy', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//获得调查表内容
export function GetGroupContextOption(data, config = {}) {
    return post('/SF_GROUP/GetGroupContextOption', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//插入开始记录
export function BeginEditStudy(data, config = {}) {
    return post('/STDUYTABLERESULT/BeginEditStudy', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//提交调查表
export function SubmitStudy(data, config = {}) {
    return post('/STDUYTABLERESULT/SubmitStudy', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}