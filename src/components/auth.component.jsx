import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AuthComponent = () => {
	const location = useLocation()
	return location.pathname === '/' ? <Navigate to='/transaction' state={{ from: location }} replace /> : <Outlet />
}

export default AuthComponent
