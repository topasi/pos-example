import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { router } from './router'
import AuthComponent from './components/auth.component'
import RegistrationPage from './pages/auth/registration.page'
import LoginPage from './pages/auth/login.page'
import ForgotPage from './pages/auth/forgot.page'
import ResetPage from './pages/auth/reset.page'
import ActionPage from './pages/auth/action.page'
import TransactionPage from './pages/transaction.page'
import CategoriesPage from './pages/categories.page'
import MenuPage from './pages/menu.page'
import DiscountsPage from './pages/discounts.page'
import OrdersPage from './pages/orders.page'
import SettingsPage from './pages/settings.page'
import UnauthorizedPage from './pages/errors/401.page'
import NotFoundPage from './pages/errors/404.page'
import ServiceUnavailablePage from './pages/errors/503.page'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={router.register.path} element={<RegistrationPage />} />
				<Route path={router.login.path} element={<LoginPage />} />
				<Route path={router.forgot.path} element={<ForgotPage />} />
				<Route path={router.reset.path} element={<ResetPage />} />
				<Route path={router.action.path} element={<ActionPage />} />
				<Route element={<AuthComponent allowedRoles={['admin', 'cashier']} />}>
					<Route path={router.transaction.path} element={<TransactionPage />} />
					<Route path={router.settings.path} element={<SettingsPage />} />
				</Route>
				<Route element={<AuthComponent allowedRoles={['admin']} />}>
					<Route path={router.dashboard.path} element={<ServiceUnavailablePage />} />
					<Route path={router.categories.path} element={<CategoriesPage />} />
					<Route path={router.menu.path} element={<MenuPage />} />
					<Route path={router.discounts.path} element={<DiscountsPage />} />
					<Route path={router.orders.path} element={<OrdersPage />} />
				</Route>
				<Route path={router.unauthorized.path} element={<UnauthorizedPage />} />
				<Route path={router.error.path} element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
