/** Converts centimetres to inches
 * @param {number} value
 * @return {number}
 */
export function convertCentimetresToInches(value) {
  return (value / 2.54).toFixed(2);
}

/** Converts centimetres to feet
 * @param {number} value
 * @return {number}
 */
export function convertCentimetresToFeet(value) {
  return (value / 30.48).toFixed(2);
}
