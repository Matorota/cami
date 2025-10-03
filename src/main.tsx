import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CamiPage from "./pages/CamiPage.tsx";
import ArtPage from "./pages/ArtPage.tsx";
import RoomPage from "./pages/RoomPage.tsx";
import RaccoonPage from "./pages/RaccoonPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/cami", element: <CamiPage /> },
  { path: "/art", element: <ArtPage /> },
  { path: "/room", element: <RoomPage /> },
  { path: "/raccoon", element: <RaccoonPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
