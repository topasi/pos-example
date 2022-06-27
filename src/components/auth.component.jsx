import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AuthComponent = ({ allowedRoles }) => {
	const location = useLocation()
	return location.pathname === '/' ? <Navigate to='/transaction' state={{ from: location }} replace /> : <Outlet />
}

export default AuthComponent
