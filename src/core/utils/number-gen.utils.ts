export const genRandNumAboveZero = () => {
  let num = 0;

  while (num === 0) {
    num = Math.random();
  }

  return num;
};
