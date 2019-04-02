import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { ChatRoute } from './routes'
import MyRoute from './pages/MyRoute';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/'
})
const client = new ApolloClient({
  cache,
  link
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/start" />
                </Route>
                <ChatRoute path="/start" component={MyRoute} />
              </Switch>
            </Router>
      </ApolloProvider>
    );
  }
}

export default App;
