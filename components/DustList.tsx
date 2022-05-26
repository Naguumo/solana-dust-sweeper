import {
  Badge,
  chakra,
  Image,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { useUserTokens } from 'lib/useUserTokens'
import { CloseAccountButton } from './CloseAccountButton'

export const DustList = () => {
  const { userTokens, loading } = useUserTokens()

  return loading ? (
    <chakra.div textAlign='center'>
      <Spinner padding={30} />
    </chakra.div>
  ) : (
    <>
      {userTokens.map((token) => (
        <chakra.div
          key={token.name}
          display='flex'
          width='100%'
          alignItems='center'
          borderBottom='1px solid teal'>
          {token.tokenInfo?.logoURI ? (
            <Image
              src={token.tokenInfo?.logoURI}
              alt={token.symbol}
              maxWidth={30}
            />
          ) : (
            <chakra.div width={30} />
          )}
          <Stat padding={2}>
            <StatLabel>
              {token.name}
              {token.tokenInfo?.tags?.map((tag) => (
                <Badge margin={1} key={tag}>
                  {tag}
                </Badge>
              ))}
            </StatLabel>
            <StatNumber>
              {token.amount.toLocaleString('en', {
                maximumFractionDigits: 9,
              })}
            </StatNumber>
          </Stat>
          <CloseAccountButton token={token} />
        </chakra.div>
      ))}
    </>
  )
}
