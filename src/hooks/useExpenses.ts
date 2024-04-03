import { useAppSelector } from "./redux-hooks";

function useExpenses() {
  const { expenses } = useAppSelector((state) => state.user);

  return {
    expenses,
  };
}

export default useExpenses;
