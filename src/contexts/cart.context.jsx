import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { ref, set, get, update, remove, query, orderByChild } from 'firebase/database'

import { db } from '../firebase'
import { router } from '../router'
import useLocalStorage from '../hooks/useLocalStorage'
import useSettings from '../hooks/useSettings'
import SnackbarComponent from '../components/snackbar.component'

const CartContext = createContext({})

export const CartProvider = ({ children }) => {
	const { settings } = useSettings()
	const initialValues = useMemo(
		() => ({
			items: [],
			discounts: [],
			count: 0,
			subtotal: 0,
			vat: 0,
			vatPrice: 0,
			discountPercent: 0,
			discountPrice: 0,
			serviceCharge: 0,
			total: 0,
		}),
		[]
	)
	const [cartId] = useLocalStorage('cartId', () => {
		return uuidv4()
	})
	const [snackbar, setSnackbar] = useState({
		open: false,
		severity: 'info',
		message: '',
	})
	const [cart, setCart] = useState(initialValues)
	const [change, setChange] = useState(0)
	const [payment, setPayment] = useState(0)
	const handleSnackbar = () => {
		setSnackbar((prev) => ({ ...prev, open: false }))
	}
	const handleError = (error) => {
		console.log(error)
		setSnackbar({
			open: true,
			severity: 'error',
			message: 'Oops! something went wrong',
		})
	}
	const handleInvalidItem = () => {
		setSnackbar({
			open: true,
			severity: 'error',
			message: 'Invalid Item',
		})
	}
	const handleCheckMenuStocks = useCallback((id, qty, cb) => {
		get(ref(db, `${router.menu.path}/${id}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					const value = snapshot.val()
					if (value.stocks - qty >= 0) {
						cb(value)
					} else {
						setSnackbar({
							open: true,
							severity: 'error',
							message: 'Out of Stock',
						})
					}
				} else {
					handleInvalidItem()
				}
			})
			.catch(handleError)
	}, [])
	const handleCreateCartItem = useCallback(
		(menu, sizes = [], sideDishes = []) => {
			const newSizes = sizes.length > 0 ? sizes[0] : menu.sizes[0]
			const newCartItems = sideDishes.concat(menu)
			newCartItems.forEach((newCartItem) => {
				get(ref(db, `/cart/${cartId}/items/${newCartItem.id}`))
					.then((snapshot) => {
						if (snapshot.exists()) {
							const value = snapshot.val()
							const qty = value.qty + 1
							handleCheckMenuStocks(menu.id, qty, (data) => {
								if (value.size === newSizes) {
									update(ref(db, `/cart/${cartId}/items/${data.id}`), {
										id: data.id,
										name: data.name,
										price: data.price,
										qty: qty,
										stocks: data.stocks,
										size: value.size,
										categories: newCartItem.categories,
									}).catch(handleError)
								} else {
									update(ref(db, `/cart/${cartId}/items/${data.id}`), {
										id: data.id,
										name: data.name,
										price: data.price,
										qty: value.qty,
										stocks: data.stocks,
										size: newSizes,
										categories: newCartItem.categories,
									}).catch(handleError)
								}
							})
						} else {
							const qty = 1
							handleCheckMenuStocks(newCartItem.id, qty, (data) => {
								set(ref(db, `/cart/${cartId}/items/${newCartItem.id}`), {
									id: data.id,
									name: data.name,
									price: data.price,
									qty: qty,
									stocks: data.stocks,
									size: newSizes,
									categories: newCartItem.categories,
								}).catch(handleError)
							})
						}
					})
					.catch(handleError)
			}, [])
		},
		[handleCheckMenuStocks, cartId]
	)
	const handleIncreaseCartItemQty = useCallback(
		(id) => {
			get(ref(db, `/cart/${cartId}/items/${id}`))
				.then((snapshot) => {
					if (snapshot.exists()) {
						const value = snapshot.val()
						const qty = value.qty + 1
						handleCheckMenuStocks(value.id, qty, (data) => {
							update(ref(db, `cart/${cartId}/items/${id}`), { qty, stocks: data.stocks }).catch(handleError)
						})
					} else {
						handleInvalidItem()
					}
				})
				.catch(handleError)
		},
		[handleCheckMenuStocks, cartId]
	)
	const handleDecreaseCartItemQty = useCallback(
		(id) => {
			get(ref(db, `/cart/${cartId}/items/${id}`))
				.then((snapshot) => {
					if (snapshot.exists()) {
						const value = snapshot.val()
						const qty = Math.max(value.qty - 1, 1)
						handleCheckMenuStocks(value.id, qty, (data) => {
							update(ref(db, `cart/${cartId}/items/${id}`), { qty, stocks: data.stocks }).catch(handleError)
						})
					} else {
						handleInvalidItem()
					}
				})
				.catch(handleError)
		},
		[handleCheckMenuStocks, cartId]
	)
	const handleDeleteCartItem = useCallback(
		(id) => {
			get(ref(db, `/cart/${cartId}/items/${id}`))
				.then((snapshot) => {
					if (snapshot.exists()) {
						remove(ref(db, `cart/${cartId}/items/${id}`))
							.then(() => {
								get(ref(db, `/cart/${cartId}/items`))
									.then((snapshot) => {
										if (!snapshot.exists()) {
											setChange(0)
											setPayment(0)
										}
									})
									.catch(handleError)
							})
							.catch(handleError)
					} else {
						handleInvalidItem()
					}
				})
				.catch(handleError)
		},
		[cartId]
	)
	const handleResetCart = useCallback(
		(config) => {
			remove(ref(db, `/cart/${cartId}`))
				.then(() => {
					setCart(initialValues)
					setChange(0)
					setPayment(0)
					setSnackbar(config)
				})
				.catch(handleError)
		},
		[initialValues, cartId]
	)
	const handleCreateDiscount = useCallback(
		(id) => {
			get(ref(db, `/cart/${cartId}/discounts/${id}`))
				.then((snapshot) => {
					if (snapshot.exists()) {
						remove(ref(db, `/cart/${cartId}/discounts/${id}`)).catch(handleError)
					} else {
						get(ref(db, `/cart/${cartId}/items`))
							.then((snapshot) => {
								if (snapshot.exists()) {
									get(ref(db, `${router.discounts.path}/${id}`))
										.then((snapshot) => {
											if (snapshot.exists()) {
												const value = snapshot.val()
												set(ref(db, `/cart/${cartId}/discounts/${id}`), value).catch(handleError)
											} else {
												handleInvalidItem()
											}
										})
										.catch(handleError)
								} else {
									setSnackbar({
										open: true,
										severity: 'warning',
										message: 'Cart is empty',
									})
								}
							})
							.catch(handleError)
					}
				})
				.catch(handleError)
		},
		[cartId]
	)
	const handleCreateOrder = useCallback(
		(setDisabled) => {
			if (cart.items.length === 0) {
				setSnackbar({
					open: true,
					severity: 'warning',
					message: 'Cart is empty',
				})
			} else if (change < 0 || payment <= 0) {
				setSnackbar({
					open: true,
					severity: 'error',
					message: 'Invalid Amount',
				})
			} else {
				setDisabled(true)
				const id = uuidv4()
				const isPaid = true
				const paymentMethod = 'Cash'
				const createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
				const updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')
				set(ref(db, `${router.orders.path}/${id}`), {
					...cart,
					id,
					isPaid,
					paymentMethod,
					createdAt,
					updatedAt,
				})
					.then(() => {
						setDisabled(false)
						handleResetCart({
							open: true,
							severity: 'success',
							message: 'Successfully created an order',
						})
					})
					.catch(handleError)
			}
		},
		[cart, handleResetCart, change, payment]
	)
	useEffect(() => {
		get(query(ref(db, `/cart/${cartId}`), orderByChild('createdAt')))
			.then((snapshot) => {
				let newCartItems = []
				let newCartDiscounts = []
				if (snapshot.exists()) {
					const value = snapshot.val()
					if (value?.items) newCartItems = Object.values(value.items)
					if (value?.items && value?.discounts) newCartDiscounts = Object.values(value.discounts)
				}
				const vat = newCartItems.length > 0 ? parseInt(settings.vat) : 0
				const vatDivisor = (100 + vat) / 100
				const serviceCharge = parseFloat(settings.serviceCharge)
				const cartCount = newCartItems.reduce((accumulator, newCartItem) => accumulator + parseInt(newCartItem.qty), 0)
				const cartSubtotal = newCartItems.reduce((accumulator, newCartItem) => accumulator + parseFloat(newCartItem.price) * parseInt(newCartItem.qty), 0)
				const isVatExempted = newCartDiscounts?.find((newCartDiscount) => Boolean(newCartDiscount.isTaxExempted) === true)
				const cartVatPrice = isVatExempted ? cartSubtotal / vatDivisor - cartSubtotal : cartSubtotal - cartSubtotal / vatDivisor
				const cartDiscountPercent = newCartDiscounts.reduce((accumulator, newCartDiscount) => accumulator + parseInt(newCartDiscount.percentage), 0) || 0
				const cartDiscountPrice = (cartSubtotal / vatDivisor) * (cartDiscountPercent / 100) * -1
				const cartTotal = cartSubtotal + (cartVatPrice + cartDiscountPrice + serviceCharge)
				setCart({
					items: newCartItems,
					discounts: newCartDiscounts,
					count: cartCount,
					subtotal: cartSubtotal,
					vat,
					vatPrice: cartVatPrice,
					discountPercent: cartDiscountPercent,
					discountPrice: cartDiscountPrice,
					serviceCharge,
					total: cartTotal,
				})
			})
			.catch(handleError)
	}, [cart, cartId, cart.items, settings.vat, settings.serviceCharge])
	const value = {
		cart,
		handleCreateCartItem,
		handleIncreaseCartItemQty,
		handleDecreaseCartItemQty,
		handleDeleteCartItem,
		handleResetCart,
		handleCreateDiscount,
		handleCreateOrder,
		payment,
		setPayment,
		change,
		setChange,
	}
	return (
		<CartContext.Provider value={value}>
			<SnackbarComponent open={snackbar.open} onClose={handleSnackbar} severity={snackbar.severity}>
				{snackbar.message}
			</SnackbarComponent>
			{children}
		</CartContext.Provider>
	)
}

export default CartContext
