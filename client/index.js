import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute} from 'react-router'
// ApolloClient - stores data that comes from graphQL
import ApolloClient from 'apollo-client'
// connects React with data from ApolloClient:
import { ApolloProvider } from 'react-apollo'
import SongList from './components/SongList'
import SongCreate from './components/SongCreate'
import SongDetail from './components/SongDetail'
import App from './components/App'
import './style/style.css'
// new Apollo Store (like redux ;) )
const client = new ApolloClient({
  // configure client.
  // every record fetched by apollo client will be distinguishable by its id. now, whenever any record changes inside apollo client, react will know that it has been updated and it will reflect that changes in DOM.
  //
  dataIdFromObject: o => o.id
  /*
  e.g. - thanks to that connection, we dont have to refetch songs details when adding new lyrics - from addLyrics mutation we recieve songType object, so when it goes back to ApolloClient it automatically lets React know that data have changed.
  !! Achtung !! addLyrics mutation and getSong query have to return same items, otherwise connection wont work... 
  */
})

const Root = () => {
  return (
    <ApolloProvider client={client} >
      <Router history={hashHistory}>
        <Route path="/" component={App} >
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
