import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { IAuth, IAuthError, IUserAuth } from "../../interfaces/auth-interfaces";
import { IUser } from "../../interfaces/user-interfaces";

export const BASE_URL: string = import.meta.env.VITE_API_URL;

const initialState: IAuth = {
  currentUser: null,
  isAuth: false,
  isLoading: false,
  error: "",
};

export const register = createAsyncThunk<IUserAuth, IUser>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { email, name, password, expenses } = userData;

      const getUsers = async (): Promise<IUser[]> => {
        const { data } = await axios.get(`${BASE_URL}/users`);
        return data;
      };
      const users: IUser[] = await getUsers();
      const user = users.find((user) => user.email === userData.email);

      if (user) throw new Error("Пользователь уже существует!");

      const { data } = await axios.post<IUser>(`${BASE_URL}/users`, {
        name,
        email,
        password,
        expenses,
      });

      const userAuth: IUserAuth = {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
      };
      return userAuth;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk<IUserAuth, IUser>(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<IUser[]>(`${BASE_URL}/users`);

      const user = data.find((user) => user.email === userData.email);

      if (user === undefined)
        throw new Error("Такого пользователя не существует!");

      if (user.password !== userData.password)
        throw new Error("Неверный пароль!");

      const { id, name, email, password } = user;

      return { id, name, email, password } as IUserAuth;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.currentUser = null;
      state.error = "";
    },
    clearError(state) {
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<IUserAuth>) => {
          state.isLoading = false;
          state.isAuth = true;
          state.currentUser = action.payload;
          state.error = "";
        }
      )
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<IUserAuth>) => {
        state.isLoading = false;
        state.isAuth = true;
        state.currentUser = action.payload;
        state.error = "";
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<IAuthError>) => {
        state.error = action.payload.message;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;

function isError(action: UnknownAction) {
  return action.type.endsWith("rejected");
}
