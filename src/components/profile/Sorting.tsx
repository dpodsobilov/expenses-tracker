import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { IExpense } from "../../store/slices/userSlice";
import useExpenses from "../../hooks/useExpenses";
import { useSearchParams } from "react-router-dom";

interface SortingProps {
  onSortList: React.Dispatch<React.SetStateAction<IExpense[]>>;
  expensesList: IExpense[];
  onLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sorting: FC<SortingProps> = ({
  onLoading,
  onSortList,
  expensesList,
}) => {
  const { expenses: initialExpenses } = useExpenses();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortType, setSortType] = useState<string>(
    () => searchParams.get("sortBy") || "byDefault"
  );

  // const sortBy = searchParams.get("sortBy") || "";

  const sortByDefault = useCallback(() => {
    const sortedExpenses = expensesList.slice().sort((a, b) => {
      const date1 = new Date(a.date).getTime();
      const date2 = new Date(b.date).getTime();

      return date2 - date1;
    });
    onSortList(sortedExpenses);
    onLoading(false);
  }, [expensesList, onLoading, onSortList]);

  // useEffect(
  //   function () {
  //     onLoading(true);
  //     sortByDefault();
  //   },
  //   [onLoading, sortByDefault]
  // );

  function handleSorting(e: SelectChangeEvent) {
    setSortType(e.target.value);
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);

    switch (e.target.value) {
      case "byAsc":
        onSortList((expenses) =>
          expenses.slice().sort((a, b) => +a.amount - +b.amount)
        );
        break;
      case "byDesc":
        onSortList((expenses) =>
          expenses.slice().sort((a, b) => +b.amount - +a.amount)
        );
        break;
      default:
        sortByDefault();
    }
  }

  return (
    <>
      <FormControl sx={{ width: "210px" }}>
        <InputLabel id="sort-select-label">Сортировка по сумме</InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          label="Сортировка по сумме"
          size="small"
          value={sortType}
          onChange={handleSorting}
        >
          <MenuItem value="byDefault">По умолчанию</MenuItem>
          <MenuItem value="byDesc">Сначала дорогие</MenuItem>
          <MenuItem value="byAsc">Сначала дешевые</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
