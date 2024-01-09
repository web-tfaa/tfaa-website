// External Dependencies
import {
  format,
  isAfter,
} from 'date-fns';

// Begin Helpers
export const removeErrorKeys: unknown = (form: unknown) => {
  if (typeof form !== 'object') {
    return;
  }

  let found = false;
  const result = { ...form };
  const resultKeys = Object.keys(result);

  // We remove any error keys in a form before we send it to the backend
  for (let i = 0; i < resultKeys.length; i += 1) {
    const currentKey = resultKeys[i];
    if (currentKey.endsWith('Error')) {
      delete result[currentKey];
      found = true;
    }
  }

  // If error keys are found, return the new form object
  // If not, return the original form object
  return found ? result : form;
};

// To check for a valid email address
export const emailRegex = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,}$/i;

// To check for a valid ZIP Code
export const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/i;

// Current Year - four-digit string
export const currentYearLong = format(new Date(), 'yyyy');

// Current Year - two-digit string
export const currentYearShort = format(new Date(), 'yy');

// We normally shut down registration and sponsorship after TMEA each year and open it up on 8/1
// Use the `isTodayAfterJune30th` helper

// As of 2023-06-28, the "year" for TMAC starts on 8/1
// new Date(2023, 7, 1) → 8/1/2023
export const isTodayAfterJuly31st = isAfter(
  new Date(),
  new Date(parseInt(currentYearLong, 10), 7, 1),
);

export const currentSchoolYearShort = isTodayAfterJuly31st
  ? `${currentYearShort}-${Number(currentYearShort) + 1}`
  : `${Number(currentYearShort) - 1}-${currentYearShort}`;

export const currentSchoolYearLong = isTodayAfterJuly31st
  ? `${currentYearLong}-${Number(currentYearLong) + 1}`
  : `${Number(currentYearLong) - 1}-${currentYearLong}`;

export const currentSchoolYearEnding = isTodayAfterJuly31st
  ? `${Number(currentYearLong) + 1}`
  : currentYearLong;
