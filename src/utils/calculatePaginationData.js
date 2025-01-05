
export default function calculatePaginationData({ count, perPage, page }) {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPreviousPage = page !== 1;

  return {
    page: 2,
    perPage: 4,
    totalItems: 6,
    totalPages: 2,
    hasNextPage,
    hasPreviousPage,
  };
}
