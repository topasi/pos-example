import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { styled, Drawer, Toolbar, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import MuiListItemButton from '@mui/material/ListItemButton'

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
					{Object.keys(router)
						.filter((route) => !['unauthorized', 'error', 'login', 'register', 'reset', 'forgot', 'action'].includes(route))
						.map((route) => (
							<ListItem key={route}>
								<ListItemButton component={Link} to={router[route].path} selected={location.pathname.indexOf(router[route].path) > -1}>
									<ListItemIcon>{router[route].icon}</ListItemIcon>
									<ListItemText primary={router[route].name} />
								</ListItemButton>
							</ListItem>
						))}
				</List>
			</Box>
		</Drawer>
	)
}

export default SidebarComponent
