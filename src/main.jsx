import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@mantine/core/styles.css";
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SnackbarProvider } from 'notistack'
import { MantineProvider } from '@mantine/core'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="light">

      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={3000}
      >
        <AuthProvider>
          <App />
        </AuthProvider>
      </SnackbarProvider>
    </MantineProvider>


  </StrictMode>,
)
