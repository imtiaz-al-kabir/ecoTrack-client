import { createBrowserRouter, Navigate } from "react-router";

import ChallengeCardDetails from "../Components/ChallengeCardDetails";
import ResetPassword from "../Components/ResetPassword";
import RootLayout from "../Layouts/RootLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddNewChallenge from "../Pages/AddNewChallenge";
import Challenges from "../Pages/Challenges";
import DashboardOverview from "../Pages/DashboardOverview";
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
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Privacy from "../Pages/Privacy";
import TermsOfService from "../Pages/TermsOfService";
import AccessibilityStatement from "../Pages/AccessibilityStatement";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: "/challenges", Component: Challenges },
      { path: "/challenges/:id", Component: ChallengeCardDetails },
      { path: "/events", Component: Events },
      { path: "/tips", Component: Tips },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
      { path: "/reset-password", Component: ResetPassword },
      { path: "/about", Component: About },
      { path: "/contact", Component: Contact },
      { path: "/privacy", Component: Privacy },
      { path: "/terms", Component: TermsOfService },
      { path: "/accessibility", Component: AccessibilityStatement },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardOverview />
      },
      {
        path: "profile",
        element: <UpdateProfile />,
      },
      {
        path: "add-challenge",
        element: <AddNewChallenge />,
      },
      {
        path: "my-challenges",
        element: <UserChallenges />,
      },
      {
        path: "my-activities",
        element: <MyActivities />,
      },
      {
        path: "update-challenge/:id",
        element: <UpdateChallenge />,
      },
    ],
  },
]);

export default router;
