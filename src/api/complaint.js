import { get, post, patch, put } from './httpASP'

//加载所有用户的投诉信息
export function GetAllComplaintInfo(data, config = {}) {
    return post('/Complaint/GetAllComplaintInfo', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

//查询满足相应条件的所有用户的投诉信息
export function GetAllUserComplaint(data, config = {}) {
    return post('/Complaint/GetAllUserComplaint', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

//查询满足相应条件的当前用户的投诉信息
export function GetAllComplaint(data, config = {}) {
    return post('/Complaint/GetAllComplaint', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

//提交或者修改投诉单
export function addSubmit(data, config = {}) {
    return post('/Complaint/AddRecord', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

//提交或者修改投诉单
export function editSubmit(data, config = {}) {
    return post('/Complaint/EditRecord', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

//查看投诉单详情
export function CheckDetailByID(data, config = {}) {
    return post('/Complaint/CheckDetailByID', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}