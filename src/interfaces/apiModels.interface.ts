interface User {
  id: string;
  name: string;
  lastName: string;
  userName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface loginUser {
  email: string;
  password: string;
}

interface registerUser {
  userName: string;
  email: string;
  password: string;
}

interface recoverPassword {
  email: string;
}

interface updateUser {
  userName?: string;
  name?: string;
  lastName?: string;
  email?: string;
}

export { updateUser, loginUser, registerUser, recoverPassword, User };
