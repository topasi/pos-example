import React from 'react'
import NumberFormat from 'react-number-format'
import { Typography } from '@mui/material'

import { config } from '../config'

const CurrencyTypographyComponent = ({ value, ...others }) => {
	return (
		<Typography variant='body2' {...others}>
			<NumberFormat value={value} displayType={'text'} thousandSeparator decimalScale={2} fixedDecimalScale prefix={config.currency} />
		</Typography>
	)
}

export default CurrencyTypographyComponent
