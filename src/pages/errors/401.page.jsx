import React from 'react'

import ErrorComponent from '../../components/error.component'

const UnauthorizedPage = () => {
	return <ErrorComponent statusCode={401}>Not enough permission</ErrorComponent>
}

export default UnauthorizedPage
