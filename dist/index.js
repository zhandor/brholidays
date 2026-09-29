// src/staticDateBrazillianHolidays.ts
var staticDateBrazillianHolidays = [
  {
    date: "01-01",
    name: "Ano Novo"
  },
  {
    date: "04-21",
    name: "Dia de Tiradentes"
  },
  {
    date: "05-01",
    name: "Dia do Trabalhador"
  },
  {
    date: "09-07",
    name: "Independ\xEAncia do Brasil"
  },
  {
    date: "10-12",
    name: "Nossa Senhora Aparecida"
  },
  {
    date: "11-02",
    name: "Finados"
  },
  {
    date: "11-15",
    name: "Proclama\xE7\xE3o da Rep\xFAblica"
  },
  {
    date: "11-20",
    name: "Dia da Consci\xEAncia Negra"
  },
  {
    date: "12-25",
    name: "Natal"
  }
];
var staticDateBrazillianHolidays_default = staticDateBrazillianHolidays;

// src/variableDateBrazillianHolidays.ts
var calculateEasterDate = (year) => {
  const goldenNumber = year % 19;
  const century = Math.floor(year / 100);
  const centuryLeapShift = Math.floor((13 + 8 * century) / 25);
  const quarterCentury = Math.floor(century / 4);
  const secularMoonOffset = (15 - centuryLeapShift + century - quarterCentury) % 30;
  const secularDayCorrection = (4 + century - quarterCentury) % 7;
  const yearMod4 = year % 4;
  const yearMod7 = year % 7;
  const moonAge = (19 * goldenNumber + secularMoonOffset) % 30;
  const daysToSunday = (2 * yearMod4 + 4 * yearMod7 + 6 * moonAge + secularDayCorrection) % 7;
  let day = 22 + moonAge + daysToSunday;
  let month = 3;
  if (day > 31) {
    day -= 31;
    month = 4;
  }
  const isSpecialApril19 = moonAge === 29 && daysToSunday === 6;
  const isSpecialApril18 = moonAge === 28 && daysToSunday === 6 && (11 * secularMoonOffset + 11) % 30 < 19;
  if (isSpecialApril19) {
    day = 19;
    month = 4;
  } else if (isSpecialApril18) {
    day = 18;
    month = 4;
  }
  return new Date(year, month - 1, day);
};
var addLeadingZero = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};
var variableDateBrazillianHolidays = (year) => {
  const easterDate = calculateEasterDate(year);
  const carnivalMonday = new Date(easterDate);
  carnivalMonday.setDate(easterDate.getDate() - 48);
  const carnivalTuesday = new Date(easterDate);
  carnivalTuesday.setDate(easterDate.getDate() - 47);
  const goodFridayDate = new Date(easterDate);
  goodFridayDate.setDate(easterDate.getDate() - 2);
  const corpusChristiDate = new Date(easterDate);
  corpusChristiDate.setDate(easterDate.getDate() + 60);
  return [
    {
      date: `${addLeadingZero(carnivalMonday.getMonth() + 1)}-${addLeadingZero(carnivalMonday.getDate())}`,
      name: "Segunda-Feira de Carnaval"
    },
    {
      date: `${addLeadingZero(carnivalTuesday.getMonth() + 1)}-${addLeadingZero(carnivalTuesday.getDate())}`,
      name: "Ter\xE7a-Feira de Carnaval"
    },
    {
      date: `${addLeadingZero(goodFridayDate.getMonth() + 1)}-${addLeadingZero(goodFridayDate.getDate())}`,
      name: "Sexta-feira Santa"
    },
    {
      date: `${addLeadingZero(easterDate.getMonth() + 1)}-${addLeadingZero(easterDate.getDate())}`,
      name: "P\xE1scoa"
    },
    {
      date: `${addLeadingZero(corpusChristiDate.getMonth() + 1)}-${addLeadingZero(corpusChristiDate.getDate())}`,
      name: "Corpus Christi"
    }
  ];
};
var variableDateBrazillianHolidays_default = variableDateBrazillianHolidays;

// src/brazillianHolidays.ts
var brazillianHolidays = (year = (/* @__PURE__ */ new Date()).getFullYear()) => [
  ...staticDateBrazillianHolidays_default,
  ...variableDateBrazillianHolidays_default(year)
].sort((a, b) => {
  const [monthA, dayA] = a.date.split("-").map(Number);
  const [monthB, dayB] = b.date.split("-").map(Number);
  if (!monthA || !dayA || !monthB || !dayB) {
    throw new Error(
      `Invalid date format in holiday data: ${a.date} or ${b.date}`
    );
  }
  if (monthA === monthB) {
    return dayA - dayB;
  }
  return monthA - monthB;
});
var brazillianHolidays_default = brazillianHolidays;

// src/index.ts
var listBrazillianHolidays = (year) => {
  return brazillianHolidays_default(year);
};
var listHolidaysBetweenDates = (startDate, endDate) => {
  if (startDate > endDate) {
    return [];
  }
  const holidays = [];
  for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year += 1) {
    holidays.push(
      ...brazillianHolidays_default(year).filter((holiday) => {
        const [month, day] = holiday.date.split("-").map(Number);
        if (!month || !day) {
          throw new Error(
            `Invalid date format in holiday data: ${holiday.date}`
          );
        }
        const holidayDate = new Date(year, month - 1, day);
        return holidayDate >= startDate && holidayDate <= endDate;
      }).map((holiday) => ({
        ...holiday,
        date: `${year}-${holiday.date}`
      }))
    );
  }
  return holidays;
};
var countBusinessDaysBetweenDates = (startDate, endDate) => {
  if (startDate > endDate) {
    return 0;
  }
  let businessDaysCount = 0;
  const holidays = listHolidaysBetweenDates(startDate, endDate).map(
    (holiday) => new Date(holiday.date)
  );
  for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    const isHoliday2 = holidays.some(
      (holiday) => holiday.getFullYear() === currentDate.getFullYear() && holiday.getMonth() === currentDate.getMonth() && holiday.getDate() === currentDate.getDate()
    );
    if (!isWeekend && !isHoliday2) {
      businessDaysCount += 1;
    }
  }
  return businessDaysCount;
};
var isHoliday = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const holidays = brazillianHolidays_default(year);
  return holidays.some((holiday) => {
    const [holidayMonth, holidayDay] = holiday.date.split("-").map(Number);
    return holidayMonth === month && holidayDay === day;
  });
};
export {
  brazillianHolidays_default as brazillianHolidays,
  countBusinessDaysBetweenDates,
  brazillianHolidays_default as default,
  isHoliday,
  listBrazillianHolidays,
  listHolidaysBetweenDates
};
