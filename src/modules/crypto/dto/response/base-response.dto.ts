export interface BaseResponse<T> {
  successful: boolean;
  error_code: string | null;
  data: T | null;
}