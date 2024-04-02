import React, { FC, useEffect, useState } from "react";
import { Button, InputLabel, ListItem, Menu, TextField } from "@mui/material";
import { ClearIcon, DatePicker } from "@mui/x-date-pickers";

import { IExpense } from "../../store/slices/userSlice";
import useExpenses from "../../hooks/useExpenses";

interface FiltersProps {
  onFilterList: React.Dispatch<React.SetStateAction<IExpense[]>>;
}

export const Filters: FC<FiltersProps> = ({ onFilterList }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { expenses: initialExpenses } = useExpenses();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [title, setTitle] = useState<string>("");
  const [minAmount, setMinAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number | null>(null);

  useEffect(
    function () {
      if (startDate && endDate) {
        onFilterList(initialExpenses);
        onFilterList((expenses) =>
          expenses.slice().filter((e) => {
            const date = new Date(e.date).getTime();

            return date >= startDate.getTime() && date <= endDate.getTime();
          })
        );
      } else onFilterList(initialExpenses);
    },
    [endDate, initialExpenses, onFilterList, startDate]
  );

  useEffect(
    function () {
      onFilterList((expenses) => {
        if (title) {
          return expenses
            .slice()
            .filter((expense) => expense.title.toLowerCase().includes(title));
        } else return expenses;
      });
    },
    [onFilterList, title]
  );

  const handleOpenFilters = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsFiltersOpen(true);
  };

  const handleCloseFilters = () => {
    setAnchorEl(null);
    setIsFiltersOpen(false);
  };

  function handleClearDates() {
    setStartDate(null);
    setEndDate(null);
  }

  return (
    <>
      <Button variant="outlined" onClick={handleOpenFilters}>
        Фильтры
      </Button>
      <Menu
        open={isFiltersOpen}
        anchorEl={anchorEl}
        onClose={handleCloseFilters}
      >
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <DatePicker
            sx={{ width: "220px" }}
            value={startDate}
            maxDate={endDate || new Date()}
            onChange={(date) => {
              if (date) setStartDate(date);
            }}
          />
          &mdash;
          <DatePicker
            sx={{ width: "220px" }}
            value={endDate}
            minDate={startDate || new Date("1990")}
            maxDate={new Date()}
            onChange={(date) => {
              if (date) setEndDate(date);
            }}
          />
          <ClearIcon sx={{ opacity: ".7" }} onClick={handleClearDates} />
        </ListItem>

        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="filter-title"
            label="Краткое описание"
            name="filter-title"
            size="small"
            sx={{ m: 0 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <ClearIcon sx={{ opacity: ".7" }} onClick={() => setTitle("")} />
        </ListItem>

        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TextField
            margin="normal"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            id="filter-min-amount"
            label="От"
            name="filter-min-amount"
            size="small"
            sx={{ m: 0 }}
            value={minAmount}
            onChange={(e) => setMinAmount(+e.target.value)}
          />
          &mdash;
          <TextField
            margin="normal"
            type="number"
            InputProps={{ inputProps: { min: `${minAmount}` } }}
            id="filter-max-amount"
            label="До"
            name="filter-max-amount"
            size="small"
            sx={{ m: 0 }}
            value={maxAmount}
            onChange={(e) => setMaxAmount(+e.target.value)}
          />
          <ClearIcon sx={{ opacity: ".7" }} onClick={() => setTitle("")} />
        </ListItem>
      </Menu>
    </>
  );
};
