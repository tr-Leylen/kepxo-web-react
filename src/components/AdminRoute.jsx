import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {
    const { currentUser } = useSelector(state => state.user)

    return (
        currentUser?.role === "admin" ? children : <Navigate to={'/login'} />
    )
};
export default AdminRoute;