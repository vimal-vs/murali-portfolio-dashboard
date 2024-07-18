import moment from 'moment';
import momentTimezone from 'moment-timezone';

const getCurrentDateTimeMoment = () => {
    return momentTimezone().tz('Asia/Kolkata');
}

const DateUtils = {
    getDateYyyyMmDd: (date) => {
        return momentTimezone(date).tz('Asia/Kolkata').format('YYYY-MM-DD');
    },
    getCurrentDate: () => {
        return getCurrentDateTimeMoment().format('YYYY-MM-DD');
    },
    getCurrentDateFormat: () => {
        return getCurrentDateTimeMoment().format('DD-MM-YYYY');
    },
    getExDateFormat: (date) => {
        return momentTimezone(date).tz('Asia/Kolkata').format('DD-MM-YYYY');
    },
    getCurrentDateTime: () => {
        return getCurrentDateTimeMoment().format('YYYY-MM-DD HH:mm:ss');
    },
    getTMinusDate: (days) => {
        return getCurrentDateTimeMoment().subtract(days, 'days').format('YYYY-MM-DD');
    },
    getTPlusDate: (days) => {
        return getCurrentDateTimeMoment().add(days, 'days').format('YYYY-MM-DD');
    },
    getTMinusDateTime: (days) => {
        return getCurrentDateTimeMoment().subtract(days, 'days').format('YYYY-MM-DD HH:mm:ss');
    },
    getTPlusDateTime: (days) => {
        return getCurrentDateTimeMoment().add(days, 'days').format('YYYY-MM-DD HH:mm:ss');
    },
    convertDate: (date) => {
        return momentTimezone(date).tz('Asia/Kolkata').format('DD-MM-YYYY');
    },
    convertDateReverse: (date) => {
        return momentTimezone(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
    },
    convertTime: (time) => {
        return momentTimezone(time, 'hh:mm').format('LT');
    },

    getDateAndTimeFromUnixTimestamp: (unixTimestamp) => {
        return momentTimezone.unix(unixTimestamp).tz('Asia/Kolkata').format('YYYY-MM-DD hh:mmA');
    },

    compareFromAndToDate : (fDate, tDate)  => {
        console.log(fDate, tDate);
        const fromDate = moment(fDate, "YYYY-MM-DD");
        const toDate = moment(tDate, "YYYY-MM-DD");

        if(!fromDate.isSameOrBefore(toDate)) {
            return false;
        }
        return true;
    }


}
export default DateUtils;
