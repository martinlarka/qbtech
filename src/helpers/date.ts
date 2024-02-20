export const isDateBefore = (a: string, b: string) => {
  return a < b;
};

export const isDateBeforeNow = (a: string) => {
  return isDateBefore(a, new Date().toISOString().slice(0, 10));
};
