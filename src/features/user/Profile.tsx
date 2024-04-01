import { FC, useCallback, useEffect, useState } from "react";

import { useAppDispatch } from "../../hooks/hook";
import { ExpenseItem } from "../expense/ExpenseItem";
import useAuth from "../../hooks/useAuth";
import { getExpenses, IExpense } from "./userSlice";
import useExpenses from "../../hooks/useExpenses";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { NewExpense } from "../expense/NewExpense";

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { userId, userName } = useAuth();
  const { expenses } = useExpenses();
  const [expansesList, setExpansesList] = useState<IExpense[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>("byDefault");

  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const sortByDefault = useCallback(() => {
    const sortedExpenses = expenses.slice().sort((a, b) => {
      const dat1 = new Date(a.date).getTime();
      const dat2 = new Date(b.date).getTime();

      return dat2 - dat1;
    });
    setExpansesList(sortedExpenses);
  }, [expenses]);

  useEffect(
    function () {
      if (userId) dispatch(getExpenses(userId));
    },
    [dispatch, userId]
  );

  useEffect(
    function () {
      if (expenses) {
        sortByDefault();
      }
    },
    [expenses, sortByDefault]
  );

  function handleSorting(e: SelectChangeEvent) {
    setSortType(e.target.value);
    switch (e.target.value) {
      case "byAsc":
        setExpansesList((expenses) =>
          expenses.slice().sort((a, b) => +a.amount - +b.amount)
        );
        break;
      case "byDesc":
        setExpansesList((expenses) =>
          expenses.slice().sort((a, b) => +b.amount - +a.amount)
        );
        break;
      default:
        sortByDefault();
    }
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  const handleOpenFilters = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsFiltersOpen(true);
  };

  const handleCloseFilters = () => {
    setAnchorEl(null);
    setIsFiltersOpen(false);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" component="p">
        Привет, {userName}!
      </Typography>
      <Box>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <FormControl sx={{ width: "210px" }}>
                <InputLabel id="sort-select-label">
                  Сортировка по сумме
                </InputLabel>
                <Select
                  labelId="sort-select-label"
                  id="sort-select"
                  label="Сортировка по сумме"
                  value={sortType}
                  onChange={handleSorting}
                >
                  <MenuItem value="byDefault">По умолчанию</MenuItem>
                  <MenuItem value="byDesc">Сначала дорогие</MenuItem>
                  <MenuItem value="byAsc">Сначала дешевые</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
                Добавить расход
              </Button>
            </Box>
            <Button variant="outlined" onClick={handleOpenFilters}>
              Фильтры
            </Button>
            <Menu
              open={isFiltersOpen}
              anchorEl={anchorEl}
              onClose={handleCloseFilters}
            >
              <ListItem>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="period-first"
                  label="До"
                  name="period-first"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="period-first"
                  label="До"
                  name="period-first"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </ListItem>
            </Menu>
          </Box>
          {/* фильтры 
          1. период
          2. описание
          3. диапазон суммы
          */}

          <Box>
            <List sx={{ width: 500 }}>
              {expansesList.map((expense) => (
                <ExpenseItem expense={expense} key={expense.id} />
              ))}
            </List>
          </Box>
        </Box>
      </Box>
      <NewExpense isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </Box>
  );
};
