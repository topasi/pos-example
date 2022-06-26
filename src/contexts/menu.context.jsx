import React, { createContext, useState, useEffect } from 'react'
import { lowerCase } from 'lodash'
import { ref, set, get, update, remove, query, orderByChild } from 'firebase/database'
import { ref as sRef, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import { db, storage } from '../firebase'
import { router } from '../router'
import SnackbarComponent from '../components/snackbar.component'

const MenuContext = createContext({})

export const MenuProvider = ({ children }) => {
	const [snackbar, setSnackbar] = useState({
		open: false,
		severity: 'info',
		message: '',
	})
	const [menu, setMenu] = useState([])
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
	const handleCreateMenu = (values, resetForm, setDisabled, setFiles, handleCloseMenuModal) => {
		values.id = uuidv4()
		values.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
		values.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')
		const storeData = (data) => {
			set(ref(db, `${router.menu.path}/${data.id}`), data)
				.then(() => {
					setDisabled(false)
					handleCloseMenuModal()
					setSnackbar({
						open: true,
						severity: 'success',
						message: 'Successfully created a menu',
					})
					resetForm()
					setFiles([])
				})
				.catch(handleError)
		}
		if (values.image) {
			uploadBytes(sRef(storage, `${router.menu.path}/${values.id}`), values.image)
				.then((snapshot) => {
					console.log(snapshot)
					getDownloadURL(snapshot.ref)
						.then((url) => {
							storeData({ ...values, image: url })
						})
						.catch(handleError)
				})
				.catch(handleError)
		} else {
			storeData({ ...values, image: '' })
		}
	}
	const handleUpdateMenu = (id, values, resetForm, setDisabled, setFiles, handleCloseMenuModal) => {
		get(ref(db, `${router.menu.path}/${id}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					const value = snapshot.val()
					const image = value?.image ? value.image : ''
					const updateData = (data) => {
						update(ref(db, `${router.menu.path}/${id}`), data)
							.then(() => {
								setDisabled(false)
								handleCloseMenuModal()
								setSnackbar({
									open: true,
									severity: 'success',
									message: 'Successfully deleted a menu',
								})
								resetForm()
								setFiles([])
							})
							.catch(handleError)
					}
					const uploadImage = () => {
						uploadBytes(sRef(storage, `${router.menu.path}/${id}`), values.image)
							.then((snapshot) => {
								getDownloadURL(snapshot.ref)
									.then((url) => {
										updateData({ ...values, image: url })
									})
									.catch(handleError)
							})
							.catch(handleError)
					}
					if (values.image) {
						getDownloadURL(sRef(storage, `${router.menu.path}/${id}`))
							.then(() => {
								deleteObject(sRef(storage, `${router.menu.path}/${id}`))
									.then(() => {
										uploadImage()
									})
									.catch(handleError)
							})
							.catch(() => {
								uploadImage()
							})
					} else {
						updateData({ ...values, image })
					}
				} else {
					setDisabled(false)
					setSnackbar({
						open: true,
						severity: 'error',
						message: "Menu doesn't exists",
					})
				}
			})
			.catch(handleError)
	}
	const handleDeleteMenu = (id, setDeleteDialog) => {
		get(ref(db, `${router.menu.path}/${id}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					const deleteData = () => {
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
					}
					getDownloadURL(sRef(storage, `${router.menu.path}/${id}`))
						.then(() => {
							deleteObject(sRef(storage, `${router.menu.path}/${id}`))
								.then(() => {
									deleteData()
								})
								.catch(handleError)
						})
						.catch(() => {
							deleteData()
						})
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
	const handleSearchMenu = (keyword) => {
		setKeyword(lowerCase(keyword))
	}
	useEffect(() => {
		get(query(ref(db, router.menu.path), orderByChild('updatedAt')))
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
				setMenu(data)
			})
			.catch(handleError)
	}, [menu, keyword])
	return (
		<MenuContext.Provider value={{ menu, handleCreateMenu, handleUpdateMenu, handleDeleteMenu, handleSearchMenu }}>
			<SnackbarComponent open={snackbar.open} onClose={handleSnackbar} severity={snackbar.severity}>
				{snackbar.message}
			</SnackbarComponent>
			{children}
		</MenuContext.Provider>
	)
}

export default MenuContext
