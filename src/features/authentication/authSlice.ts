import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../user/userSlice";
import axios from "axios";

interface IAuth {
  currentUser: IUser | null;
  isAuth: boolean;
  isLoading: boolean;
}

const initialState: IAuth = {
  currentUser: null,
  isAuth: false,
  isLoading: false,
};

const BASE_URL: string = "http://localhost:9000";

export const register = createAsyncThunk<IUser, IUser>(
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
        email,
        name,
        password,
        expenses,
      });

      return data as IUser;
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

      return user;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

// export const getUsers = createAsyncThunk<IUser[]>(
//   "auth/users",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get<IUser[]>(`${BASE_URL}/users`);

//       return data;
//     } catch (err) {
//       throw rejectWithValue(err);
//     }
//   }
// );

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
      // .addCase(getUsers.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
      //   state.isLoading = false;
      //   state.users = action.payload;
      // })
      // .addCase(getUsers.rejected, (state) => {
      //   state.isLoading = false;
      // })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.isAuth = true;
        state.currentUser = { ...action.payload };
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
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

export const authMiddleware =
  (store: unknown) =>
  (next: (action: unknown) => void) =>
  (action: PayloadAction<IUser>) => {
    // const res = next(action);
    console.log("action type is ", action.type);

    if (action.type === "auth/login/fulfilled") {
      localStorage.setItem("user", JSON.stringify(action.payload));
      console.log(action.payload);
    }

    if (action.type === "auth/logout") {
      localStorage.removeItem("user");
    }

    return next(action);
  };

export default authSlice.reducer;
