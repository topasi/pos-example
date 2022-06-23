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
		path: '/transaction',
	},
	orders: {
		name: 'Orders',
		path: '/orders',
	},
	settings: {
		name: 'Settings',
		path: '/settings',
	},
	error: {
		path: '*',
	},
}

export { router }
