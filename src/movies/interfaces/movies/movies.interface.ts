export interface Paginated<Movies> {
  data: Movies[];
  total: number;
  currentPage: number;
  totalPages: number;
}
