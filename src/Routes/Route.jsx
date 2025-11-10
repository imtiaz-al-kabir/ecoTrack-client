import { createBrowserRouter } from "react-router";

import RootLayout from "../Layouts/RootLayout";
import AddNewChallenge from "../Pages/AddNewChallenge";
import Challenges from "../Pages/Challenges";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import UserChallenges from "../Pages/UserChallenges";
import ChallengeCardDetails from "../Components/ChallengeCardDetails";
import MyActivities from "../Pages/MyActivities";
import Events from "../Pages/Events";
import Tips from "../Pages/Tips";


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
        path: "/user-challenge",
        Component: UserChallenges,
      },
      {
        path: "/my-activities",
        Component: MyActivities,
      },
      {
        path: "/challenges/add",
        Component: AddNewChallenge,
      },
      {
        path: "/events",
        Component:Events,
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
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
export default router;
