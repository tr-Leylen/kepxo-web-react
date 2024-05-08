import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const TeacherRoute = ({ children }) => {
    const { currentUser } = useSelector(state => state.user)

    return (
        currentUser.role === "teacher" ? children : <Navigate to={'/login'} />
    )
};
export default TeacherRoute;