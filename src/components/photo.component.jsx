import React, { useState, useCallback, useEffect } from 'react'
import { Avatar } from '@mui/material'

import phNarrow from '../assets/ph-narrow.jpg'

const PhotoComponent = ({ src, alt, ...props }) => {
	const [imgSrc, setSrc] = useState(phNarrow || src)
	const onLoad = useCallback(() => {
		setSrc(src)
	}, [src])
	const onError = useCallback(() => {
		setSrc(phNarrow)
	}, [])
	useEffect(() => {
		const img = new Image()
		img.src = src
		img.addEventListener('load', onLoad)
		img.addEventListener('error', onError)
		return () => {
			img.removeEventListener('load', onLoad)
			img.removeEventListener('error', onError)
		}
	}, [src, onLoad, onError])
	return <Avatar alt={alt} src={imgSrc} {...props} />
}

export default PhotoComponent
