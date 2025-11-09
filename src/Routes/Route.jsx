import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Challenges from "../Pages/Challenges";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddNewChallenge from "../Pages/AddNewChallenge";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/challenges",
        Component: Challenges,
      },
      {
        path: "/challenges/add",
        Component: AddNewChallenge,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
export default router;
