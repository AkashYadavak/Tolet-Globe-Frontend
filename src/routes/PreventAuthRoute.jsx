import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const PreventAuthRoute = ({ children }) => {
    
    const isAuthenticated = useSelector((state) => state.auth.status);

    if (isAuthenticated) {
        return <Navigate to="landlord-dashboard" replace/>
    }

    return children;

}

export default PreventAuthRoute
