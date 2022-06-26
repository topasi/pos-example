import React from 'react'
import { TextField } from '@mui/material'

import useSettings from '../hooks/useSettings'
import NumberFormatComponent from './number-format.component'

const CurrencyTextFieldComponent = ({ value, setValue, setActiveButton, handleInputChange, ...others }) => {
	const { settings } = useSettings()
	return (
		<TextField
			variant='standard'
			label=''
			value={value}
			placeholder='Enter Amount'
			onChange={(e) => {
				setValue(e.target.value)
				setActiveButton(e.target.value)
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
