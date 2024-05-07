import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const LoginRoute = () => {
    const { currentUser } = useSelector(state => state.user)

    return (
        currentUser.token ? <Outlet /> : <Navigate to={'login'} />
    )
};
export default LoginRoute;