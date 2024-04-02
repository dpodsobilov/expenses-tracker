import { Button, Container, Typography } from "@mui/material";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  const error = useRouteError() as Error;

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <Container>
      <Typography variant="h2">Что-то пошло не так.</Typography>
      <Typography>{error.data || error.message}</Typography>

      <Button variant="contained" onClick={() => navigate(-1)}>
        &larr; Назад
      </Button>
    </Container>
  );
}
