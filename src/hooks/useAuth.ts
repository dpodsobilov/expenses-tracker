import { useAppSelector } from "./hook";

function useAuth() {
  const { isAuth, currentUser } = useAppSelector((state) => state.auth);
  const userId = currentUser?.id;
  const userName = currentUser?.name;
  return {
    isAuth,
    userId,
    userName,
  };
}

export default useAuth;
