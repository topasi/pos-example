import { Navigate, Outlet, useLocation } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

const AuthComponent = ({ allowedRoles }) => {
	const location = useLocation()
	const { currentUser } = useAuth()
	return !currentUser?.emailVerified ? <Navigate to='/' state={{ from: location }} replace /> : <Outlet />
}

export default AuthComponent
