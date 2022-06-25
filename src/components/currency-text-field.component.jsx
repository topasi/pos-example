import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'

import useSettings from '../hooks/useSettings'
import NumberFormatComponent from './number-format.component'

const CurrencyTextFieldComponent = ({ selected, cart, handleInputChange, ...others }) => {
	const [value, setValue] = useState('')
	const { settings } = useSettings()
	useEffect(() => {
		if (value !== '' && selected.find((item) => item === true)) {
			setValue('')
		}
	}, [selected, value, setValue])
	useEffect(() => {
		setValue('')
	}, [cart])
	return (
		<TextField
			variant='standard'
			label=''
			value={value}
			placeholder='Enter Amount'
			onChange={(e) => {
				setValue(e.target.value)
				handleInputChange(e.target.value)
			}}
			name='numberformat'
			InputProps={{
				inputProps: {
					currency: settings.currency,
				},
				inputComponent: NumberFormatComponent,
			}}
			{...others}
		/>
	)
}

export default CurrencyTextFieldComponent
