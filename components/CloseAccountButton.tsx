import { Button, Link, useToast } from '@chakra-ui/react'
import {
  createBurnInstruction,
  createCloseAccountInstruction,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Transaction } from '@solana/web3.js'
import { UserTokenInfoType } from 'lib/useUserTokens'
import { useCallback, useState } from 'react'

type CloseAccountButtonProps = {
  token: UserTokenInfoType
}

export const CloseAccountButton = ({ token }: CloseAccountButtonProps) => {
  const { connection } = useConnection()
  const wallet = useWallet()

  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleCloseAccount = useCallback(async () => {
    if (!wallet.publicKey) return

    setLoading(true)
    console.log(`Closing account - ${token.mint}`)

    const transaction = new Transaction().add(
      createBurnInstruction(
        token.pubKey,
        token.mint,
        wallet.publicKey,
        token.amountLamports
      ),
      createCloseAccountInstruction(
        token.pubKey,
        wallet.publicKey,
        wallet.publicKey,
        undefined,
        TOKEN_PROGRAM_ID
      )
    )

    try {
      const signature = await wallet.sendTransaction(transaction, connection)
      toast({
        title: 'Transaction sent',
        description: signature,
      })
      const latestBlockHash = await connection.getLatestBlockhash()
      await connection.confirmTransaction(
        {
          signature: signature,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          blockhash: latestBlockHash.blockhash,
        },
        'processed'
      )
    } catch (e) {
      toast({
        title: 'Transaction Failed',
        description: (e as { code: number; message: string }).message,
        status: 'error',
      })
    }
    setLoading(false)
  }, [connection, wallet])

  return (
    <Button marginLeft='auto' isLoading={loading} onClick={handleCloseAccount}>
      Close Account
    </Button>
  )
}
