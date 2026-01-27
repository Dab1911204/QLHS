import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './style/index.css'
import App from './App.jsx'
import { store, persistor } from './redux/store'

import { DataProvider } from './contexts/DataContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DataProvider>
          <App />
        </DataProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
