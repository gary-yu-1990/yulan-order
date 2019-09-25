import { get, post, patch, put } from './httpASP'


export function GetFileByGroupID(data, config = {}) {
    return post('/Download/GetFileByGroupID', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}