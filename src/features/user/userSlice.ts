import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IExpense {
  id: number | null;
  title: string;
  date: Date;
  amount: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  expenses: IExpense[];
}

const initialState: IUser = {
  id: "",
  name: "",
  email: "",
  password: "",
  expenses: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser(state, action: PayloadAction<IUser>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.expenses = action.payload.expenses;

      localStorage.setItem("user", JSON.stringify(state));
    },
    getUser(state) {
      const localStorageRes = localStorage.getItem("user");
      if (localStorageRes !== null) {
        const user: IUser = JSON.parse(localStorageRes);

        if (user !== null) {
          state.id = user.id;
          state.name = user.name;
          state.email = user.email;
          state.password = user.password;
          state.expenses = user.expenses;
        }
      }

      state.id = "";
      state.name = "";
      state.email = "";
      state.password = "";
      state.expenses = [];
    },
    logout(state) {
      state.id = "";
      state.name = "";
      state.email = "";
      state.password = "";
      state.expenses = [];

      localStorage.removeItem("user");
    },
    updateExpense(state, action: PayloadAction<IExpense>) {
      if (state.email) {
        state.expenses.push(action.payload);
      }
    },
  },
});

export const { createUser, logout } = userSlice.actions;

export default userSlice.reducer;
