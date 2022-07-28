export interface IPagination {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  offset: number;
  page: number;
  pagingCounter: number;
  prevPage: number;
  totalDocs: number;
  totalPages: number;
}
