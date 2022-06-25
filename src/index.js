import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material'

import App from './App'
import { SettingsProvider } from './contexts/settings.context'
import { CategoriesProvider } from './contexts/categories.context'
import { DiscountsProvider } from './contexts/discounts.context'
import { MenuProvider } from './contexts/menu.context'
import { OrdersProvider } from './contexts/orders.context'

let theme = createTheme({
	palette: {
		primary: {
			main: '#25ae9c',
		},
	},
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
			<SettingsProvider>
				<CategoriesProvider>
					<DiscountsProvider>
						<MenuProvider>
							<OrdersProvider>
								<App />
							</OrdersProvider>
						</MenuProvider>
					</DiscountsProvider>
				</CategoriesProvider>
			</SettingsProvider>
		</ThemeProvider>
	</React.StrictMode>
)
