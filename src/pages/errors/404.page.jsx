import React from 'react'

import ErrorComponent from '../../components/error.component'

const NotFoundPage = () => {
	return <ErrorComponent statusCode={404}>Page cannot be found</ErrorComponent>
}

export default NotFoundPage
