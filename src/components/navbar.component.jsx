import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme, useMediaQuery, styled, colors, Grid, Toolbar, Button, Box, Stack, InputAdornment, TextField, Avatar } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

import { router } from '../router'
import brandFullWhite from '../assets/brand-full-white.png'
import useCategories from '../hooks/useCategories'
import useDiscounts from '../hooks/useDiscounts'
import useMenu from '../hooks/useMenu'
import useOrders from '../hooks/useOrders'

const IconButton = styled(Button)(({ selected, theme }) => ({
	minWidth: 0,
	width: '34px',
	height: '34px',
	padding: '.375rem',
	borderRadius: '.5rem',
	color: theme.palette.background.default,
	'&:hover': {
		backgroundColor: theme.palette.background.default,
		color: theme.palette.primary.main,
	},
	...(selected && {
		backgroundColor: theme.palette.background.default,
		color: theme.palette.primary.main,
	}),
}))

const SearchBox = styled(Box)(({ open, theme }) => ({
	width: '100%',
	maxWidth: '434px',
	padding: '0 .5rem',
	zIndex: theme.zIndex.drawer + 1,
	[theme.breakpoints.down('md')]: {
		position: 'fixed',
		left: open ? '0' : '-100%',
		maxWidth: 'calc(100% - 20px)',
		'& .MuiOutlinedInput-root': {
			backgroundColor: theme.palette.background.default,
			'& .MuiOutlinedInput-input': {
				color: colors.grey[900],
			},
			'& .MuiInputAdornment-root': {
				color: colors.grey[900],
			},
		},
	},
}))

const SearchField = styled(TextField)(({ open, theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: 'rgba(255, 255, 255, 0.15)',
		borderRadius: '.75rem',
		transition: 'all .2s ease',
		'& .MuiOutlinedInput-input': {
			color: theme.palette.background.default,
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderWidth: '0 !important',
		},
		'& .MuiButton-root': {
			backgroundColor: colors.red[50],
			color: colors.red[400],
		},
		'&.Mui-focused': {
			backgroundColor: theme.palette.background.default,
			'& .MuiOutlinedInput-input': {
				color: colors.grey[900],
			},
			'& .MuiInputAdornment-root': {
				color: colors.grey[900],
			},
		},
		...(open && {
			backgroundColor: theme.palette.background.default,
			'& .MuiOutlinedInput-input': {
				color: colors.grey[900],
			},
			'& .MuiInputAdornment-root': {
				color: colors.grey[900],
			},
		}),
	},
}))

const AppBar = styled(MuiAppBar)(({ theme, open, width }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

const NavbarComponent = ({ drawerWidth, openDrawer, handleClickDrawer }) => {
	const location = useLocation()
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.down('md'))
	const [openSearchBox, setOpenSearchBox] = useState(false)
	const [openSearchIconButton, setOpenSearchIconButton] = useState(false)
	const { handleSearchCategory } = useCategories()
	const { handleSearchDiscount } = useDiscounts()
	const { handleSearchMenu } = useMenu()
	const { handleSearchOrder } = useOrders()
	const allowedSearch = [router.categories.path, router.menu.path, router.discounts.path, router.transaction.path, router.orders.path]
	const handleOpenSearchBox = () => {
		setOpenSearchBox((prev) => !prev)
		setOpenSearchIconButton((prev) => !prev)
	}
	const handleSearchBox = (keyword) => {
		if (router.categories.path === location.pathname) {
			handleSearchCategory(keyword)
		}
		if (router.discounts.path === location.pathname) {
			handleSearchDiscount(keyword)
		}
		if (router.menu.path === location.pathname) {
			handleSearchMenu(keyword)
		}
		if (router.transaction.path === location.pathname) {
			handleSearchDiscount(keyword)
			handleSearchMenu(keyword)
		}
		if (router.orders.path === location.pathname) {
			handleSearchOrder(keyword)
		}
	}
	return (
		<AppBar position='fixed' open={openDrawer} width={drawerWidth} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Toolbar variant='dense'>
				<Grid container spacing={2} alignItems='center'>
					<Grid item flexGrow={matches ? 1 : 0} order={{ xs: 2, md: 1 }}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: {
									xs: 'center',
									md: 'flex-start',
								},
								marginRight: '1rem',
							}}
						>
							<Link to='/'>
								<img
									src={brandFullWhite}
									height='auto'
									alt=''
									style={{
										position: 'relative',
										top: '4px',
									}}
								/>
							</Link>
						</Box>
					</Grid>
					<Grid item flexGrow={matches ? 0 : 1} order={{ xs: 1, md: 2 }}>
						<Stack spacing={2} direction='row' alignItems='center'>
							<IconButton disableRipple selected={openDrawer} onClick={handleClickDrawer}>
								<MenuIcon />
							</IconButton>
							{allowedSearch.indexOf(location.pathname) > -1 && (
								<SearchBox open={openSearchBox}>
									<SearchField
										label=''
										placeholder='Search'
										InputProps={{
											startAdornment: (
												<InputAdornment position='start' sx={{ color: 'background.default' }}>
													<SearchIcon />
												</InputAdornment>
											),
											endAdornment: (
												<InputAdornment
													position='end'
													sx={{
														display: {
															xs: 'flex',
															md: 'none',
														},
														color: 'background.default',
													}}
												>
													<IconButton
														disableRipple
														selected={openSearchIconButton}
														onClick={handleOpenSearchBox}
														sx={{
															backgroundColor: 'background.default',
															color: 'primary.main',
														}}
													>
														<CloseIcon />
													</IconButton>
												</InputAdornment>
											),
										}}
										fullWidth
										open={openSearchBox}
										onKeyUp={(e) => handleSearchBox(e.target.value)}
									/>
								</SearchBox>
							)}
						</Stack>
					</Grid>
					<Grid item order={{ xs: 3 }}>
						<Stack spacing={2} direction='row' alignItems='center'>
							{allowedSearch.indexOf(location.pathname) > -1 && (
								<IconButton
									disableRipple
									selected={openSearchIconButton}
									onClick={handleOpenSearchBox}
									sx={{
										display: {
											xs: 'flex',
											md: 'none',
										},
										flexGrow: 1,
									}}
								>
									<SearchIcon />
								</IconButton>
							)}
							<Avatar sx={{ backgroundColor: 'background.default', color: 'primary.main' }}>R</Avatar>
						</Stack>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	)
}

export default NavbarComponent
