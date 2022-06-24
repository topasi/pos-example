import React, { createContext, useState, useEffect } from 'react'
import { ref, set, get, update, remove, query, orderByChild } from 'firebase/database'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import { db } from '../firebase'
import { router } from '../router'
import SnackbarComponent from '../components/snackbar.component'

const MenuContext = createContext({})

export const MenuProvider = ({ children }) => {
	const [snackbar, setSnackbar] = useState({
		open: false,
		severity: 'info',
		message: '',
	})
	const [menu, setMenu] = useState({})
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
	const handleCreateMenu = (values, resetForm, setDisabled) => {
		values.id = uuidv4()
		values.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
		values.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')
		set(ref(db, `${router.menu.path}/${values.id}`), values)
			.then(() => {
				setDisabled(false)
				setSnackbar({
					open: true,
					severity: 'success',
					message: 'Successfully created a menu',
				})
				resetForm()
			})
			.catch(handleError)
	}
	const handleUpdateMenu = (values, setDisabled) => {
		get(ref(db, `${router.menu.path}/${values.id}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					update(ref(db, `${router.menu.path}/${values.id}`), values)
						.then(() => {
							setDisabled(false)
							setSnackbar({
								open: true,
								severity: 'success',
								message: 'Successfully deleted a menu',
							})
						})
						.catch(handleError)
				} else {
					setDisabled(false)
					setSnackbar({
						open: true,
						severity: 'error',
						message: "menu doesn't exists",
					})
				}
			})
			.catch(handleError)
	}
	const handleDeleteMenu = (id, setDeleteDialog) => {
		get(ref(db, `${router.menu.path}/${id}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					remove(ref(db, `${router.menu.path}/${id}`))
						.then(() => {
							setDeleteDialog(false)
							setSnackbar({
								open: true,
								severity: 'warning',
								message: 'Successfully deleted a menu',
							})
						})
						.catch(handleError)
				} else {
					setDeleteDialog(false)
					setSnackbar({
						open: true,
						severity: 'error',
						message: "Menu doesn't exists",
					})
				}
			})
			.catch(handleError)
	}
	useEffect(() => {
		get(query(ref(db, router.menu.path), orderByChild('updatedAt')))
			.then((snapshot) => {
				const data = []
				if (snapshot.exists()) {
					snapshot.forEach((snap) => {
						data.push(snap.val())
					})
				}
				setMenu(data)
			})
			.catch(handleError)
	}, [menu])
	return (
		<MenuContext.Provider value={{ menu, handleCreateMenu, handleUpdateMenu, handleDeleteMenu }}>
			<SnackbarComponent open={snackbar.open} onClose={handleSnackbar} severity={snackbar.severity}>
				{snackbar.message}
			</SnackbarComponent>
			{children}
		</MenuContext.Provider>
	)
}

export default MenuContext
