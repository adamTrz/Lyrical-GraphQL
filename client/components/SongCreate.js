import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import gql from 'graphql-tag'
import query from '../queries/getSongs'

class SongCreate extends Component {
  constructor(props) {
    super(props)
    this.state = { title: '' }
  }

  handleAdd(e) {
    e.preventDefault()
    // mutation is injected as a prop!
    this.props.mutate({
      variables: { title: this.state.title },
      //re-run those queries after mutation succeeds
      refetchQueries: [{ query, /*variables: {} */ }]
    }).then(() => hashHistory.push('/'))

  }

  render() {
    return (
      <div>
        <Link to='/'>
          Back
        </Link>
        <h4>Create a New Song</h4>
        <form onSubmit={this.handleAdd.bind(this)}>
          <label htmlFor='song-title'>Song Title</label>
          <input
            id='song-title'
            value={this.state.title}
            onChange={e => this.setState({title: e.target.value})}
           />
        </form>
      </div>
    )
  }
}

//define mutation which takes QUERY VARIABLE
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id title
    }
  }
`

export default graphql(mutation)(SongCreate)
