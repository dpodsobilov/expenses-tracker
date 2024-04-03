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
