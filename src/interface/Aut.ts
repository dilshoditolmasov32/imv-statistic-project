export interface AuthPayload {
  code: string;
  redirect_url: string;
  code_verifier: string | null;
}