import { UI_ELEMENTS } from "./view.js";
import {intervalToDuration, fromUnixTime, formatDistanceStrict, isBefore} from "date-fns";

function calcResult(event) {
    event.preventDefault()
    const inputValue = UI_ELEMENTS.INPUT.valueAsNumber 
    const nowDate = new Date();
    const inputDate = fromUnixTime(inputValue / 1000);
    const isDatePast = isBefore(inputDate, nowDate);
    const output = intervalToDuration({
        start: nowDate,
        end: inputDate
    })
    const {years, hours} = output;
    const days = formatDistanceStrict(nowDate, inputDate,{unit:'day'});
    if (isDatePast) {
        UI_ELEMENTS.RESULT.textContent = `Was ${years} years, ${parseInt(days) - (365 * years)} days and ${hours} hours ago`;
    } else {
        UI_ELEMENTS.RESULT.textContent = `Will come ${years} years, ${parseInt(days) - (365 * years)} days and ${hours} hours`;
    }
}

UI_ELEMENTS.FORM.addEventListener('submit', calcResult);