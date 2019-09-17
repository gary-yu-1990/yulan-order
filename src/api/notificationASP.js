import { get, post, patch, put } from './httpASP'

//条件获取已发布的公告
export function GetNotificationAll(data, config = {}) {
    return post('/NOTIFICATION/GetPageDataTable', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//获取最新已发布公告
export function GetNewNotification(data, config = {}) {
    return post('/NOTIFICATION/GetNewNotification', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//插入已读公告记录
export function InserFlag(data, config = {}) {
    return post('/NOTIFICATION_READ_FLAG/InserFlag', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}