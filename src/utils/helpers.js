// Begin Helpers
export const removeErrorKeys = form => {
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

// To check for a valid Email address
export const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/i;
