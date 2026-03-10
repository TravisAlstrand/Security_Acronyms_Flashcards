import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Acronyms from "./pages/Acronyms.jsx";
import AddAcronym from "./pages/AddAcronym.jsx";
import EditAcronym from "./pages/EditAcronym.jsx";
import Quiz from "./pages/Quiz.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "acronyms",
        element: <Acronyms />,
      },
      {
        path: "acronyms/new",
        element: <AddAcronym />,
      },
      {
        path: "acronyms/edit/:id",
        element: <EditAcronym />,
      },
      {
        path: "quiz",
        element: <Quiz />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
