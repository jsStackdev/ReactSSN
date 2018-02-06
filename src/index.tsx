// Import external components refrence
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import 'reflect-metadata'
import 'typeface-roboto'
import registerServiceWorker from './registerServiceWorker'
import config from 'src/config'

import { Provider } from 'react-redux'
import store, { history } from 'store/configureStore'
import { ConnectedRouter } from 'react-router-redux'

// - Actions
import * as localeActions from 'actions/localeActions'

// - Import app components
import Master from 'components/master'
// import { App } from 'components/AWS'

// Set default data
// tslint:disable-next-line:no-empty
store.subscribe(() => { })

// - Initialize languages
store.dispatch(localeActions.initTranslation())

// Needed for onClick
// http://stackoverflow.com/a/34015469/988941
try { injectTapEventPlugin() } catch (e) {}

const theme = createMuiTheme({
  palette: {
	  primary: { main: config.theme.primaryColor },
	  secondary: { main: config.theme.secondaryColor }
  }
})

// App css
import './styles/app.css'

/**
 * Execute startup functions
 */
import './socialEngine'

const supportsHistory = 'pushState' in window.history
ReactDOM.render(
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<MuiThemeProvider theme={theme}>
						<Master />
					</MuiThemeProvider>
				</ConnectedRouter>
			</Provider>,
	document.getElementById('app') as HTMLElement
  )
registerServiceWorker()
