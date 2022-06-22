const router = {
	dashboard: {
		name: 'Dashboard',
		path: '/dashboard',
	},
	categories: {
		name: 'Categories',
		path: '/categories',
	},
	menu: {
		name: 'Menu',
		path: '/menu',
	},
	discounts: {
		name: 'Discounts',
		path: '/discounts',
	},
	transaction: {
		name: 'Transaction',
		path: '/',
	},
	orders: {
		name: 'Orders',
		path: '/orders',
	},
	error: {
		path: '*',
	},
}

export { router }
