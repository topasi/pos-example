import React, { useState, useEffect, createContext } from 'react'
import { ref, set, get, update } from 'firebase/database'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import { db } from '../firebase'
import { router } from '../router'
import SnackbarComponent from '../components/snackbar.component'

const SettingsContext = createContext({})

export const SettingsProvider = ({ children }) => {
	const [snackbar, setSnackbar] = useState({
		open: false,
		severity: 'info',
		message: '',
	})
	const [settings, setSettings] = useState({
		currency: '$',
		vat: 0,
		serviceCharge: 0,
	})
	const handleError = (e) => {
		console.log(e)
		setSnackbar({
			open: true,
			severity: 'error',
			message: 'Oops! something went wrong',
		})
	}
	const handleSnackbar = () => {
		setSnackbar((prev) => ({ ...prev, open: false }))
	}
	const handleCreateSettings = (values, setDisabled) => {
		values.id = uuidv4()
		values.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
		values.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')
		get(ref(db, router.settings.path))
			.then((snapshot) => {
				if (snapshot.exists()) {
					setDisabled(false)
					update(ref(db, router.settings.path), {
						currency: values.currency,
						vat: values.vat,
						serviceCharge: values.serviceCharge,
						updatedAt: values.updatedAt,
					})
						.then(() => {
							setDisabled(false)
							setSnackbar({
								open: true,
								severity: 'success',
								message: 'Successfully updated settings',
							})
						})
						.catch(handleError)
				} else {
					set(ref(db, router.settings.path), values)
						.then(() => {
							setDisabled(false)
							setSnackbar({
								open: true,
								severity: 'success',
								message: 'Successfully saved settings',
							})
						})
						.catch(handleError)
				}
			})
			.catch(handleError)
	}
	useEffect(() => {
		get(ref(db, router.settings.path))
			.then((snapshot) => {
				if (snapshot.exists()) {
					setSettings(snapshot.val())
				}
			})
			.catch(handleError)
	}, [settings, setSettings])
	const value = {
		settings,
		handleCreateSettings,
	}
	return (
		<SettingsContext.Provider value={value}>
			<SnackbarComponent open={snackbar.open} onClose={handleSnackbar} severity={snackbar.severity}>
				{snackbar.message}
			</SnackbarComponent>
			{children}
		</SettingsContext.Provider>
	)
}

export default SettingsContext
