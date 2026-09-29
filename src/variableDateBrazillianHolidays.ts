const calculateEasterDate = (year: number): Date => {
  // 1. Metonic cycle remainder (Golden Number)
  const goldenNumber = year % 19;

  // 2. Century calculations
  const century = Math.floor(year / 100);
  const centuryLeapShift = Math.floor((13 + 8 * century) / 25);
  const quarterCentury = Math.floor(century / 4);

  // 3. Secular adjustments for moon and days
  const secularMoonOffset =
    (15 - centuryLeapShift + century - quarterCentury) % 30;
  const secularDayCorrection = (4 + century - quarterCentury) % 7;

  // 4. Year remainders for leap years and weekdays
  const yearMod4 = year % 4;
  const yearMod7 = year % 7;

  // 5. Epact (age of the moon) and weekday shift calculations
  const moonAge = (19 * goldenNumber + secularMoonOffset) % 30;
  const daysToSunday =
    (2 * yearMod4 + 4 * yearMod7 + 6 * moonAge + secularDayCorrection) % 7;

  // 6. Base date calculation (March 22 + moonAge + daysToSunday)
  let day = 22 + moonAge + daysToSunday;
  let month = 3; // March

  if (day > 31) {
    day -= 31;
    month = 4; // April
  }

  // Gauss historical exceptions for specific edge cases
  const isSpecialApril19 = moonAge === 29 && daysToSunday === 6;
  const isSpecialApril18 =
    moonAge === 28 &&
    daysToSunday === 6 &&
    (11 * secularMoonOffset + 11) % 30 < 19;

  if (isSpecialApril19) {
    day = 19;
    month = 4;
  } else if (isSpecialApril18) {
    day = 18;
    month = 4;
  }

  // JavaScript Date month is 0-indexed (January = 0, March = 2, Abril = 3)
  return new Date(year, month - 1, day);
};

const addLeadingZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

const variableDateBrazillianHolidays = (
  year: number,
): { date: string; name: string }[] => {
  const easterDate = calculateEasterDate(year);
  const carnivalMonday = new Date(easterDate);
  carnivalMonday.setDate(easterDate.getDate() - 48);
  const carnivalTuesday = new Date(easterDate);
  carnivalTuesday.setDate(easterDate.getDate() - 47); // Carnival is 47 days before Easter
  const goodFridayDate = new Date(easterDate);
  goodFridayDate.setDate(easterDate.getDate() - 2); // Good Friday is 2 days before Easter
  const corpusChristiDate = new Date(easterDate);
  corpusChristiDate.setDate(easterDate.getDate() + 60); // Corpus Christi is 60 days after Easter

  return [
    {
      date: `${addLeadingZero(carnivalMonday.getMonth() + 1)}-${addLeadingZero(carnivalMonday.getDate())}`,
      name: "Segunda-Feira de Carnaval",
    },
    {
      date: `${addLeadingZero(carnivalTuesday.getMonth() + 1)}-${addLeadingZero(carnivalTuesday.getDate())}`,
      name: "Terça-Feira de Carnaval",
    },
    {
      date: `${addLeadingZero(goodFridayDate.getMonth() + 1)}-${addLeadingZero(goodFridayDate.getDate())}`,
      name: "Sexta-feira Santa",
    },
    {
      date: `${addLeadingZero(easterDate.getMonth() + 1)}-${addLeadingZero(easterDate.getDate())}`,
      name: "Páscoa",
    },
    {
      date: `${addLeadingZero(corpusChristiDate.getMonth() + 1)}-${addLeadingZero(corpusChristiDate.getDate())}`,
      name: "Corpus Christi",
    },
  ];
};

export default variableDateBrazillianHolidays;
