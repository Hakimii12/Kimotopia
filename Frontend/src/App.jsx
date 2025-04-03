import { useState } from 'react'
import { useColorMode } from './components/ui/color-mode'
import { useColorModeValue } from './components/ui/color-mode'
import {Button , HStack,Stack,Box} from "@chakra-ui/react"
import { useContext } from 'react'
import { ContextProvider } from '../ContextApi/ContextApi'

function App() {
  const theme = useContext(ContextProvider);
  console.log(theme.styles.global) 
  console.log(theme.colors) 
  console.log(theme.config)                                   
  const {toggleColorMode}=useColorMode()
  const bg = useColorModeValue('gray.100', '#101010')
  const color = useColorModeValue('gray.800', 'whiteAlpha.900')
  return (
    <Stack align='flex-start' gap='4'>
      <Box p="6" m='10' bg={bg} color={theme.colors}>
        This box&apos;s style will change based on the color mode
      </Box>
      <Button variant="outline" size="sm" onClick={toggleColorMode} >toggle</Button>
  </Stack>
  )
}

export default App
