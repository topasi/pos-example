import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { colors, useTheme, Box, Stack, Paper, FormGroup, InputLabel, FormControl, OutlinedInput, FormHelperText, FormControlLabel, Button, Radio, Typography } from '@mui/material'
import MuiLink from '@mui/material/Link'

import { router } from '../router'
import logo from '../assets/brand-full-colored.png'

const RegistrationPage = () => {
	const theme = useTheme()
	const initialValues = useMemo(
		() => ({
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			role: 'admin',
		}),
		[]
	)
	const validationSchema = yup.object().shape({
		name: yup.string().typeError('The name is invalid').required('The name is required'),
		email: yup.string().typeError('The email is invalid').required('The email is required').email('The email must be a valid email'),
		password: yup
			.string()
			.typeError('The password is invalid')
			.required('The password is required')
			.min(8, 'The password must at least 8 characters')
			.matches(/^(?=.*[a-z])/, 'The password must contain at least 1 lowercase letter')
			.matches(/^(?=.*[A-Z])/, 'The password must contain at least 1 uppercase letter')
			.matches(/^(?=.*[0-9])/, 'The password must contain at least 1 numeric letter')
			.matches(/^(?=.*[!@#$%^&*])/, 'The password must contain at least 1 special character'),
		confirmPassword: yup
			.string()
			.typeError('The confirm password is invalid')
			.required('The confirm password is required')
			.oneOf([yup.ref('password'), null], 'The confirm password did not match'),
		role: yup.string().typeError('The role is invalid').required('The role is required'),
	})
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		enableReinitialize: true,
		onSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
			console.log(values)
		},
	})
	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				minHeight: '100vh',
				backgroundColor: theme.palette.primary.main,
			}}
		>
			<Stack
				spacing={0}
				direction='row'
				alignItems='center'
				justifyContent='center'
				sx={{
					minHeight: '100vh',
				}}
			>
				<Paper
					sx={{
						width: '100%',
						maxWidth: '500px',
						margin: '1rem',
						padding: '2rem',
						backgroundColor: 'background.default',
						borderRadius: '1rem',
					}}
				>
					<Box
						sx={{
							minWidth: '300px',
							margin: '1rem 0 2rem',
							textAlign: 'center',
						}}
					>
						<Link to={router.login.path}>
							<img src={logo} alt='logo' style={{ width: '250px' }} />
						</Link>
					</Box>
					<Box component='form' noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
						<Stack spacing={2}>
							<FormGroup>
								<InputLabel htmlFor='name' sx={{ marginBottom: '.25rem' }}>
									Name *
								</InputLabel>
								<FormControl required error={formik.touched.name && Boolean(formik.errors.name)} variant='standard' fullWidth>
									<OutlinedInput id='name' value={formik.values.name} onChange={formik.handleChange} sx={{ borderRadius: '.5rem' }} />
									<FormHelperText>{formik.touched.name && formik.errors.name}</FormHelperText>
								</FormControl>
							</FormGroup>
							<FormGroup>
								<InputLabel htmlFor='email' sx={{ marginBottom: '.25rem' }}>
									Email Address *
								</InputLabel>
								<FormControl required error={formik.touched.email && Boolean(formik.errors.email)} variant='standard' fullWidth>
									<OutlinedInput id='email' value={formik.values.email} onChange={formik.handleChange} sx={{ borderRadius: '.5rem' }} />
									<FormHelperText>{formik.touched.email && formik.errors.email}</FormHelperText>
								</FormControl>
							</FormGroup>
							<FormGroup>
								<InputLabel htmlFor='password' sx={{ marginBottom: '.25rem' }}>
									Password *
								</InputLabel>
								<FormControl required error={formik.touched.password && Boolean(formik.errors.password)} variant='standard' fullWidth>
									<OutlinedInput id='password' value={formik.values.password} onChange={formik.handleChange} sx={{ borderRadius: '.5rem' }} />
									<FormHelperText>{formik.touched.password && formik.errors.password}</FormHelperText>
								</FormControl>
							</FormGroup>
							<FormGroup>
								<InputLabel htmlFor='confirmPassword' sx={{ marginBottom: '.25rem' }}>
									Confirm Password *
								</InputLabel>
								<FormControl required error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)} variant='standard' fullWidth>
									<OutlinedInput id='confirmPassword' sx={{ borderRadius: '.5rem' }} />
									<FormHelperText>{formik.touched.confirmPassword && formik.errors.confirmPassword}</FormHelperText>
								</FormControl>
							</FormGroup>
							<FormGroup>
								<Stack spacing={0} direction='row' justifyContent='center' sx={{ marginBottom: '.5rem' }}>
									<FormControl required variant='standard' sx={{ width: '110px' }}>
										<FormControlLabel
											sx={{
												'& .MuiCheckbox-root': {
													color: colors.grey[500],
													'&.Mui-checked': {
														color: 'primary.main',
													},
												},
											}}
											control={<Radio checked={formik.values.role === 'admin'} name='role' value='admin' />}
											onChange={formik.handleChange}
											label='Admin'
										/>
									</FormControl>
									<FormControl required variant='standard' sx={{ width: '110px' }}>
										<FormControlLabel
											sx={{
												'& .MuiCheckbox-root': {
													color: colors.grey[500],
													'&.Mui-checked': {
														color: 'primary.main',
													},
												},
											}}
											control={<Radio checked={formik.values.role === 'cashier'} name='role' value='cashier' />}
											onChange={formik.handleChange}
											label='Cashier'
										/>
									</FormControl>
								</Stack>
							</FormGroup>
							<FormGroup>
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
									Register
								</Button>
							</FormGroup>
							<FormGroup>
								<Typography variant='body2' align='center'>
									Already have an account?{' '}
									<MuiLink component={Link} to={router.login.path}>
										Login
									</MuiLink>
								</Typography>
							</FormGroup>
						</Stack>
					</Box>
				</Paper>
			</Stack>
		</Box>
	)
}

export default RegistrationPage
