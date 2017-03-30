import React from 'react'
import ReactDOM from 'react-dom'
import CampaignList from './components/CampaignList'
import CampaignDetail from './components/CampaignDetail'
import CampaignCreate from './components/CampaignCreate'
import { Router, Route, browserHistory } from 'react-router'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import 'tachyons'
import './index.css'

const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/ride-for-a-cause')
const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/ride-for-a-cause',
})

// The x-graphcool-source header is to let the server know that the example app has started.
// (Not necessary for normal projects)
networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      // Create the header object if needed.
      req.options.headers = {}
    }
    req.options.headers['x-graphcool-source'] = 'example:react-apollo-instagram-subscriptions'
    next()
  },
}])

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
        <Route path='/' component={CampaignList} />
        <Route path='/causes/:campaignSlug' component={CampaignDetail} />
        <Route path='/create' component={CampaignCreate} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
