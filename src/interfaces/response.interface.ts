interface User {
  id: string;
  name: string;
  lastName: string;
  userName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

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

export { User, CheckedUser, BaseResponse };
