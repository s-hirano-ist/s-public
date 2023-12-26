export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const appropriateRating = (rating: number, MAX_RATING: number) => {
  return !(!Number.isInteger(rating) || rating < 0 || rating > MAX_RATING);
};

export const appropriateIsbn = (isbn: string) => {
  return isbn.length === 13;
};

export const isbnDuplication = (isbnList: string[]) => {
  const isbnSet = [...new Set(isbnList)];
  return isbnList.length !== isbnSet.length;
};
