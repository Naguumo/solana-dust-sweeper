import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { TokenInfo } from '@solana/spl-token-registry'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey } from '@solana/web3.js'
import useSWR from 'swr'
import { useTokenList } from './useTokenList'

export type UserTokenInfoType = {
  name: string
  symbol?: string
  pubKey: PublicKey
  mint: PublicKey
  amountLamports: bigint
  amount: number
  tokenInfo?: TokenInfo
}

const fetchTokenList = async (
  publicKey: PublicKey | null,
  connection: Connection,
  publicTokenList: TokenInfo[]
): Promise<UserTokenInfoType[]> => {
  if (!publicKey) return []

  const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
    programId: TOKEN_PROGRAM_ID,
  })
  return tokenAccounts.value.map(({ account, pubkey }) => {
    const tokenData = AccountLayout.decode(account.data)
    const userFriendlyTokenInfo = publicTokenList.find(
      (listToken) => listToken.address === tokenData.mint.toString()
    )

    if (!userFriendlyTokenInfo)
      return {
        name: tokenData.mint.toString(),
        pubKey: pubkey,
        mint: tokenData.mint,
        amountLamports: tokenData.amount,
        amount: Number(tokenData.amount) / 1000000000,
      }

    return {
      name: userFriendlyTokenInfo.name,
      symbol: userFriendlyTokenInfo.symbol,
      pubKey: pubkey,
      mint: tokenData.mint,
      amountLamports: tokenData.amount,
      amount: Number(tokenData.amount) / 1000000000,
      tokenInfo: userFriendlyTokenInfo,
    }
  })
}

export const useUserTokens = () => {
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const { tokenList, loading: loadingTokenList } = useTokenList()

  const { data, error } = useSWR(
    ['user-tokens', publicKey, connection, tokenList],
    (_name, pk, conn, tl) => fetchTokenList(pk, conn, tl)
  )

  return {
    userTokens: data?.sort((a, b) => b.amount - a.amount) ?? [],
    loading: (!data && !error) || loadingTokenList,
  }
}
