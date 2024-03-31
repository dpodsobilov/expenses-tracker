import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { Header } from "../Header";

export default function AppLayout() {
  return (
    <main>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </main>
  );
}
