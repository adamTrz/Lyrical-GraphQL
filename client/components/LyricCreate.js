import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import mutation from '../queries/addLyrics'

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: ''}
  }

  addLyrics(e) {
    e.preventDefault()
    this.props.mutate({
      variables: {
        content: this.state.content ,
        songId: this.props.songId,
      }
    })
    this.setState({content: ''})
  }

  render() {
    return (
      <form onSubmit={this.addLyrics.bind(this)}>
        <label htmlFor='lyric'>Add a lyric</label>
        <input
          id='lyric'
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
        />
      </form>
    )
  }
}

export default graphql(mutation)(LyricCreate)
