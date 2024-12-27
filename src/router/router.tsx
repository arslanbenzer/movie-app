import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { movieRoutes } from "../components/movies-routes";
import { NotFoundPage } from "../pages/not-found/not-found.page";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Navigate to="/movies" replace /> },
      { path: "/movies", ...movieRoutes },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
