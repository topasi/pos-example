import React, { useMemo, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { colors, Box, Stack, Paper, FormGroup, InputLabel, FormControl, OutlinedInput, FormHelperText, Button, CircularProgress, Typography, FormControlLabel, Checkbox, InputAdornment, IconButton } from '@mui/material'
import MuiLink from '@mui/material/Link'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { router } from '../../router'
import useAuth from '../../hooks/useAuth'
import HelmetComponent from '../../components/helmet.component'
import AlertComponent from '../../components/alert.component'
import logo from '../../assets/brand-full-colored.png'

const LoginPage = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const { currentUser, feedback, handleVerifyEmail, handleResetPassword, handleRecoverEmail, handleLogout, handleLogin } = useAuth()
	const initialValues = useMemo(
		() => ({
			email: '',
			password: '',
			isPersist: false,
		}),
		[]
	)
	const [showPassword, setShowPassword] = useState(false)
	const [disabled, setDisabled] = useState(false)
	const validationSchema = yup.object().shape({
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
	})
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		enableReinitialize: true,
		onSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
			setDisabled(true)
			handleLogin(values, setDisabled, resetForm, setErrors)
		},
	})
	useEffect(() => {
		if (currentUser?.emailVerified) {
			navigate(router.transaction.path, {
				state: { from: location },
				replace: true,
			})
		}
	}, [searchParams, currentUser, handleVerifyEmail, handleResetPassword, handleRecoverEmail, handleLogout, location, navigate])
	return (
		<React.Fragment>
			<HelmetComponent title={`UTAKPOS | ${router.login.name}`} />
			<Box
				sx={{
					width: '100%',
					height: '100%',
					minHeight: '100vh',
					backgroundColor: 'primary.main',
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
						{feedback?.success === true && feedback?.router === router.login.path && (
							<Box
								sx={{
									marginBottom: '1.5rem',
									display: 'flex',
								}}
							>
								<AlertComponent severity='success'>{feedback?.message}</AlertComponent>
							</Box>
						)}
						{feedback?.success === false && feedback?.router === router.login.path && (
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
									<Stack spacing={1} direction='row' alignItems='center'>
										<FormControlLabel
											control={<Checkbox name='isPersist' checked={formik.values.isPersist} />}
											label='Remember me'
											onChange={formik.handleChange}
											sx={{
												flexGrow: 1,
												'& .MuiCheckbox-root': {
													color: colors.grey[500],
													'&.Mui-checked': {
														color: 'primary.main',
													},
												},
											}}
										/>
										<Typography variant='body1'>
											<MuiLink component={Link} underline='hover' to={router.forgot.path}>
												Forgot Password?
											</MuiLink>
										</Typography>
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
										Login
									</Button>
								</FormGroup>
								<FormGroup>
									<Typography variant='body2' align='center'>
										Don't have an account?{' '}
										<MuiLink component={Link} underline='hover' to={router.register.path}>
											Register
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

export default LoginPage
