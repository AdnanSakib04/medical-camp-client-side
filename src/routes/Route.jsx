import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ContactUs from "../pages/ContactUs/ContactUs";
import AddCamp from "../pages/AddCamp";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import HealthProfessionalHome from "../pages/DashBoard/HealthProfessional/HealthProfessionalHome";

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
            path: "/add-a-camp",
            element: <PrivateRoute><AddCamp></AddCamp></PrivateRoute>
        },
        {
          path: "/available-camps",
          element: <PrivateRoute><AvailableCamps></AvailableCamps></PrivateRoute>,
          loader: () => fetch('http://localhost:5000/available-camps')
        }
      ],
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: 'healthProfessionalHome',
          element: <HealthProfessionalHome></HealthProfessionalHome>
        },
        

      ]
    }
  ]);
  
  export default router;