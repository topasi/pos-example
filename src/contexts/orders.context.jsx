import React, { createContext, useState, useEffect } from 'react'
import { ref, get, remove, query, orderByChild } from 'firebase/database'

import { db } from '../firebase'
import { router } from '../router'
import SnackbarComponent from '../components/snackbar.component'

const OrdersContext = createContext({})

export const OrdersProvider = ({ children }) => {
	const [snackbar, setSnackbar] = useState({
		open: false,
		severity: 'info',
		message: '',
	})
	const [orders, setOrders] = useState({})
	const handleSnackbar = () => {
		setSnackbar((prev) => ({ ...prev, open: false }))
	}
	const handleError = (e) => {
		console.log(e)
		setSnackbar({
			open: true,
			severity: 'error',
			message: 'Oops! something went wrong',
		})
	}
	const handleDeleteOrder = (id, setDeleteDialog) => {
		get(ref(db, `${router.orders.path}/${id}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					remove(ref(db, `${router.orders.path}/${id}`))
						.then(() => {
							setDeleteDialog(false)
							setSnackbar({
								open: true,
								severity: 'warning',
								message: 'Successfully deleted a orders',
							})
						})
						.catch(handleError)
				} else {
					setDeleteDialog(false)
					setSnackbar({
						open: true,
						severity: 'error',
						message: "Orders doesn't exists",
					})
				}
			})
			.catch(handleError)
	}
	useEffect(() => {
		get(query(ref(db, router.orders.path), orderByChild('updatedAt')))
			.then((snapshot) => {
				const data = []
				if (snapshot.exists()) {
					snapshot.forEach((snap) => {
						data.push(snap.val())
					})
				}
				setOrders(data)
			})
			.catch(handleError)
	}, [orders])
	return (
		<OrdersContext.Provider value={{ orders, handleDeleteOrder }}>
			<SnackbarComponent open={snackbar.open} onClose={handleSnackbar} severity={snackbar.severity}>
				{snackbar.message}
			</SnackbarComponent>
			{children}
		</OrdersContext.Provider>
	)
}

export default OrdersContext
