import { ErrorResponse } from "./ErrorResponse";

export class LoginResponse {
  status: boolean;
  validUser: boolean;
  validPwd: boolean;
  userType: string;
  error: ErrorResponse;
}
