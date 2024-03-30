import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

import styles from "./Error.module.css";

export default function Error() {
  //   const error = useRouteError();
  //   console.log(error);
  const navigate = useNavigate();

  const error = useRouteError() as Error;

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <div className={styles.error}>
      <h2>Что-то пошло не так.</h2>
      <p>{error.data || error.message}</p>

      <button onClick={() => navigate(-1)}>&larr; Назад</button>
    </div>
  );
}
