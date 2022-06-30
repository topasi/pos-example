import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { createTheme, ThemeProvider } from '@mui/material'

import App from './App'
import { AuthProvider } from './contexts/auth.context'
import { SettingsProvider } from './contexts/settings.context'
import { CategoriesProvider } from './contexts/categories.context'
import { DiscountsProvider } from './contexts/discounts.context'
import { MenuProvider } from './contexts/menu.context'
import { OrdersProvider } from './contexts/orders.context'
import { CartProvider } from './contexts/cart.context'

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
		<HelmetProvider>
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<SettingsProvider>
						<CategoriesProvider>
							<DiscountsProvider>
								<MenuProvider>
									<OrdersProvider>
										<CartProvider>
											<App />
										</CartProvider>
									</OrdersProvider>
								</MenuProvider>
							</DiscountsProvider>
						</CategoriesProvider>
					</SettingsProvider>
				</AuthProvider>
			</ThemeProvider>
		</HelmetProvider>
	</React.StrictMode>
)
