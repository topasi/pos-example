import DashboardIcon from '@mui/icons-material/Dashboard'
import FoodBankIcon from '@mui/icons-material/FoodBank'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import PercentIcon from '@mui/icons-material/Percent'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SettingsIcon from '@mui/icons-material/Settings'

const router = {
	dashboard: {
		name: 'Dashboard',
		icon: <DashboardIcon />,
		path: '/dashboard',
	},
	categories: {
		name: 'Categories',
		icon: <FoodBankIcon />,
		path: '/categories',
	},
	menu: {
		name: 'Menu',
		icon: <RestaurantMenuIcon />,
		path: '/menu',
	},
	discounts: {
		name: 'Discounts',
		icon: <PercentIcon />,
		path: '/discounts',
	},
	transaction: {
		name: 'Transaction',
		icon: <ReceiptLongIcon />,
		path: '/transaction',
	},
	orders: {
		name: 'Orders',
		icon: <MenuBookIcon />,
		path: '/orders',
	},
	settings: {
		name: 'Settings',
		icon: <SettingsIcon />,
		path: '/settings',
	},
	error: {
		path: '*',
	},
}

export { router }
