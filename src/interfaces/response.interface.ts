import { User } from "./props.interface";

interface CheckedUser {
  user: User;
  authorizationToken: string;
  refreshToken: string;
}

interface BaseResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export { BaseResponse, CheckedUser };
