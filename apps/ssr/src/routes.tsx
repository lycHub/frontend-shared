import Root from "./pages/root";
import Home from "./pages/Home";
import User from "./pages/user";
import Login from "./pages/Login";

export const Routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "user",
        element: <User />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  // {
  //   path: "*",
  //   element: <Navigate to="/home" replace />,
  // },
];
