import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { router } from './router'
import TransactionPage from './pages/transaction.page'
import CategoriesPage from './pages/categories.page'
import MenuPage from './pages/menu.page'
import DiscountsPage from './pages/discounts.page'
import OrdersPage from './pages/orders.page'
import SettingsPage from './pages/settings.page'
import NotFoundPage from './pages/404.page'
import ServiceUnavailablePage from './pages/503.page'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={router.dashboard.path} element={<ServiceUnavailablePage />} />
				<Route path={router.categories.path} element={<CategoriesPage />} />
				<Route path={router.menu.path} element={<MenuPage />} />
				<Route path={router.discounts.path} element={<DiscountsPage />} />
				<Route path={router.transaction.path} element={<TransactionPage />} />
				<Route path={router.orders.path} element={<OrdersPage />} />
				<Route path={router.settings.path} element={<SettingsPage />} />
				<Route path={router.error.path} element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
