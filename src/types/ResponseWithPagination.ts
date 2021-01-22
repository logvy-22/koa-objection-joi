import { PaginationResponseMetadata } from './PaginationResponseMetadata';

export type ResponseWithPagination<T> = {
  metadata: PaginationResponseMetadata;
  data: T[];
};
