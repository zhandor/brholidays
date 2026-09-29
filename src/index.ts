import brazillianHolidays from "./brazillianHolidays.js";

const listBrazillianHolidays = (
  year: number,
): { date: string; name: string }[] => {
  return brazillianHolidays(year);
};

const listHolidaysBetweenDates = (
  startDate: Date,
  endDate: Date,
): { date: string; name: string }[] => {
  if (startDate > endDate) {
    return [];
  }

  const holidays: { date: string; name: string }[] = [];
  for (
    let year = startDate.getFullYear();
    year <= endDate.getFullYear();
    year += 1
  ) {
    holidays.push(
      ...brazillianHolidays(year)
        .filter((holiday) => {
          const [month, day] = holiday.date.split("-").map(Number);
          if (!month || !day) {
            throw new Error(
              `Invalid date format in holiday data: ${holiday.date}`,
            );
          }

          const holidayDate = new Date(year, month - 1, day);
          return holidayDate >= startDate && holidayDate <= endDate;
        })
        .map((holiday) => ({
          ...holiday,
          date: `${year}-${holiday.date}`,
        })),
    );
  }

  return holidays;
};

const countBusinessDaysBetweenDates = (
  startDate: Date,
  endDate: Date,
): number => {
  if (startDate > endDate) {
    return 0;
  }

  let businessDaysCount = 0;
  const holidays = listHolidaysBetweenDates(startDate, endDate).map(
    (holiday) => new Date(holiday.date),
  );

  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6; // Sunday = 0, Saturday = 6
    const isHoliday = holidays.some(
      (holiday) =>
        holiday.getFullYear() === currentDate.getFullYear() &&
        holiday.getMonth() === currentDate.getMonth() &&
        holiday.getDate() === currentDate.getDate(),
    );

    if (!isWeekend && !isHoliday) {
      businessDaysCount += 1;
    }
  }

  return businessDaysCount;
};

const isHoliday = (date: Date): boolean => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript months are 0-indexed
  const day = date.getDate();

  const holidays = brazillianHolidays(year);
  return holidays.some((holiday) => {
    const [holidayMonth, holidayDay] = holiday.date.split("-").map(Number);
    return holidayMonth === month && holidayDay === day;
  });
};

export {
  listBrazillianHolidays,
  listHolidaysBetweenDates,
  isHoliday,
  countBusinessDaysBetweenDates,
};

export { default } from "./brazillianHolidays";
export { default as brazillianHolidays } from "./brazillianHolidays";
