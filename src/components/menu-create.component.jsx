import React, { useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { upperFirst, truncate } from 'lodash'
import { styled, colors, Stack, Grid, Box, InputLabel, Button, Typography, Avatar, Chip, Checkbox, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, InputAdornment } from '@mui/material'
import MuiTextField from '@mui/material/TextField'

import { menu, categories } from '../data'
import { config } from '../config'
import ModalComponent from '../components/modal.component'

const TextField = styled(MuiTextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		borderRadius: '.5rem',
	},
	'& .MuiFormHelperText-root': {
		marginLeft: 0,
	},
}))

const sizes = ['small', 'regular', 'upsize']

const MenuCreateComponent = ({ openMenuModal, handleCloseMenuModal }) => {
	const [checked, setChecked] = useState([1])
	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value)
		const newChecked = [...checked]
		if (currentIndex === -1) {
			newChecked.push(value)
		} else {
			newChecked.splice(currentIndex, 1)
		}
		setChecked(newChecked)
	}
	const initialValues = {
		name: '',
		description: '',
		image: '',
		price: 0,
		stocks: 0,
		categories: [],
		sizes: [],
		sideDishes: [],
	}
	const validationSchema = yup.object().shape({
		name: yup.string().typeError('The name is invalid').required('The name is required'),
		description: yup.string().typeError('The description is invalid').required('The description is required'),
		image: yup.string().typeError('The image is invalid').required('The image is required'),
		price: yup.number().typeError('The price is invalid').required('The price is required'),
		stocks: yup.number().typeError('The stocks is invalid').required('The stocks is required'),
		categories: yup.array().typeError('The categories is invalid').required('The categories is required'),
		sizes: yup.array().typeError('The sizes is invalid').required('The sizes is required'),
		sideDishes: yup.array().typeError('The side dishes is invalid').required('The side dishes is required'),
	})
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit(values) {
			console.log(values)
		},
	})
	return (
		<ModalComponent open={openMenuModal} onClose={handleCloseMenuModal} width='1280px'>
			<Typography variant='h5' marginBottom='2rem' color={colors.grey[700]}>
				Create Menu
			</Typography>
			<form onSubmit={formik.handleSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={12} lg={6}>
						<Box paddingBottom='1rem'>
							<InputLabel htmlFor='name' sx={{ marginBottom: '.25rem' }}>
								Name *
							</InputLabel>
							<TextField id='name' variant='outlined' name='name' value={formik.values.name} onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} fullWidth />
						</Box>
						<Box paddingBottom='1rem'>
							<InputLabel htmlFor='description' sx={{ marginBottom: '.25rem' }}>
								Description *
							</InputLabel>
							<TextField id='description' variant='outlined' multiline rows={4} name='description' value={formik.values.description} onChange={formik.handleChange} error={formik.touched.description && Boolean(formik.errors.description)} helperText={formik.touched.description && formik.errors.description} fullWidth />
						</Box>
						<Box paddingBottom='1rem'>
							<InputLabel htmlFor='price' sx={{ marginBottom: '.25rem' }}>
								Price *
							</InputLabel>
							<TextField
								id='price'
								variant='outlined'
								name='price'
								value={formik.values.price}
								onChange={formik.handleChange}
								error={formik.touched.price && Boolean(formik.errors.price)}
								helperText={formik.touched.price && formik.errors.price}
								fullWidth
								InputProps={{
									startAdornment: <InputAdornment position='start'>{config.currency}</InputAdornment>,
								}}
							/>
						</Box>
						<Box paddingBottom='1rem'>
							<InputLabel htmlFor='stocks' sx={{ marginBottom: '.25rem' }}>
								Stocks *
							</InputLabel>
							<TextField id='stocks' variant='outlined' name='stocks' value={formik.values.stocks} onChange={formik.handleChange} error={formik.touched.stocks && Boolean(formik.errors.stocks)} helperText={formik.touched.stocks && formik.errors.stocks} fullWidth />
						</Box>
						<Box paddingBottom='1rem'>
							<InputLabel htmlFor='image' sx={{ marginBottom: '.25rem' }}>
								Image *
							</InputLabel>
							<TextField id='image' variant='outlined' name='image' value={formik.values.image} onChange={formik.handleChange} error={formik.touched.image && Boolean(formik.errors.image)} helperText={formik.touched.image && formik.errors.image} fullWidth />
						</Box>
					</Grid>
					<Grid item xs={12} md={12} lg={6}>
						<Box paddingBottom='1rem'>
							<InputLabel htmlFor='name' sx={{ marginBottom: '.25rem' }}>
								Side Dishes *
							</InputLabel>
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
								{menu.map((item) => {
									return (
										<ListItem key={item.id} secondaryAction={<Checkbox edge='end' onChange={handleToggle(item.id)} checked={checked.indexOf(item.id) !== -1} inputProps={{ 'aria-labelledby': `checkbox-list-secondary-label-${item.id}` }} />} disablePadding>
											<ListItemButton>
												<ListItemAvatar>
													<Avatar alt={item.name} src={item.image} />
												</ListItemAvatar>
												<ListItemText id={`checkbox-list-secondary-label-${item.id}`} primary={truncate(item.name, 30)} />
											</ListItemButton>
										</ListItem>
									)
								})}
							</List>
						</Box>
						<Box paddingBottom='1rem'>
							<InputLabel htmlFor='name' sx={{ marginBottom: '.25rem' }}>
								Categories *
							</InputLabel>
							<Stack spacing={1} direction='row'>
								{categories.map((category) => (
									<Chip label={category.name} sx={{ color: colors.grey[700] }} key={category.id} />
								))}
							</Stack>
						</Box>
						<Box paddingBottom='1rem'>
							<InputLabel htmlFor='name' sx={{ marginBottom: '.25rem' }}>
								Sizes *
							</InputLabel>
							<Stack spacing={1} direction='row'>
								{sizes.map((size) => (
									<Chip label={upperFirst(size)} sx={{ color: colors.grey[700] }} key={size} />
								))}
							</Stack>
						</Box>
					</Grid>
				</Grid>
				<Grid container spacing={2} sx={{ justifyContent: 'flex-end', amrginTop: '1rem' }}>
					<Grid item>
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
					</Grid>
					<Grid item>
						<Button
							variant='contained'
							size='large'
							type='submit'
							disableElevation
							sx={{
								minWidth: '150px',
								minHeight: '50px',
								borderRadius: '.5rem',
								color: 'background.default',
							}}
						>
							Save
						</Button>
					</Grid>
				</Grid>
			</form>
		</ModalComponent>
	)
}

export default MenuCreateComponent
