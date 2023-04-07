export const handleResponseError = (res, error) => {
  const status =
    typeof error === 'object' && error !== null && 'status' in error
      ? error.status
      : 500;
  const message =
    typeof error === 'object' && error !== null && 'message' in error
      ? error.message
      : error;

  res.status(status).json({ error: message });
};

const isObject = (variable) => {
  return (
    typeof variable === 'object' &&
    !Array.isArray(variable) &&
    variable !== null
  );
};

const isMissingValues = (record) => {
  const { file, text, number, hex } = record;

  return !file || !text || !number || !hex;
};

const stringContainsOnlyNumbers = (str) => {
  const regExp = /^\d+$/;
  return regExp.test(str);
};

const isValidHexadecimalLength = (str) => str.length === 32;

export const isValidRecord = (record = {}) => {
  if (isObject(record)) {
    const { number, hex } = record;

    if (
      isMissingValues(record) ||
      !stringContainsOnlyNumbers(number) ||
      !isValidHexadecimalLength(hex)
    ) {
      return false;
    }
  }

  return true;
};
