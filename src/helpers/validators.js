const isGreaterThenZero = value => (value > 0);
const isPositive = value => (value >= 0);
const isNumber = value => !isNaN(value);

export const validateSize = value => isNumber(value) && isGreaterThenZero(value);
export const validatePosition = value => isNumber(value) && isPositive(value);
export const validateWidth = (value, remainingWidth) => ((remainingWidth - value) >= 0);
export const isRequiredFieldsFilled = fields => !fields.length;
