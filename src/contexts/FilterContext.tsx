import { createContext, FC, useReducer } from "react";

const FilterContext = createContext(null);

interface IDateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface IAmountRange {
  minAmount: number;
  maxAmount: number | null;
}

interface IFilters {
  dateRange: IDateRange;
  title: string;
  amountRange: IAmountRange;
}

enum FiltersActionKind {
  ADD_START_DATE = "ADD_START_DATE",
  ADD_END_DATE = "ADD_END_DATE",
}

interface IFiltersAction {
  type: FiltersActionKind;
  payload: Date | string | number;
}

interface FilterProviderProps {
  children?: React.ReactNode;
}

const initialState: IFilters = {
  dateRange: {
    startDate: null,
    endDate: new Date(),
  },
  title: "",
  amountRange: {
    minAmount: 0,
    maxAmount: null,
  },
};

function reducer(state: IFilters, action: IFiltersAction) {
  switch (action.type) {
    case FiltersActionKind.ADD_START_DATE:
      return {
        ...state,
      };
      break;
    default:
      return initialState;
  }
}

export const FilterProvider: FC<FilterProviderProps> = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, initialState);
  return <>{children}</>;
};
