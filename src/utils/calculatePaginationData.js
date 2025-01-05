export default function calculatePaginationData({ contactsCount, perPage, page }) {
  const totalPages = Math.ceil(contactsCount / perPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    page,
    perPage,
    totalItems: contactsCount, 
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
}
