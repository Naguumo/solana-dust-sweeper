import { ChakraProvider } from '@chakra-ui/react'
import { SolanaProvider } from 'components/SolanaProvider'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS>
      <SolanaProvider>
        <Component {...pageProps} />
      </SolanaProvider>
    </ChakraProvider>
  )
}

export default App
