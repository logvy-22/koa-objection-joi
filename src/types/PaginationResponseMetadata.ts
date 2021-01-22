import { PaginationRequestPayload } from './PaginationRequestPayload';

export interface PaginationResponseMetadata extends PaginationRequestPayload {
  page_count: number;
  total_count: number;
}
