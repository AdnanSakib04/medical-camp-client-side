import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ContactUs from "../pages/ContactUs/ContactUs";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import HealthProfessionalHome from "../pages/DashBoard/HealthProfessional/HealthProfessionalHome";
import CampDetails from "../pages/CampDetails";
import ParticipantProfile from "../pages/DashBoard/Participant/ParticipantProfile";
import OrganizerProfile from "../pages/DashBoard/Organizer/OrganizerProfile";
import AddCamp from "../pages/DashBoard/Organizer/AddCamp";
import ManageCamps from "../pages/DashBoard/Organizer/ManageCamps";
import UpdateCamp from "../pages/DashBoard/Organizer/UpdateCamp";
import RegisteredCamps from "../pages/DashBoard/Participant/RegisteredCamps";
import AddUpcomingCamp from "../pages/DashBoard/Organizer/AddUpcomingCamp";
import UpcomingCampDetails from "../pages/Home/UpcomingCampDetails";
import ManageRegisteredCamps from "../pages/DashBoard/Organizer/ManageRegisteredCamps";
import Payment from "../pages/DashBoard/Participant/Payment";
import PaymentHistory from "../pages/DashBoard/Participant/PaymentHistory";
import DashboardHome from "../pages/DashBoard/DashboardHome";
import JoinCamp from "../pages/AvailableCamps/JoinCamp";
import ProfessionalList from "../pages/DashBoard/Admin/ProfessionalList";
import OrganizerList from "../pages/DashBoard/Admin/OrganizerList";
import ParticipantList from "../pages/DashBoard/Admin/ParticipantList";
import FeedbackRatings from "../pages/DashBoard/Participant/FeedbackRatings";
import FeedbackForm from "../pages/DashBoard/Participant/FeedbackForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,

      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>
      },

      {
        path: "/available-camps",
        element: <PrivateRoute><AvailableCamps></AvailableCamps></PrivateRoute>,
        loader: () => fetch('https://medical-camp-server-side.vercel.app/available-camps')
      },
      {
        path: "/camp-details/:campId",
        element: <PrivateRoute><CampDetails></CampDetails></PrivateRoute>,
        loader: () => fetch(`https://medical-camp-server-side.vercel.app/available-camps`)
      },
      {
        path: "/join-camp/:campId",
        element: <PrivateRoute><JoinCamp></JoinCamp></PrivateRoute>,
        loader: () => fetch(`https://medical-camp-server-side.vercel.app/available-camps`)
      },
      {
        path: "/upcoming-camp-details/:campId",
        element: <PrivateRoute><UpcomingCampDetails></UpcomingCampDetails></PrivateRoute>,
        loader: () => fetch(`https://medical-camp-server-side.vercel.app/upcoming-camps`)
      }
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'professional-profile',
        element: <PrivateRoute><HealthProfessionalHome></HealthProfessionalHome></PrivateRoute>
      },
      {
        path: 'participant-profile',
        element: <PrivateRoute><ParticipantProfile></ParticipantProfile></PrivateRoute>
      },
      {
        path: 'organizer-profile',
        element: <PrivateRoute><OrganizerProfile></OrganizerProfile></PrivateRoute>
      },
      {
        path: "add-a-camp",
        element: <PrivateRoute><AddCamp></AddCamp></PrivateRoute>
      },
      {
        path: "manage-camps",
        element: <PrivateRoute><ManageCamps></ManageCamps></PrivateRoute>
      },
      {
        path: "manage-registered-camps",
        element: <PrivateRoute><ManageRegisteredCamps></ManageRegisteredCamps></PrivateRoute>
      },
      {
        path: "manage-camps/updateCamp/:campId",
        element: <PrivateRoute><UpdateCamp></UpdateCamp></PrivateRoute>,
        loader: () => fetch(`https://medical-camp-server-side.vercel.app/available-camps`)
      },
      {
        path: "registered-camps",
        element: <PrivateRoute><RegisteredCamps></RegisteredCamps></PrivateRoute>
      },
      {
        path: "add-upcoming-camp",
        element: <PrivateRoute><AddUpcomingCamp></AddUpcomingCamp></PrivateRoute>
      },
      {
        path: "registered-camps/payment/:id",
        element: <PrivateRoute><Payment></Payment></PrivateRoute>,
        loader: () => fetch(`https://medical-camp-server-side.vercel.app/registered-camps`)
      },
      {
        path: "payment-history",
        element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
      },
      {
        path: "home",
        element: <PrivateRoute><DashboardHome></DashboardHome></PrivateRoute>
      },
      {
        path: "professional-list",
        element: <PrivateRoute><ProfessionalList></ProfessionalList></PrivateRoute>
      },
      {
        path: "organizer-list",
        element: <PrivateRoute><OrganizerList></OrganizerList></PrivateRoute>
      },
      {
        path: "participant-list",
        element: <PrivateRoute><ParticipantList></ParticipantList></PrivateRoute>
      },
      {
        path: "feedback-and-ratings",
        element: <PrivateRoute><FeedbackRatings></FeedbackRatings></PrivateRoute>
      },
      {
        path: "feedback-and-ratings/feedback/:regId",
        element: <PrivateRoute><FeedbackForm></FeedbackForm></PrivateRoute>,
        loader: () => fetch(`https://medical-camp-server-side.vercel.app/registered-camps`)
      },


    ]
  }
]);

export default router;