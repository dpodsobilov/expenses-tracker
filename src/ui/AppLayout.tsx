import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { Header } from "./Header";
import { Suspense } from "react";
import Loader from "./Loader";

export default function AppLayout() {
  return (
    <main>
      <Header />
      <Container>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Container>
    </main>
  );
}
