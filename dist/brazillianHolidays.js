import staticDateBrazillianHolidays from "./staticDateBrazillianHolidays.js";
import variableDateBrazillianHolidays from "./variableDateBrazillianHolidays.js";
const brazillianHolidays = (year = new Date().getFullYear()) => [
    ...staticDateBrazillianHolidays,
    ...variableDateBrazillianHolidays(year),
].sort((a, b) => {
    const [monthA, dayA] = a.date.split("-").map(Number);
    const [monthB, dayB] = b.date.split("-").map(Number);
    if (!monthA || !dayA || !monthB || !dayB) {
        throw new Error(`Invalid date format in holiday data: ${a.date} or ${b.date}`);
    }
    if (monthA === monthB) {
        return dayA - dayB;
    }
    return monthA - monthB;
});
export default brazillianHolidays;
//# sourceMappingURL=brazillianHolidays.js.map