import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'

export const network = WalletAdapterNetwork.Devnet
export const endpoint = clusterApiUrl(network)
export const wallets = [
  new PhantomWalletAdapter(),
  new GlowWalletAdapter(),
  new SlopeWalletAdapter(),
  new SolflareWalletAdapter({ network }),
  new TorusWalletAdapter(),
]
