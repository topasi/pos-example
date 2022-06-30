import React, { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { colors, useTheme, Box, Stack, Paper, FormGroup, InputLabel, FormControl, OutlinedInput, FormHelperText, FormControlLabel, Button, CircularProgress, Radio, Typography, InputAdornment, IconButton } from '@mui/material'
import MuiLink from '@mui/material/Link'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { router } from '../../router'
import useAuth from '../../hooks/useAuth'
import AlertComponent from '../../components/alert.component'
import HelmetComponent from '../../components/helmet.component'
import logo from '../../assets/brand-full-colored.png'

const RegistrationPage = () => {
	const theme = useTheme()
	const { feedback, handleRegistration, handleLogout } = useAuth()
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
	const [showPassword, setShowPassword] = useState(false)
	const [disabled, setDisabled] = useState(false)
	const validationSchema = yup.object().shape({
		name: yup.string().typeError('The name is invalid').required('The name is required'),
		email: yup.string().typeError('The email address is invalid').required('The email address is required').email('The email address must be a valid email'),
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
			setDisabled(true)
			handleRegistration(values, setDisabled, resetForm, setErrors)
		},
	})
	useEffect(() => {
		handleLogout()
	}, [handleLogout])
	return (
		<React.Fragment>
			<HelmetComponent title={`UTAKPOS | ${router.register.name}`} />
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
						{feedback?.success === true && feedback?.router === router.register.path && (
							<Box
								sx={{
									marginBottom: '1.5rem',
									display: 'flex',
								}}
							>
								<AlertComponent severity='success'>{feedback?.message}</AlertComponent>
							</Box>
						)}
						{feedback?.success === false && feedback?.router === router.register.path && (
							<Box
								sx={{
									marginBottom: '1.5rem',
									display: 'flex',
								}}
							>
								<AlertComponent severity='error'>{feedback?.message}</AlertComponent>
							</Box>
						)}
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
										<OutlinedInput id='email' type='email' value={formik.values.email} onChange={formik.handleChange} sx={{ borderRadius: '.5rem' }} />
										<FormHelperText>{formik.touched.email && formik.errors.email}</FormHelperText>
									</FormControl>
								</FormGroup>
								<FormGroup>
									<InputLabel htmlFor='password' sx={{ marginBottom: '.25rem' }}>
										Password *
									</InputLabel>
									<FormControl required error={formik.touched.password && Boolean(formik.errors.password)} variant='standard' fullWidth>
										<OutlinedInput
											id='password'
											type={showPassword ? 'text' : 'password'}
											value={formik.values.password}
											onChange={formik.handleChange}
											endAdornment={
												<InputAdornment position='end'>
													<IconButton aria-label='toggle password visibility' onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge='end'>
														{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
													</IconButton>
												</InputAdornment>
											}
											sx={{ borderRadius: '.5rem' }}
										/>
										<FormHelperText>{formik.touched.password && formik.errors.password}</FormHelperText>
									</FormControl>
								</FormGroup>
								<FormGroup>
									<InputLabel htmlFor='confirmPassword' sx={{ marginBottom: '.25rem' }}>
										Confirm Password *
									</InputLabel>
									<FormControl required error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)} variant='standard' fullWidth>
										<OutlinedInput
											id='confirmPassword'
											type={showPassword ? 'text' : 'password'}
											value={formik.values.confirmPassword}
											onChange={formik.handleChange}
											endAdornment={
												<InputAdornment position='end'>
													<IconButton aria-label='toggle password visibility' onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge='end'>
														{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
													</IconButton>
												</InputAdornment>
											}
											sx={{ borderRadius: '.5rem' }}
										/>
										<FormHelperText>{formik.touched.confirmPassword && formik.errors.confirmPassword}</FormHelperText>
									</FormControl>
								</FormGroup>
								<FormGroup>
									<Stack spacing={0} direction='row' justifyContent='center' sx={{ marginBottom: '.5rem' }}>
										<FormControl required variant='standard' sx={{ width: '110px' }}>
											<FormControlLabel
												sx={{
													'& .MuiRadio-root': {
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
													'& .MuiRadio-root': {
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
										disabled={disabled}
										endIcon={
											disabled && (
												<CircularProgress
													color='inherit'
													sx={{
														width: '1rem !important',
														height: '1rem !important',
													}}
												/>
											)
										}
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
		</React.Fragment>
	)
}

export default RegistrationPage
