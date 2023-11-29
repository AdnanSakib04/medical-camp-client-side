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
          loader: () => fetch('http://localhost:5000/available-camps')
        },
        {
          path: "/camp-details/:campId",
          element: <PrivateRoute><CampDetails></CampDetails></PrivateRoute>,
          loader: () => fetch(`http://localhost:5000/available-camps`)

        }
      ],
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: 'professional-profile',
          element: <HealthProfessionalHome></HealthProfessionalHome>
        },
        {
          path: 'participant-profile',
          element: <ParticipantProfile></ParticipantProfile>
        },
        {
          path: 'organizer-profile',
          element: <OrganizerProfile></OrganizerProfile>
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
          path: "manage-camps/updateCamp/:campId",
          element: <PrivateRoute><UpdateCamp></UpdateCamp></PrivateRoute>,
          loader: () => fetch(`http://localhost:5000/available-camps`)
      },
        

      ]
    }
  ]);
  
  export default router;