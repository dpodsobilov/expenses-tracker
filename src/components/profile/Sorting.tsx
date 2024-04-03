import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";
import { SortType } from "../../interfaces/profile-interfaces";

interface SortingProps {
  sortType: SortType;
  onSetSortType: React.Dispatch<React.SetStateAction<SortType>>;
}

export const Sorting: FC<SortingProps> = ({ sortType, onSetSortType }) => {
  function handleChangeSortType(e: SelectChangeEvent<SortType>) {
    onSetSortType(e.target.value as SortType);
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
          onChange={(value) => handleChangeSortType(value)}
        >
          <MenuItem value="byDefault">По умолчанию</MenuItem>
          <MenuItem value="byDesc">Сначала дорогие</MenuItem>
          <MenuItem value="byAsc">Сначала дешевые</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
