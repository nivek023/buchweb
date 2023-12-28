export function formatDate(inputDate) {
  // Parse the input date string
  const dateObject = new Date(inputDate);
  // Check if the dateObject is valid
  if (isNaN(dateObject.getTime())) {
    return inputDate;
  }
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year = dateObject.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

export function formatPreis(preis) {
  // Ensure that preis is a float
  if (isNaN(parseFloat(preis))) {
    return preis;
  }
  return preis.toString().replace('.', ',');
}
