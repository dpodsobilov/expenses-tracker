export interface IAuth {
  currentUser: IUserAuth | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}

export interface IUserAuth {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IAuthError {
  message: string;
}
