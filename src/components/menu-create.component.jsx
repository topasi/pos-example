import React, { useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { upperFirst, truncate } from 'lodash'
import { styled, colors, Stack, Grid, Box, InputLabel, Button, Typography, Chip, Checkbox, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, FormGroup, FormControl, FormHelperText, OutlinedInput, FormControlLabel } from '@mui/material'

import useSettings from '../hooks/useSettings'
import useCategories from '../hooks/useCategories'
import useMenu from '../hooks/useMenu'
import ModalComponent from '../components/modal.component'
import AlertComponent from '../components/alert.component'
import NumberFormatComponent from './number-format.component'
import DropzoneComponent from './dropzone.component'
import PhotoComponent from './photo.component'

const FormControlChip = styled(FormControl)(({ theme }) => ({
	'& .MuiFormControlLabel-root': {
		margin: '5px 5px 0 0',
	},
	'& .MuiCheckbox-root': {
		display: 'none',
	},
	'& .MuiChip-root': {
		cursor: 'pointer',
	},
	'& .MuiCheckbox-root.Mui-checked ~ .MuiTypography-root .MuiChip-root': {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.background.default,
	},
}))

const sizes = ['small', 'regular', 'upsize']

const MenuCreateComponent = ({ sideDishes, menu, open, handleCloseMenuModal, handleCreateMenu, handleUpdateMenu }) => {
	const { settings } = useSettings()
	const { categories } = useCategories()
	const { menu: allMenu } = useMenu()
	const [disabled, setDisabled] = useState(false)
	const [files, setFiles] = useState([])
	const initialValues = {
		name: menu?.name ? menu.name : '',
		description: menu?.description ? menu.description : '',
		price: menu?.price ? menu.price : 0,
		stocks: menu?.stocks ? menu.stocks : 0,
		categories: menu?.categories?.length > 0 ? menu.categories.map((category) => category.id) : [],
		sizes: menu?.sizes?.length > 0 ? menu.sizes : [],
		sideDishes: menu?.sideDishes?.length > 0 ? menu.sideDishes.map((sideDish) => sideDish.id) : [],
	}
	const validationSchema = yup.object().shape({
		name: yup.string().typeError('The name is invalid').required('The name is required'),
		description: yup.string().typeError('The description is invalid').required('The description is required'),
		price: yup.number().typeError('The price is invalid').required('The price is required'),
		stocks: yup.number().typeError('The stocks is invalid').required('The stocks is required'),
		categories: yup.array().typeError('The categories is invalid').min(1, 'The categories is required'),
		sizes: yup.array().typeError('The sizes is invalid').min(1, 'The sizes is required'),
		sideDishes: yup.array().typeError('The side dishes is invalid'),
	})
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		enableReinitialize: true,
		onSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
			values.image = files[0]
			values.categories = categories.filter((category) => values.categories.includes(category.id))
			values.sideDishes = sideDishes.filter((item) => values.sideDishes.includes(item.id))
			setDisabled(true)
			if (menu?.id) {
				handleUpdateMenu(menu.id, values, resetForm, setDisabled, setFiles, handleCloseMenuModal)
			} else {
				handleCreateMenu(values, resetForm, setDisabled, setFiles, handleCloseMenuModal)
			}
		},
	})
	const handleFilter = (sideDish) => {
		const data = allMenu.find((item) => item.id === sideDish.id)
		return data?.stocks > 0 && data?.id !== menu?.id
	}
	return (
		<ModalComponent open={open || false} onClose={handleCloseMenuModal} width='1280px'>
			<Typography variant='h5' marginBottom='2rem' color={colors.grey[700]}>
				{menu?.id ? 'Edit Menu' : 'Create Menu'}
			</Typography>
			<Box component='form' noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={12} lg={6}>
						<Stack spacing={2}>
							<FormGroup>
								<InputLabel htmlFor='name' sx={{ marginBottom: '.25rem' }}>
									Name *
								</InputLabel>
								<FormControl required error={formik.touched.name && Boolean(formik.errors.name)} variant='standard' fullWidth>
									<OutlinedInput value={formik.values.name} onChange={formik.handleChange} id='name' sx={{ borderRadius: '.5rem' }} />
									<FormHelperText>{formik.touched.name && formik.errors.name}</FormHelperText>
								</FormControl>
							</FormGroup>
							<FormGroup>
								<InputLabel htmlFor='description' sx={{ marginBottom: '.25rem' }}>
									Description *
								</InputLabel>
								<FormControl required error={formik.touched.description && Boolean(formik.errors.description)} variant='standard' fullWidth>
									<OutlinedInput value={formik.values.description} onChange={formik.handleChange} id='description' multiline rows={3} sx={{ borderRadius: '.5rem' }} />
									<FormHelperText>{formik.touched.description && formik.errors.description}</FormHelperText>
								</FormControl>
							</FormGroup>
							<FormGroup>
								<Stack spacing={2} direction='row' flexWrap='wrap'>
									<Box flexGrow={1}>
										<InputLabel htmlFor='price' sx={{ marginBottom: '.25rem' }}>
											Price *
										</InputLabel>
										<FormControl required error={formik.touched.price && Boolean(formik.errors.price)} variant='standard' fullWidth>
											<OutlinedInput value={formik.values.price} onChange={formik.handleChange} id='price' name='price' inputComponent={NumberFormatComponent} inputProps={{ currency: settings.currency }} sx={{ borderRadius: '.5rem' }} />
											<FormHelperText>{formik.touched.price && formik.errors.price}</FormHelperText>
										</FormControl>
									</Box>
									<Box flexGrow={1}>
										<InputLabel htmlFor='stocks' sx={{ marginBottom: '.25rem' }}>
											Stocks *
										</InputLabel>
										<FormControl required error={formik.touched.stocks && Boolean(formik.errors.stocks)} variant='standard' fullWidth>
											<OutlinedInput value={formik.values.stocks} onChange={formik.handleChange} id='stocks' sx={{ borderRadius: '.5rem' }} />
											<FormHelperText>{formik.touched.stocks && formik.errors.stocks}</FormHelperText>
										</FormControl>
									</Box>
								</Stack>
							</FormGroup>
							<FormGroup>
								<InputLabel htmlFor='stocks' sx={{ marginBottom: '.25rem' }}>
									Image
								</InputLabel>
								<FormControl required error={false} variant='standard' fullWidth>
									<DropzoneComponent menu={menu} files={files} setFiles={setFiles} />
								</FormControl>
							</FormGroup>
						</Stack>
					</Grid>
					<Grid item xs={12} md={12} lg={6}>
						<Stack spacing={2}>
							<FormGroup>
								<InputLabel htmlFor='stocks' sx={{ marginBottom: '.25rem' }}>
									Side Dishes *
								</InputLabel>
								{sideDishes.filter(handleFilter).length > 0 ? (
									<FormControl required error={formik.touched.sideDishes && Boolean(formik.errors.sideDishes)} variant='standard'>
										<List
											dense
											sx={{
												width: '100%',
												bgcolor: 'background.default',
												position: 'relative',
												overflow: 'auto',
												maxHeight: '325px',
												'& ul': { padding: 0 },
											}}
										>
											{sideDishes.filter(handleFilter).map((sideDish) => {
												return (
													<ListItem
														key={sideDish.id}
														secondaryAction={
															<Checkbox
																edge='end'
																onChange={formik.handleChange}
																checked={formik.values.sideDishes.includes(sideDish.id)}
																name='sideDishes'
																value={sideDish.id}
																inputProps={{
																	'aria-labelledby': `checkbox-list-secondary-label-${sideDish.id}`,
																}}
															/>
														}
														disablePadding
													>
														<ListItemButton
															disableRipple
															sx={{
																backgroundColor: 'transparent !important',
															}}
														>
															<ListItemAvatar>
																<PhotoComponent alt={sideDish.name} src={sideDish.image} />
															</ListItemAvatar>
															<ListItemText id={`checkbox-list-secondary-label-${sideDish.id}`} primary={truncate(sideDish.name, 30)} />
														</ListItemButton>
													</ListItem>
												)
											})}
										</List>
										<FormHelperText sx={{ marginTop: '.5rem' }}>{formik.touched.sideDishes && formik.errors.sideDishes}</FormHelperText>
									</FormControl>
								) : (
									<AlertComponent severity='info'>There's no side dishes available.</AlertComponent>
								)}
							</FormGroup>
							<FormGroup>
								<InputLabel htmlFor='stocks' sx={{ marginBottom: '.25rem' }}>
									Categories *
								</InputLabel>
								<FormControlChip required error={formik.touched.categories && Boolean(formik.errors.categories)} variant='standard'>
									<Stack spacing={0} direction='row' flexWrap='wrap' minHeight='calc(56px - 5px)'>
										{categories.map((category) => (
											<FormControlLabel key={category.id} control={<Checkbox checked={formik.values.categories.includes(category.id)} name='categories' value={category.id} onChange={formik.handleChange} />} label={<Chip label={category.name} sx={{ color: colors.grey[700] }} />} />
										))}
									</Stack>
									<FormHelperText sx={{ marginTop: '.5rem' }}>{formik.touched.categories && formik.errors.categories}</FormHelperText>
								</FormControlChip>
							</FormGroup>
							<FormGroup>
								<InputLabel htmlFor='stocks' sx={{ marginBottom: '.25rem' }}>
									Sizes *
								</InputLabel>
								<FormControlChip required error={formik.touched.sizes && Boolean(formik.errors.sizes)} variant='standard'>
									<Stack spacing={0} direction='row' flexWrap='wrap'>
										{sizes.map((size) => (
											<FormControlLabel key={size} control={<Checkbox checked={formik.values.sizes.includes(size)} name='sizes' value={size} onChange={formik.handleChange} />} label={<Chip label={upperFirst(size)} sx={{ color: colors.grey[700] }} />} />
										))}
									</Stack>
									<FormHelperText sx={{ marginTop: '.5rem' }}>{formik.touched.sizes && formik.errors.sizes}</FormHelperText>
								</FormControlChip>
							</FormGroup>
						</Stack>
					</Grid>
				</Grid>
				<Stack spacing={2} direction='row' justifyContent='flex-end' marginTop={3}>
					<Button
						variant='outlined'
						size='large'
						disableElevation
						onClick={handleCloseMenuModal}
						sx={{
							minWidth: '150px',
							minHeight: '50px',
							borderRadius: '.5rem',
						}}
					>
						Cancel
					</Button>
					<Button
						variant='contained'
						size='large'
						type='submit'
						disableElevation
						disabled={disabled}
						sx={{
							minWidth: '150px',
							minHeight: '50px',
							borderRadius: '.5rem',
							color: 'background.default',
						}}
					>
						{menu?.id ? 'Save' : 'Create'}
					</Button>
				</Stack>
			</Box>
		</ModalComponent>
	)
}

export default MenuCreateComponent
