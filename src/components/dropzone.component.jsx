import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { colors, Box, Stack, Paper, OutlinedInput, IconButton, Avatar } from '@mui/material'
import { Typography } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import CloseIcon from '@mui/icons-material/Close'

const DropzoneComponent = ({ menu, files, setFiles }) => {
	const [error, setError] = useState('')
	const [image, setImage] = useState(null)
	const onDrop = useCallback(
		(acceptedFiles) => {
			const binaryFile = acceptedFiles.map((file) => {
				const preview = URL.createObjectURL(file)
				return Object.assign(file, { preview })
			})
			setFiles(binaryFile)
		},
		[setFiles]
	)
	const onDropAccepted = useCallback((acceptedFiles) => {
		console.log(acceptedFiles)
	}, [])
	const onDropRejected = useCallback((rejectedFiles) => {
		rejectedFiles.forEach((file) => {
			let message = file.errors[0].message
			switch (file.errors[0].code) {
				case 'file-too-large':
					message = 'File is too large'
					break
				case 'file-invalid-type':
					message = 'File is invalid format'
					break
				default:
					message = 'File is not accepted'
			}
			setError(message)
			return false
		})
	}, [])
	const config = useMemo(
		() => ({
			multiple: false,
			accept: {
				'image/png': ['.png'],
				'image/jpg': ['.jpg', '.jpeg'],
			},
			minSize: 0,
			maxSize: 5242880,
			maxFiles: 1,
			timeout: 0,
			noDragEventsBubbling: true,
			noClickBubbling: true,
		}),
		[]
	)
	const { getRootProps, getInputProps, acceptedFiles, isDragActive, isDragReject } = useDropzone({
		...config,
		onDrop,
		onDropAccepted,
		onDropRejected,
	})
	const removeFileHandler = (e, file) => {
		e.stopPropagation()
		URL.revokeObjectURL(file)
		acceptedFiles.splice(files.indexOf(file), 1)
		setFiles(acceptedFiles)
	}
	useEffect(() => {
		files.forEach((file) => URL.revokeObjectURL(file))
	}, [files])
	useEffect(() => {
		if (menu?.image) {
			setImage(menu.image)
		} else {
			setImage(null)
		}
	}, [menu])
	return (
		<Paper
			{...getRootProps({
				elevation: 0,
				sx: {
					cursor: 'pointer',
					padding: '1rem',
					backgroundColor: colors.grey[100],
					borderWidth: '2px',
					borderStyle: 'dashed',
					borderColor: colors.grey[300],
					borderRadius: '.5rem',
					...(isDragActive && {
						borderStyle: 'solid',
						borderColor: 'primary.main',
					}),
					...(isDragReject && {
						borderStyle: 'solid',
						borderColor: 'error.main',
					}),
				},
			})}
		>
			<OutlinedInput {...getInputProps()} />
			{image ? (
				<Stack spacing={1} direction='row' alignItems='center' flexWrap='wrap' onClick={(e) => e.stopPropagation()}>
					<Box
						sx={{
							position: 'relative',
							width: '100px',
							height: '100px',
							borderRadius: '.5rem',
						}}
					>
						<IconButton
							aria-label='delete'
							size='small'
							onClick={() => setImage('')}
							sx={{
								position: 'absolute',
								right: 0,
								top: 0,
								zIndex: 1,
								fontSize: '1.25rem',
							}}
						>
							<CloseIcon fontSize='inherit' />
						</IconButton>
						<Avatar
							alt=''
							src={image}
							sx={{
								width: 'inherit',
								height: 'inherit',
								borderRadius: '.5rem',
							}}
						/>
					</Box>
				</Stack>
			) : files.length > 0 ? (
				<Stack spacing={1} direction='row' alignItems='center' flexWrap='wrap'>
					{files.map((file) => (
						<Box
							key={file.lastModified}
							sx={{
								position: 'relative',
								width: '100px',
								height: '100px',
								borderRadius: '.5rem',
							}}
						>
							<IconButton
								aria-label='delete'
								size='small'
								onClick={(e) => removeFileHandler(e, file)}
								sx={{
									position: 'absolute',
									right: 0,
									top: 0,
									zIndex: 1,
									fontSize: '1.25rem',
								}}
							>
								<CloseIcon fontSize='inherit' />
							</IconButton>
							<Avatar
								alt={file.name}
								src={file.preview}
								sx={{
									width: 'inherit',
									height: 'inherit',
									borderRadius: '.5rem',
								}}
							/>
						</Box>
					))}
				</Stack>
			) : (
				<Stack spacing={0} alignItems='center' justifyContent='center'>
					<ImageIcon
						sx={{
							width: '100px',
							height: '100px',
							marginTop: '-5px',
							color: colors.grey[500],
						}}
					/>
					<Typography variant='body1' sx={{ color: colors.grey[700] }}>
						Drag and drop, or click to select
					</Typography>
					<Typography variant='caption' sx={{ marginTop: '2px', color: colors.grey[700] }}>
						Max filesize is 5MB
					</Typography>
					{error && (
						<Typography variant='caption' color='error' sx={{ marginTop: '2px' }}>
							{error}
						</Typography>
					)}
				</Stack>
			)}
		</Paper>
	)
}

export default DropzoneComponent
