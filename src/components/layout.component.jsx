import React, { useState, useEffect, useCallback } from 'react'
import { useTheme, useMediaQuery, styled, colors, Box, CssBaseline, Toolbar } from '@mui/material'

import NavbarComponent from '../components/navbar.component'
import SidebarComponent from '../components/sidebar.component'

const drawerWidth = 128

const Main = styled(Box)(({ open, drawerWidth, theme }) => ({
	flexGrow: 1,
  minHeight: '100vh',
	padding: '1rem',
  backgroundColor: colors.grey[100],
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: 0,
	...(!open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
	}),
}))

const LayoutComponent = ({ children }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('lg'))
  const [openDrawer, setOpenDrawer] = useState(true)
	const handleClickDrawer = useCallback(() => {
		setOpenDrawer((prev) => !prev)
	}, [])
  useEffect(() => {
    if (matches) {
      setOpenDrawer(false)
    } else {
      setOpenDrawer(true)
    }
  }, [matches])
  return (
    <Box display='flex'>
      <CssBaseline />
      <NavbarComponent drawerWidth={drawerWidth} openDrawer={openDrawer} handleClickDrawer={handleClickDrawer} />
      <SidebarComponent drawerWidth={drawerWidth} openDrawer={openDrawer} />
      <Main drawerWidth={drawerWidth} open={openDrawer}>
        <Toolbar variant='dense' />
        <Box sx={{ 
          padding: '1rem',
          height: 'calc(100% - 80px)',
          display: 'flex',
        }}>
          {children}
        </Box>
      </Main>
    </Box>
  )
}

export default LayoutComponent
