export default class Utils {

    timestampToDate(timestamp) {
        const date = new Date();
        date.setTime(timestamp*1000);
        if (!isNaN(date)) {
            const dateN = '0'+ date.getDate(),
                month = '0'+ date.getMonth(),
                hours = '0'+ date.getHours(),
                minutes = '0'+ date.getMinutes();
            return dateN.substr(-2) + '.' + month.substr(-2) + '.' + date.getFullYear() + ' '
                + hours.substr(-2) + ':' + minutes.substr(-2);
        } else {
            return "";
        }
    }

    minutesToHour(n) {
        const num = n;
        const hours = (num / 60);
        const rhours = Math.floor(hours);
        const minutes = (hours - rhours) * 60;
        const rminutes = Math.round(minutes);
        return rhours + "h " + rminutes + "m";
    }

 }