export const toBrix = (value: number) => {
  return -668.962 + 1262.45 * value - 776.43 * value ** 2 + 182.94 * value ** 3;
};

export const toSG = (gravityReading: number) => {
  return (
    1.00001 +
    0.0038661 * gravityReading +
    1.3488 * 10 ** -5 * gravityReading ** 2 +
    4.3074 * 10 ** -8 * gravityReading ** 3
  );
};
