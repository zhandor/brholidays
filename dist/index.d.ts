declare const brazillianHolidays: (year?: number) => {
    date: string;
    name: string;
}[];

declare const listBrazillianHolidays: (year: number) => {
    date: string;
    name: string;
}[];
declare const listHolidaysBetweenDates: (startDate: Date, endDate: Date) => {
    date: string;
    name: string;
}[];
declare const countBusinessDaysBetweenDates: (startDate: Date, endDate: Date) => number;
declare const isHoliday: (date: Date) => boolean;

export { brazillianHolidays, countBusinessDaysBetweenDates, brazillianHolidays as default, isHoliday, listBrazillianHolidays, listHolidaysBetweenDates };
