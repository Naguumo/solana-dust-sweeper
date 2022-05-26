import { TokenListProvider } from '@solana/spl-token-registry'
import useSWR from 'swr'

const getList = async () => {
  return await new TokenListProvider().resolve().then((res) => res.getList())
}

export const useTokenList = () => {
  const { data, error } = useSWR('token-list', () => getList())
  return { tokenList: data ?? [], loading: !data && !error }
}
