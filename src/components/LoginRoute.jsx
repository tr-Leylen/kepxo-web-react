import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const LoginRoute = ({children}) => {
    const { currentUser } = useSelector(state => state.user)

    return (
        currentUser?.token ? children : <Navigate to={'/login'} />
    )
};
export default LoginRoute;