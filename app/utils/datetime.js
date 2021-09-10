import moment from 'moment';

export const DATE_STRING_FORMAT = "YYYY/MM/DD";
export const TIME_STRING_FORMAT = "hh:mm a";
export const DATE_TIME_STRING_FORMAT = "YYYY/MM/DD HH:mm";

export const dateToString = (date, format) => {
    return moment(date.seconds * 1000).format(format);
}
