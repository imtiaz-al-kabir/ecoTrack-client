import { createBrowserRouter } from "react-router";
import { ChallengeCardDetails } from "../Components/ChallengeCardDetails";
import RootLayout from "../Layouts/RootLayout";
import AddNewChallenge from "../Pages/AddNewChallenge";
import Challenges from "../Pages/Challenges";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

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
        path: "/challenges/:id",
        Component: ChallengeCardDetails,
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
