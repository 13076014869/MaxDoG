
let Api = {
    ReleaseIP: 'http://192.168.31.160/danger',
    AppApiPrefix: 'http://192.168.31.160/danger',
    Danger: {
        
    }
}

Api.Danger.GetPageDangerHistoryInfo = Api.AppApiPrefix + '/api/services/app/pcDangerManager/GetPageDangerHistoryInfo';

export default Api;