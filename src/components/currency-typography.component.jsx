import React from 'react'
import NumberFormat from 'react-number-format'
import { Typography } from '@mui/material'

import useSettings from '../hooks/useSettings'

const CurrencyTypographyComponent = ({ value, ...others }) => {
	const { settings } = useSettings()
	return (
		<Typography variant='body2' {...others}>
			<NumberFormat value={value} displayType={'text'} thousandSeparator decimalScale={2} fixedDecimalScale allowNegative prefix={settings.currency} />
		</Typography>
	)
}

export default CurrencyTypographyComponent
