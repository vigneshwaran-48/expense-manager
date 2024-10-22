
export const getCurrentTimeForExpense = () => {
  return new Date().toISOString().slice(0, 16);
}

export const getDisplayTime = (date: string) => {
  const dateObj = new Date(date);
  if (dateObj.toDateString() !== new Date().toDateString()) {
    const year = new Date().getFullYear() !== dateObj.getFullYear() ? "" : dateObj.getFullYear();
    return `${dateObj.getDate()} ${dateObj.toLocaleString("en", { "month": "long" })} ${year}`;
  }
  return `Today ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}
