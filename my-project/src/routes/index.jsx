import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Products from "../pages/Products";
import Reviews from "../pages/Reviews";
import Settings from "../pages/Settings";
import Login from "../pages/Auth/Login/Login";
import Signin from "../pages/Auth/Signin/Signin";
const privateRoutes = [
  { path: "/dashboard", element: Dashboard },
  { path: "/customers", element: Customers },
  { path: "/products", element: Products },
  { path: "/reviews", element: Reviews },
  { path: "/settings", element: Settings },
  {path: "/login", element: Login},
  {path: "/signin", element: Signin},
  
];

export { privateRoutes };