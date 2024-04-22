export function temperatureCorrection(
  sg: number,
  curTemp: number,
  calTemp: number
) {
  const tempCorrect =
    sg *
    ((1.00130346 -
      0.000134722124 * curTemp +
      0.00000204052596 * curTemp ** 2 -
      0.00000000232820948 * curTemp ** 3) /
      (1.00130346 -
        0.000134722124 * calTemp +
        0.00000204052596 * calTemp ** 2 -
        0.00000000232820948 * calTemp ** 3));
  return tempCorrect;
}
export function toFahrenheit(currentTemp: number) {
  return currentTemp * (9 / 5) + 32;
}
