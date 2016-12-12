import { print } from 'graphql-tag/printer';

export function addGraphQLSubscriptions(networkInterface, wsClient) {
  if (!networkInterface) {
    throw new TypeError('addGraphQLSubscriptions requires a networkInterface')
  }

  if (!wsClient) {
    throw new TypeError('addGraphQLSubscriptions requires a wsClient')
  }

  return Object.assign(networkInterface, {
    subscribe(request, cb) {
      return wsClient.subscribe({
        ...request,
        query: print(request.query)
      }, cb)
    },
    unsubscribe(id) {
      wsClient.unsubscribe(id);
    },
  })
}