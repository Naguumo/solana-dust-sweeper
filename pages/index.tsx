import { chakra, Text } from '@chakra-ui/react'
import { useWallet } from '@solana/wallet-adapter-react'
import { DustList } from 'components/DustList'
import { WalletConnector } from 'components/WalletConnector'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { connected } = useWallet()
  return (
    <>
      <chakra.div padding={5} position='sticky' top={0} display='flex'>
        <WalletConnector />
      </chakra.div>
      <chakra.div sx={{ padding: 5 }}>
        {connected ? (
          <DustList />
        ) : (
          <Text textAlign='center'>Please connect your wallet</Text>
        )}
      </chakra.div>
    </>
  )
}

export default Home
