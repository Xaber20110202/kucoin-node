import getHttpClient from './http'
import getWsWrapperAsync from './wsWrapper'

const Kucoin = async (opts) => {
  const client = getHttpClient(opts) as any
  client.wsWrapper = await getWsWrapperAsync()
  return client
}

export default Kucoin