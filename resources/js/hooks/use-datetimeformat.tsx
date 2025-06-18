export function ConvertoDateTimeFormat(datetime: string) {
    const _date = new Date(datetime);
    const _year = _date.getFullYear();
    const _month = _date.getMonth().toString().padStart(2, '0');
    const _day = _date.getDate().toString().padStart(2, '0');

    const _formatteddate = _day + "/" + _month + "/" + _year;

    return _formatteddate;
}