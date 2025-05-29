
import {createBrowserRouter,RouterProvider, Outlet} from "react-router";
import Home from "../Pages/Home";
import Nav from "../compunt/Nav";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import ProfilePage from "../Pages/ProfilePage";

function Layout(){
    return(
        <>
       <Nav />
        <Outlet />
        </>
    )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
        {path: "/" , element:<Home />  },
        {path: "/Register" , element:<Register />},
        {path: "/Login" , element:<Login />},
        {path: "/ProfilePage" , element:<ProfilePage />}
        

    ]
   
  },
]);



function Routerses() {
  return (
    <>
    
     <RouterProvider router={router} />
    
    </>
  )
}

export default Routerses
