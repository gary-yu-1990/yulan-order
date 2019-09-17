import { get, post, patch, put} from './http'

//获取全部下载文档的信息（分文档类型）
export function getAllDownloadFiles(data){
    return post('/item/getSoftDecorationInfo.do',data).then((res) => {
        return Promise.resolve(res);
    }).catch((err) =>{
        return Promise.reject(err);
    })
}
//文档的模糊查询
export function getSingleDownloadFile(data){
    return post('/item/getSoftInfoSingle.do',data).then((res) =>{
        return Promise.resolve(res);
    }).catch((err) =>{
        return Promise.reject(err);
    })
}
