import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { styled, Drawer, Toolbar, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import MuiListItemButton from '@mui/material/ListItemButton'
import DashboardIcon from '@mui/icons-material/Dashboard'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import PercentIcon from '@mui/icons-material/Percent'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import FoodBankIcon from '@mui/icons-material/FoodBank'

import { router } from '../router'

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
	borderRadius: '1rem',
	display: 'block',
	textAlign: 'center',
	'& .MuiListItemIcon-root': {
		minWidth: 'auto',
	},
	'& .MuiTypography-root': {
		fontSize: '12px',
	},
	'&.Mui-selected': {
		backgroundColor: `${theme.palette.primary.main} !important`,
		color: theme.palette.background.default,
		'& .MuiListItemIcon-root': {
			color: theme.palette.background.default,
		},
	},
}))

const SidebarComponent = ({ drawerWidth, openDrawer }) => {
	const location = useLocation()
	return (
		<Drawer
			variant='persistent'
			open={openDrawer}
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
					borderRight: 0,
				},
			}}
		>
			<Toolbar variant='dense' />
			<Box sx={{ overflow: 'auto' }}>
				<List component='nav'>
					<ListItem>
						<ListItemButton component={Link} to={router.dashboard.path} selected={location.pathname.indexOf(router.dashboard.path) > -1}>
							<ListItemIcon>
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText primary={router.dashboard.name} />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton component={Link} to={router.categories.path} selected={location.pathname.indexOf(router.categories.path) > -1}>
							<ListItemIcon>
								<FoodBankIcon />
							</ListItemIcon>
							<ListItemText primary={router.categories.name} />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton component={Link} to={router.menu.path} selected={location.pathname.indexOf(router.menu.path) > -1}>
							<ListItemIcon>
								<RestaurantMenuIcon />
							</ListItemIcon>
							<ListItemText primary={router.menu.name} />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton component={Link} to={router.discounts.path} selected={location.pathname.indexOf(router.discounts.path) > -1}>
							<ListItemIcon>
								<PercentIcon />
							</ListItemIcon>
							<ListItemText primary={router.discounts.name} />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton component={Link} to={router.transaction.path} selected={location.pathname.indexOf(router.transaction.path) > -1}>
							<ListItemIcon>
								<ReceiptLongIcon />
							</ListItemIcon>
							<ListItemText primary={router.transaction.name} />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton component={Link} to={router.orders.path} selected={location.pathname.indexOf(router.orders.path) > -1}>
							<ListItemIcon>
								<MenuBookIcon />
							</ListItemIcon>
							<ListItemText primary={router.orders.name} />
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	)
}

export default SidebarComponent
