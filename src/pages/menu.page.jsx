import React, { useCallback, useState } from 'react'
import moment from 'moment'
import { truncate, upperFirst } from 'lodash'
import { styled, colors, Stack, Grid, Box, Paper, ButtonGroup, Button, Typography, Table, TableBody, TableContainer, TableHead, Avatar, Chip } from '@mui/material'
import MuiTableCell, { tableCellClasses } from '@mui/material/TableCell'
import MuiTableRow from '@mui/material/TableRow'
import AddIcon from '@mui/icons-material/Add'
import ImageIcon from '@mui/icons-material/Image'

import useMenu from '../hooks/useMenu'
import placeholder from '../assets/placeholder.jpg'
import LayoutComponent from '../components/layout.component'
import CurrencyTypographyComponent from '../components/currency-typography.component'
import MenuCreateComponent from '../components/menu-create.component'
import DialogComponent from '../components/dialog.component'

const TableCell = styled(MuiTableCell)(({ theme }) => ({
	'&:first-of-type': {
		borderTopLeftRadius: '.5rem',
	},
	'&:last-of-type': {
		borderTopRightRadius: '.5rem',
	},
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}))

const TableRow = styled(MuiTableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}))

const MenuPage = () => {
	const { menu, handleCreateMenu, handleUpdateMenu, handleDeleteMenu } = useMenu()
	const [deleteDialog, setDeleteDialog] = useState({
		open: false,
		id: '',
	})
	const [modal, setModal] = useState({
		open: false,
		menu: {},
	})
	const handleOpenDeleteDialog = useCallback(
		(id) => {
			setDeleteDialog({
				open: true,
				id,
			})
		},
		[setDeleteDialog]
	)
	const handleCloseDeleteDialog = useCallback(() => {
		setDeleteDialog((prev) => ({ ...prev, open: false }))
	}, [setDeleteDialog])
	const handleOpenMenuModal = useCallback(
		(menu) => {
			if (menu?.id) {
				setModal({
					open: true,
					menu,
				})
			} else {
				setModal((prev) => ({ ...prev, open: true }))
			}
		},
		[setModal]
	)
	const handleCloseMenuModal = useCallback(() => {
		setModal({
			open: false,
			menuId: '',
		})
	}, [setModal])
	return (
		<LayoutComponent>
			<DialogComponent open={deleteDialog.open} onClose={handleCloseDeleteDialog} deleteId={deleteDialog.id} handleDeleteDialog={handleDeleteMenu} setDeleteDialog={setDeleteDialog} title='Are you sure?'>
				This will be permanently removed from our record and you won't get it back. Do you really want to delete?
			</DialogComponent>
			<MenuCreateComponent sideDishes={menu} menu={modal.menu} open={modal.open} handleCloseMenuModal={handleCloseMenuModal} handleCreateMenu={handleCreateMenu} handleUpdateMenu={handleUpdateMenu} />
			<Stack spacing={4} width='100%'>
				<Grid container>
					<Grid item xs={12}>
						<Paper elevation={0} sx={{ padding: '2rem', borderRadius: '1rem' }}>
							<Stack spacing={2} direction='row'>
								<Box flexGrow={1}>
									<Typography variant='h5' color={colors.grey[700]}>
										All Menu
									</Typography>
									<Typography variant='body2' marginBottom='1.5rem' color={colors.grey[400]}>
										Lis of all menu that can be used to order
									</Typography>
								</Box>
								<Box>
									<Button
										variant='contained'
										startIcon={<AddIcon />}
										disableElevation
										sx={{
											minHeight: '50px',
											borderRadius: '.5rem',
											color: 'background.default',
										}}
										onClick={() => {
											handleOpenMenuModal()
										}}
									>
										Create Menu
									</Button>
								</Box>
							</Stack>
							<TableContainer component={Paper} elevation={0}>
								<Table sx={{ minWidth: 700 }} aria-label='customized table'>
									<TableHead>
										<TableRow
											sx={{
												'& > *': { borderBottom: 'unset' },
												'& .MuiTableCell-root': {
													whiteSpace: 'nowrap',
												},
											}}
										>
											<TableCell align='center' sx={{ width: '35px' }}>
												<ImageIcon sx={{ position: 'relative', top: '4px' }} />
											</TableCell>
											<TableCell>ID</TableCell>
											<TableCell>Name</TableCell>
											<TableCell>Date Created</TableCell>
											<TableCell>Side Dishes</TableCell>
											<TableCell>Categories</TableCell>
											<TableCell>Sizes</TableCell>
											<TableCell align='right'>Price</TableCell>
											<TableCell align='right'>Stocks</TableCell>
											<TableCell align='right' sx={{ paddingRight: '65px' }}>
												Action
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{menu.length > 0 ? (
											menu.map((item, key) => (
												<MuiTableRow
													key={item.id}
													sx={{
														verticalAlign: 'top',
													}}
												>
													<TableCell>
														<Avatar alt={item.name} src={item.image || placeholder} />
													</TableCell>
													<TableCell>{item.id}</TableCell>
													<TableCell>{item.name}</TableCell>
													<TableCell>{moment(item.createdAt, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm')}</TableCell>
													<TableCell>
														{item.sideDishes?.length > 0 ? (
															<Typography variant='body2' sx={{ color: colors.grey[500] }}>
																{truncate(item.sideDishes.map((sideDish) => sideDish.name).join(', '), 50)}
															</Typography>
														) : (
															<Typography variant='body2' sx={{ color: colors.grey[500] }}>
																N/A
															</Typography>
														)}
													</TableCell>
													<TableCell sx={{ maxWidth: '200px' }}>
														{item.categories?.length > 0 ? (
															<Stack spacing={1} direction='row' flexWrap='wrap'>
																{item.categories.map((category) => (
																	<Chip label={category.name} size='small' sx={{ margin: '0 5px 5px 0 !important', color: colors.grey[700] }} key={category.id} />
																))}
															</Stack>
														) : (
															<Typography variant='body2' sx={{ color: colors.grey[500] }}>
																N/A
															</Typography>
														)}
													</TableCell>
													<TableCell sx={{ maxWidth: '200px' }}>
														<Stack spacing={1} direction='row'>
															{item.sizes.map((size) => (
																<Chip label={upperFirst(size)} size='small' sx={{ margin: '0 5px 5px 0 !important', color: colors.grey[700] }} key={size} />
															))}
														</Stack>
													</TableCell>
													<TableCell align='right'>
														<CurrencyTypographyComponent value={item.price} />
													</TableCell>
													<TableCell align='right'>{item.stocks}</TableCell>
													<TableCell align='right'>
														<ButtonGroup variant='outlined' aria-label='text button group' size='small'>
															<Button onClick={() => handleOpenMenuModal(item)}>Edit</Button>
															<Button onClick={() => handleOpenDeleteDialog(item.id)}>Delete</Button>
														</ButtonGroup>
													</TableCell>
												</MuiTableRow>
											))
										) : (
											<MuiTableRow>
												<TableCell colSpan={10}>
													<Typography variant='body2' textAlign='center' sx={{ color: colors.grey[700] }}>
														There's no menu available
													</Typography>
												</TableCell>
											</MuiTableRow>
										)}
									</TableBody>
								</Table>
							</TableContainer>
						</Paper>
					</Grid>
				</Grid>
			</Stack>
		</LayoutComponent>
	)
}

export default MenuPage
