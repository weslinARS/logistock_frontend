export interface IPagination {
  pageIndex: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
}
export interface ApiResponse<T> {
  message: string | string[];
  data?: T | undefined;
  error?: string | undefined;
  meta: Record<string, unknown>;
  statusCode?: HttpStatus | undefined;
  pagination?: IPagination | undefined;
}

export type ServiceErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'INTERNAL_SERVER_ERROR'
  | 'CONFLICT'
  | 'BAD_REQUEST'
  | 'SERVICE_UNAVAILABLE';

export type RepositoryErrorCode =
  | 'DATABASE_ERROR'
  | 'QUERY_ERROR'
  | 'INVALID_PARAMETERS'
  | 'RECORD_NOT_FOUND'
  | 'DUPLICATE_RECORD'
  | 'TRANSACTION_ERROR'
  | 'RECORD_ALREADY_EXISTS'
  | 'CONNECTION_ERROR';

export interface ApiError {
  errorCode: ServiceErrorCode | RepositoryErrorCode;
  statusCode: HttpStatus;
  message: string;
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}
