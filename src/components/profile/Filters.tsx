import { FC, useState } from "react";
import { Button, ListItem, Menu, TextField } from "@mui/material";
import { ClearIcon, DatePicker } from "@mui/x-date-pickers";

import { IAmountRange, IDateRange } from "../../interfaces/profile-interfaces";

interface FiltersProps {
  dateRange: IDateRange;
  onSetDateRange: React.Dispatch<React.SetStateAction<IDateRange>>;
  title: string;
  onSetTitle: React.Dispatch<React.SetStateAction<string>>;
  amountRange: IAmountRange;
  onSetAmountRange: React.Dispatch<React.SetStateAction<IAmountRange>>;
}

export const Filters: FC<FiltersProps> = ({
  dateRange,
  onSetDateRange,
  title,
  onSetTitle,
  amountRange,
  onSetAmountRange,
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenFilters = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsFiltersOpen(true);
  };

  function handleCloseFilters() {
    setAnchorEl(null);
    setIsFiltersOpen(false);
  }

  function handleSetStartDate(date: Date | null) {
    if (date) {
      onSetDateRange((prev) => {
        return { ...prev, startDate: date };
      });
    }
  }

  function handleSetEndDate(date: Date | null) {
    if (date) {
      onSetDateRange((prev) => {
        return { ...prev, endDate: date };
      });
    }
  }

  function handleSetMinAmount(min: string) {
    if (min === "") {
      onSetAmountRange((prev) => {
        return { ...prev, minAmount: null };
      });
    } else {
      onSetAmountRange((prev) => {
        return { ...prev, minAmount: +min };
      });
    }
  }

  function handleSetMaxAmount(max: string) {
    if (max === "") {
      onSetAmountRange((prev) => {
        return { ...prev, maxAmount: null };
      });
    } else {
      onSetAmountRange((prev) => {
        return { ...prev, maxAmount: +max };
      });
    }
  }

  function handleClearDates() {
    onSetDateRange({ startDate: null, endDate: null });
  }

  function handleClearAmountRange() {
    onSetAmountRange({ minAmount: null, maxAmount: null });
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
            value={dateRange.startDate}
            maxDate={dateRange.endDate || new Date()}
            onChange={(date) => handleSetStartDate(date)}
          />
          &mdash;
          <DatePicker
            sx={{ width: "220px" }}
            value={dateRange.endDate}
            minDate={dateRange.startDate || new Date("1990")}
            maxDate={new Date()}
            onChange={(date) => handleSetEndDate(date)}
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
            onChange={(e) => onSetTitle(e.target.value)}
          />

          <ClearIcon sx={{ opacity: ".7" }} onClick={() => onSetTitle("")} />
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
            value={amountRange.minAmount}
            onChange={(e) => handleSetMinAmount(e.target.value)}
          />
          &mdash;
          <TextField
            margin="normal"
            type="number"
            InputProps={{ inputProps: { min: `${amountRange.minAmount}` } }}
            id="filter-max-amount"
            label="До"
            name="filter-max-amount"
            size="small"
            sx={{ m: 0 }}
            value={amountRange.maxAmount}
            onChange={(e) => handleSetMaxAmount(e.target.value)}
          />
          <ClearIcon sx={{ opacity: ".7" }} onClick={handleClearAmountRange} />
        </ListItem>
      </Menu>
    </>
  );
};
