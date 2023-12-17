export const round = (num: number, digitsAfterDot: number = 2) => {
  return (
    Math.round(num * Math.pow(10, digitsAfterDot)) /
    Math.pow(10, digitsAfterDot)
  );
};
