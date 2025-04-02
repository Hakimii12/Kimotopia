import { Provider } from "@/components/ui/provider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { mode } from '@chakra-ui/theme-tools'
import {extendTheme} from "@chakra-ui/theme-utils";
import { useColorMode } from "./components/ui/color-mode";
import './index.css'
import App from './App.jsx'

const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#101010')(props),
    },
  }),
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const colors = {
  gray: {
    light: '#616161',
    dark: '#1e1e1e',
  },
}

const theme =extendTheme({ styles, config, colors })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider theme={theme}>
      <App />
    </Provider>
  </StrictMode>,
)
