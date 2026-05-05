import { Navigate } from "react-router";
import { useUserContext } from "../../Context/User";

const AdminRoute = ({ children }) => {
    const { user, isAuthChecked } = useUserContext();

    if (!isAuthChecked) {
        return <div>Loading...</div>;
    }


    console.log("user:", user);
    console.log("user.role:", user?.role);
  
    const hasAccess = user?.role === "admin" || user?.role === "manager";
    return hasAccess ? children : <Navigate to="/" />;
};

export default AdminRoute;