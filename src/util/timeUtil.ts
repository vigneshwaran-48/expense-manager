
export const getCurrentTimeForExpense = () => {
  return new Date().toISOString().slice(0, 16);
}
