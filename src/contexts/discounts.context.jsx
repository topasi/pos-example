import React, { useState, useEffect, createContext } from 'react'
import { ref, set, get, remove, query, orderByChild, equalTo } from 'firebase/database'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import { db } from '../firebase'
import { router } from '../router'
import SnackbarComponent from '../components/snackbar.component'

const DiscountsContext = createContext({})

export const DiscountsProvider = ({ children }) => {
	const [snackbar, setSnackbar] = useState({
		open: false,
		severity: 'info',
		message: '',
	})
	const [discounts, setDiscounts] = useState({})
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
	const handleCreateDiscount = (values, setErrors, resetForm, setDisabled) => {
		values.id = uuidv4()
		values.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
		values.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')
		get(query(ref(db, router.discounts.path), orderByChild('name'), equalTo(values.name)))
			.then((snapshot) => {
				if (snapshot.exists()) {
					setDisabled(false)
					setErrors({
						name: 'The discount is already exists',
					})
				} else {
					set(ref(db, `${router.discounts.path}/${values.id}`), values)
						.then(() => {
							setDisabled(false)
							setSnackbar({
								open: true,
								severity: 'success',
								message: 'Successfully created a discount',
							})
							resetForm()
						})
						.catch(handleError)
				}
			})
			.catch(handleError)
	}
	const handleDeleteDiscount = (id, setDeleteDialog) => {
		get(ref(db, `${router.discounts.path}/${id}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					remove(ref(db, `${router.discounts.path}/${id}`))
						.then(() => {
							setDeleteDialog(false)
							setSnackbar({
								open: true,
								severity: 'warning',
								message: 'Successfully deleted a discount',
							})
						})
						.catch(handleError)
				} else {
					setDeleteDialog(false)
					setSnackbar({
						open: true,
						severity: 'error',
						message: "Discount doesn't exists",
					})
				}
			})
			.catch(handleError)
	}
	useEffect(() => {
		get(query(ref(db, router.discounts.path), orderByChild('createdAt')))
			.then((snapshot) => {
				const data = []
				if (snapshot.exists()) {
					snapshot.forEach((snap) => {
						data.push(snap.val())
					})
				}
				setDiscounts(data)
			})
			.catch(handleError)
	}, [discounts])
	return (
		<DiscountsContext.Provider value={{ discounts, handleCreateDiscount, handleDeleteDiscount }}>
			<SnackbarComponent open={snackbar.open} onClose={handleSnackbar} severity={snackbar.severity}>
				{snackbar.message}
			</SnackbarComponent>
			{children}
		</DiscountsContext.Provider>
	)
}

export default DiscountsContext
