export const isDateValid = (dateStr) => {
  return !isNaN(new Date(dateStr));
}
