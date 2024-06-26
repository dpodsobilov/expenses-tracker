import { FC, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { addExpense } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../hooks/redux-hooks";
import useAuth from "../../hooks/useAuth";
import { IExpense } from "../../interfaces/user-interfaces";

interface NewExpenseProps {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewExpense: FC<NewExpenseProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState<number | null>(0);

  const { userId } = useAuth();
  const dispatch = useAppDispatch();

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const expense: IExpense = {
      id: "",
      title,
      date: date.toISOString(),
      amount: 0,
    };
    if (amount) expense.amount = amount;
    if (userId) dispatch(addExpense({ userId, expense }));
    onClose(true);
    setTitle("");
    setDate(new Date());
    setAmount(0);
  }

  function handleSetAmount(amount: string) {
    if (amount === "") setAmount(null);
    else setAmount(+amount);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Новый расход</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Краткое описание"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <DatePicker
              value={date}
              maxDate={new Date()}
              onChange={(date) => {
                if (date) setDate(date);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="amount"
              label="Сумма"
              type="number"
              id="amount"
              InputProps={{ inputProps: { min: 0 } }}
              value={amount}
              onChange={(e) => handleSetAmount(e.target.value)}
            />

            <Button type="submit" variant="contained" sx={{ mb: 2 }}>
              Добавить
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
