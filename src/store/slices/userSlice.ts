import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./authSlice";

export interface IExpense {
  id: string;
  title: string;
  date: string;
  amount: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  expenses: IExpense[];
}

export interface IUserExpense {
  expenses: IExpense[];
}

export interface IExpenseWithId {
  userId: string;
  expense: IExpense;
}

const initialState: IUserExpense = {
  expenses: [],
};

export const getExpenses = createAsyncThunk<IExpense[], string>(
  "user/getExpanses",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<IUser>(`${BASE_URL}/users/${userId}`);
      const { expenses } = data;

      return expenses;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const addExpense = createAsyncThunk<IExpense, IExpenseWithId>(
  "user/addExpense",
  async ({ userId, expense }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<IUser>(`${BASE_URL}/users/${userId}`);
      const { expenses } = data;

      const newId =
        expenses.reduce(
          (max, expense) => (+expense.id > max ? +expense.id : max),
          0
        ) + 1;
      expense.id = newId.toString();

      await axios.patch(`${BASE_URL}/users/${userId}`, {
        expenses: [...data.expenses, expense],
      });

      return expense;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearExpenses(state) {
      state.expenses = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        getExpenses.fulfilled,
        (state, action: PayloadAction<IExpense[]>) => {
          state.expenses = action.payload;
        }
      )
      .addCase(
        addExpense.fulfilled,
        (state, action: PayloadAction<IExpense>) => {
          state.expenses.push(action.payload);
        }
      );
  },
});

export const { clearExpenses } = userSlice.actions;

export default userSlice.reducer;
