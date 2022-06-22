import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { router } from './router'
import TransactionPage from './pages/transaction.page'
import CategoriesPage from './pages/categories.page'
import ProductsPage from './pages/products.page'
import OrdersPage from './pages/orders.page'
import NotFoundPage from './pages/404.page'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={router.dashboard.path} element={<TransactionPage />} />
				<Route path={router.categories.path} element={<CategoriesPage />} />
				<Route path={router.menu.path} element={<ProductsPage />} />
				<Route path={router.transaction.path} element={<TransactionPage />} />
				<Route path={router.orders.path} element={<OrdersPage />} />
				<Route path={router.error.path} element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
