import React, { createContext, useState, useEffect, useCallback } from 'react'
import { setPersistence, inMemoryPersistence, indexedDBLocalPersistence, createUserWithEmailAndPassword, sendEmailVerification, checkActionCode, applyActionCode, verifyPasswordResetCode, confirmPasswordReset, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, updateEmail, updatePassword, onAuthStateChanged } from 'firebase/auth'

import { auth } from '../firebase'
import { router } from '../router'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(true)
	const [feedback, setFeedback] = useState(null)
	const [currentUser, setCurrentUser] = useState(null)
	const handleError = (error, router) => {
		console.error(error)
		setFeedback({
			success: false,
			code: error.code,
			router,
			message: 'Oops! something went wrong and the request cannot proceed.',
		})
	}
	const handleRegistration = useCallback((values, setDisabled, resetForm, setErrors) => {
		const { name, email, password } = values
		setFeedback(null)
		createUserWithEmailAndPassword(auth, email, password)
			.then((snapshot) => {
				// add to realtime db
				console.log('snapshot', snapshot)
			})
			.then(() => {
				updateProfile(auth.currentUser, {
					displayName: name,
				})
			})
			.then(() => {
				sendEmailVerification(auth.currentUser)
			})
			.then(() => {
				setFeedback({
					success: true,
					code: 'auth/registration-success',
					router: router.register.path,
					message: 'Thank you for your registration. Please check your email for account confirmation.',
				})
				setDisabled(false)
				resetForm()
			})
			.catch((error) => {
				switch (error.code) {
					case 'auth/email-already-in-use':
						// send an email telling that email is already exists
						setErrors({
							email: 'The email address is already exists',
						})
						break
					case 'auth/invalid-email':
						setErrors({
							email: 'The email address is invalid',
						})
						break
					default:
						handleError(error, router.register.path)
				}
				setDisabled(false)
			})
	}, [])
	const handleLogin = useCallback((values, setDisabled, resetForm, setErrors) => {
		const { email, password, isPersist } = values
		setFeedback(null)
		setPersistence(auth, isPersist ? indexedDBLocalPersistence : inMemoryPersistence)
			.then(() => {
				signInWithEmailAndPassword(auth, email, password)
					.then((snapshot) => {
						const user = snapshot.user
						if (user.emailVerified) {
							setCurrentUser(user)
							resetForm()
						} else {
							setCurrentUser(null)
							setErrors({
								email: 'The email address is not yet confirmed',
							})
						}
						setDisabled(false)
					})
					.catch((error) => {
						switch (error.code) {
							case 'auth/invalid-email':
							case 'auth/user-not-found':
								setErrors({
									email: 'The email address invalid',
								})
								break
							case 'auth/wrong-password':
								setErrors({
									password: 'The password is incorrect',
								})
								break
							default:
								handleError(error, router.login.path)
						}
						setDisabled(false)
					})
			})
			.catch((error) => {
				handleError(error, router.login.path)
				setDisabled(false)
			})
	}, [])
	const handleLogout = useCallback(() => {
		setFeedback(null)
		signOut(auth)
			.then(() => {
				setCurrentUser(null)
			})
			.catch((error) => {
				handleError(error, router.logout.path)
			})
	}, [])
	const handleVerifyEmail = useCallback(async (actionCode) => {
		setFeedback(null)
		checkActionCode(auth, actionCode)
			.then(() => {
				applyActionCode(auth, actionCode).then(() => {
					setFeedback({
						success: true,
						code: 'auth/verify-email-success',
						router: router.action.path,
						message: 'You have successfully confirmed your email address.',
					})
				})
			})
			.catch((error) => {
				switch (error.code) {
					case 'auth/expired-action-code':
						setFeedback({
							success: false,
							code: error.code,
							router: router.action.path,
							message: 'The confirmation link is expired. Please click Resend Confirmation to make new request.',
						})
						break
					case 'auth/invalid-action-code':
						setFeedback({
							success: false,
							code: error.code,
							router: router.action.path,
							message: 'The confirmation link is invalid or has already been used.',
						})
						break
					default:
						handleError(error, router.action.path)
				}
			})
	}, [])
	const handleSendEmailVerification = useCallback((setDisabled) => {
		setFeedback(null)
		sendEmailVerification(auth.currentUser)
			.then(() => {
				setFeedback({
					success: true,
					code: 'auth/request-verify-email-success',
					router: router.action.path,
					message: 'We have e-mailed your confirmation link.',
				})
				setDisabled(false)
			})
			.catch((error) => {
				handleError(error, router.action.path)
				setDisabled(false)
			})
	}, [])
	const handleSendPasswordReset = useCallback((values, setDisabled, resetForm, setErrors) => {
		const { email } = values
		setFeedback(null)
		sendPasswordResetEmail(auth, email)
			.then(() => {
				setFeedback({
					success: true,
					code: 'auth/forgot-password-success',
					router: router.forgot.path,
					message: 'We have e-mailed your password reset link.',
				})
				resetForm()
				setDisabled(false)
			})
			.catch((error) => {
				switch (error.code) {
					case 'auth/invalid-email':
						setErrors({
							email: 'The email address is invalid',
						})
						break
					case 'auth/user-not-found':
						setFeedback({
							success: true,
							code: error.code,
							router: router.forgot.path,
							message: 'We have e-mailed your password reset link.',
						})
						break
					default:
						handleError(error, router.forgot.path)
				}
				setDisabled(false)
			})
	}, [])
	const handleVerifyPasswordReset = useCallback((actionCode) => {
		setFeedback(null)
		verifyPasswordResetCode(auth, actionCode)
			.then((email) => {
				setFeedback({
					success: true,
					code: 'auth/reset-password-success',
					router: router.reset.path,
					message: '',
					data: {
						email,
					},
				})
			})
			.catch((error) => {
				switch (error.code) {
					case 'auth/expired-action-code':
						setFeedback({
							success: false,
							code: error.code,
							router: router.reset.path,
							message: 'The password reset link is expired.',
						})
						break
					case 'auth/invalid-action-code':
						setFeedback({
							success: false,
							code: error.code,
							router: router.reset.path,
							message: 'The password reset link is invalid or has already been used.',
						})
						break
					default:
						handleError(error, router.reset.path)
				}
			})
	}, [])
	const handleConfirmPasswordReset = useCallback((values, setDisabled, resetForm) => {
		const { actionCode, password } = values
		setFeedback(null)
		confirmPasswordReset(auth, actionCode, password)
			.then(() => {
				setFeedback({
					success: true,
					code: 'auth/change-password-success',
					router: router.reset.path,
					message: 'You have change your password successfully',
				})
				setDisabled(false)
				resetForm()
			})
			.catch((error) => {
				handleError(error, router.reset.path)
				setDisabled(false)
			})
	}, [])
	const handleUpdateEmail = useCallback((email) => {
		updateEmail(auth, email)
	}, [])
	const handleUpdatePassword = useCallback((password) => {
		updatePassword(auth, password)
	}, [])
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setLoading(false)
		})
		return unsubscribe
	}, [])
	const value = {
		loading,
		feedback,
		currentUser,
		handleRegistration,
		handleLogin,
		handleLogout,
		handleVerifyEmail,
		handleSendEmailVerification,
		handleSendPasswordReset,
		handleVerifyPasswordReset,
		handleConfirmPasswordReset,
		handleUpdateEmail,
		handleUpdatePassword,
	}
	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export default AuthContext
