export type LoginResponse = {
  token: string;
};

export type Status = "success" | "error";

export type Optional<T> = T | undefined;

export type APIResponse<T> = {
  data: Optional<T>;
  status: Status;
};

export type Nullable<T> = T | null;
