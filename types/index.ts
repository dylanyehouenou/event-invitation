export interface Registration {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  created_at: string
}

export interface RegistrationInput {
  first_name: string
  last_name: string
  email: string
  phone?: string
}

export type ApiResult =
  | { success: true;  message: string }
  | { success: false; code: ApiErrorCode; message: string }

export type ApiErrorCode =
  | "REGISTRATIONS_CLOSED"
  | "CAPACITY_REACHED"
  | "DUPLICATE_EMAIL"
  | "VALIDATION_ERROR"
  | "SERVER_ERROR"
