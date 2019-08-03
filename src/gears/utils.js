export default class Utils {
    
    timestamToDate(timestamp) {
        const date = new Date();
        date.setTime(timestamp*1000);
        if (!isNaN(date)) {
            return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' '
                + date.getHours() + ':' + date.getMinutes();
        } else {
            return "";
        }
    }
 }