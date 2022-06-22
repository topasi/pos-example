import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material'

import App from './App'

let theme = createTheme({
	palette: {
		primary: {
			main: '#25ae9c',
		}
	}
})

theme = createTheme(theme, {
	components: {
		MuiToolbar: {
			styleOverrides: {
				dense: {
					minHeight: 80,
				},
			},
		},
	},
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>
)
