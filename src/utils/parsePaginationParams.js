const parseNumber = (number, defaultValue) => {
  if (typeof number === 'number' && !Number.isNaN(number)) {
    return Math.floor(number);
  }
  
  if (typeof number === 'string') {
    const parsedNumber = Number.parseInt(number, 10);
    if (!Number.isNaN(parsedNumber)) {
      return parsedNumber;
    }
  }

  return defaultValue;
};

export default function parsePaginationParams(query) {
  const { page, perPage } = query;

  const parsedPage = Math.max(parseNumber(page, 2));
  const parsedPerPage = Math.max(parseNumber(perPage, 4), 1);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
}
