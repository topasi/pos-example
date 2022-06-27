import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { router } from './router'
import RegistrationPage from './pages/registration.page'
import LoginPage from './pages/login.page'
import TransactionPage from './pages/transaction.page'
import CategoriesPage from './pages/categories.page'
import MenuPage from './pages/menu.page'
import DiscountsPage from './pages/discounts.page'
import OrdersPage from './pages/orders.page'
import SettingsPage from './pages/settings.page'
import UnauthorizedPage from './pages/401.page'
import NotFoundPage from './pages/404.page'
import ServiceUnavailablePage from './pages/503.page'
import AuthComponent from './components/auth.component'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={router.register.path} element={<RegistrationPage />} />
				<Route path={router.login.path} element={<LoginPage />} />
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
