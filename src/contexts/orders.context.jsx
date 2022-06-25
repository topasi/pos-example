import React, { createContext, useState, useEffect } from 'react'
import { lowerCase } from 'lodash'
import { ref, set, get, remove, query, orderByChild } from 'firebase/database'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

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
	const [keyword, setKeyword] = useState('')
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
	const handleCreateOrder = (values, setDisabled, setCartItems, setCartCount, setCartSubTotal, setvatPrice, setDiscountPercent, setTotal, setChange, setPayment, handleResetCart) => {
		values.id = uuidv4()
		values.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
		values.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')
		set(ref(db, `${router.orders.path}/${values.id}`), values)
			.then(() => {
				setDisabled(false)
				setSnackbar({
					open: true,
					severity: 'success',
					message: 'Successfully created an order',
				})
				setCartItems([])
				setCartCount(0)
				setCartSubTotal(0)
				setvatPrice(0)
				setDiscountPercent(0)
				setTotal(0)
				setChange(0)
				setPayment(0)
				handleResetCart()
			})
			.catch(handleError)
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
								message: 'Successfully deleted a order',
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
	const handleSearchOrder = (keyword) => {
		setKeyword(lowerCase(keyword))
	}
	useEffect(() => {
		get(query(ref(db, router.orders.path), orderByChild('updatedAt')))
			.then((snapshot) => {
				const data = []
				if (snapshot.exists()) {
					if (keyword) {
						snapshot.forEach((snap) => {
							const value = snap.val()
							Object.keys(value).forEach((field) => {
								const isAlreadyInData = data.find((item) => item.id === value.id)
								const isMatchKeyword = lowerCase(value[field]).match(keyword)
								if (!isAlreadyInData && isMatchKeyword) {
									data.push(value)
								}
							})
						})
					} else {
						snapshot.forEach((snap) => {
							data.push(snap.val())
						})
					}
				}
				setOrders(data)
			})
			.catch(handleError)
	}, [orders, keyword])
	return (
		<OrdersContext.Provider value={{ orders, handleCreateOrder, handleDeleteOrder, handleSearchOrder }}>
			<SnackbarComponent open={snackbar.open} onClose={handleSnackbar} severity={snackbar.severity}>
				{snackbar.message}
			</SnackbarComponent>
			{children}
		</OrdersContext.Provider>
	)
}

export default OrdersContext
