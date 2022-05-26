import { chakra } from '@chakra-ui/react'
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'

const ChakraWalletMultiButton = chakra(WalletMultiButton)

export const WalletConnector = () => {
  return (
    <WalletModalProvider>
      <chakra.div marginLeft='auto'>
        <ChakraWalletMultiButton
          backgroundColor='teal'
          sx={{ '&:not([disabled]):hover': { backgroundColor: 'teal.300' } }}
        />
      </chakra.div>
    </WalletModalProvider>
  )
}
