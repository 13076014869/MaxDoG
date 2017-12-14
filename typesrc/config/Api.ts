interface InterfaceApi {
    ReleaseIP: string,
    AppApiPrefix: string,
    [propName: string]: any
}


let Api: InterfaceApi = {
    ReleaseIP: 'http://192.168.31.160/danger',
    AppApiPrefix: 'http://192.168.31.160/danger',
    Danger: {
        
    }
}

Api.Danger.GetPageDangerHistoryInfo = Api.AppApiPrefix + '/api/services/app/pcDangerManager/GetPageDangerHistoryInfo';

export default Api;