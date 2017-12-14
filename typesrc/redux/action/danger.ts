// import fetch from 'isomorphic-fetch';
import Api from '../../config/Api';


interface FetchHeaders {
    [propName: string]: any
}


export const GET_DANGER_HISTORY_INFO = 'GET_DANGER_HISTORY_INFO';

//获取数据成功
const getDataSuccess = (json: any, success: any, type: string) => {
    return {
        type: type,
        json,
        success
    }
}


// 查询获取隐患信息表格
export const getDangerHistoryInfo = (params: any, success?: any) => {
    var path = Api.Danger.GetPageDangerHistoryInfo;

    let fetchParams: FetchHeaders = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    };

    return (dispatch: any) => {
        return fetch(path, fetchParams)
            .then(response => response.json())
            .then(json => dispatch(getDataSuccess(json, success, GET_DANGER_HISTORY_INFO)))
            .catch(error => console.log(error))
    }
}