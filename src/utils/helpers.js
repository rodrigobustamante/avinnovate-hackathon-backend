export const isDateValid = (dateStr) => {
  return !isNaN(new Date(dateStr));
}

export const formatFirestoreTimestamp = timestampObj => {
  const milliseconds = timestampObj._seconds * 1000;
  const date = new Date(milliseconds);
  const formattedDate = `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
  return formattedDate;
};
