import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../user/userSlice";
import axios from "axios";
import { RootState } from "../../store/store";
// import { BASE_URL } from "../../store/store";

export const BASE_URL: string = "http://localhost:9000";
interface IAuth {
  currentUser: IUserAuth | null;
  isAuth: boolean;
  isLoading: boolean;
}

export interface IUserAuth {
  id: string;
  name: string;
  email: string;
  password: string;
}

const initialState: IAuth = {
  currentUser: null,
  isAuth: false,
  isLoading: false,
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

export const login = createAsyncThunk(
  "auth/login",
  async (userData: IUser, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<IUser[]>(`${BASE_URL}/users`);

      const user = data.find((user) => user.email === userData.email);

      if (user === undefined)
        throw new Error("Такого пользователя не существует!");

      if (user.password !== userData.password)
        throw new Error("Неверный пароль!");

      const { id, name, email, password } = user;

      return { id, name, email, password };
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
          state.currentUser = { ...action.payload };
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
        state.currentUser = { ...action.payload };
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
      });
  },
});

//export const getUserId = (state: RootState) => state.auth.currentUser?.id;

export const { logout } = authSlice.actions;

export default authSlice.reducer;

// export const authMiddleware =
//   (store: unknown) =>
//   (next: (action: unknown) => void) =>
//   (action: PayloadAction<IUser>) => {
//     // const res = next(action);
//     console.log("action type is ", action.type);

//     if (action.type === "auth/login/fulfilled") {
//       localStorage.setItem("user", JSON.stringify(action.payload));
//       console.log(action.payload);
//     }

//     if (action.type === "auth/logout") {
//       localStorage.removeItem("user");
//     }

//     return next(action);
//   };
