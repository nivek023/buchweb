export function validateISBN(isbn) {
  const isbnRegex = /\d{3}-\d-\d{3}-\d{5}-\d$/u;
  return isbnRegex.test(isbn);
}

export function validateTitle(titel) {
  const textRegex = /\S+/;
  return textRegex.test(titel)
}

export function validatePreis(preis) {
  const preisRegex = /^\d+(\.\d{1,2})?$/;
  return preisRegex.test(preis);
}

export function validateRabatt(rabatt) {
  const isRabatt = /^(0(\.\d{1,2})?|1(\.0{1,2})?)$/;
  return isRabatt.test(rabatt);
}

export function validateDatum(datum) {
  const isDatum = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  return isDatum.test(datum);
}

export function validateHomepage(homepage) {
  const isHomepage =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.(com|de|net)$/;
  return isHomepage.test(homepage);
}
