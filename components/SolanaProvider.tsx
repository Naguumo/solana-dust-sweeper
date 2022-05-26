import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { endpoint, wallets } from 'lib/solanaConstants'

export const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  )
}
