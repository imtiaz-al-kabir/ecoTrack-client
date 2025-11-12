import { createBrowserRouter } from "react-router";

import ChallengeCardDetails from "../Components/ChallengeCardDetails";
import ResetPassword from "../Components/ResetPassword";
import RootLayout from "../Layouts/RootLayout";
import AddNewChallenge from "../Pages/AddNewChallenge";
import Challenges from "../Pages/Challenges";
import ErrorPage from "../Pages/ErrorPage";
import Events from "../Pages/Events";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import MyActivities from "../Pages/MyActivities";
import Register from "../Pages/Register";
import Tips from "../Pages/Tips";
import UpdateChallenge from "../Pages/UpdateChallenge";
import UpdateProfile from "../Pages/UpdateProfile";
import UserChallenges from "../Pages/UserChallenges";
import PrivateRoute from "./PrivateRoute";

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
        path: "/update-challenge/:id",
        element: (
          <PrivateRoute>
            <UpdateChallenge />
          </PrivateRoute>
        ),
      },
      {
        path: "/user-challenge",
        element: (
          <PrivateRoute>
            <UserChallenges />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-activities",
        element: (
          <PrivateRoute>
            <MyActivities />
          </PrivateRoute>
        ),
      },
      {
        path: "/challenges/add",

        element: (
          <PrivateRoute>
            <AddNewChallenge />
          </PrivateRoute>
        ),
      },
      {
        path: "/events",

        Component: Events,
      },
      {
        path: "/update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/tips",

        Component: Tips,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/reset-password",
        Component: ResetPassword,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
export default router;
