import { useAppSelector } from "./hook";

function useExpenses() {
  const { expenses } = useAppSelector((state) => state.user);

  return {
    expenses,
  };
}

export default useExpenses;
