import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import query from '../queries/getSong'
import LyricCreate from './LyricCreate'
import LyricList from './LyricList'

class SongDetail extends Component {
  render() {
    const { song } = this.props.data
    if (!song) return null
    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    )
  }
}

/*
query has an !required argument which we have to provide.
we cannot connect query with component like in SongList (graphql(query)(Component)) - it will fail because id is not defined at connection moment!
*/
export default graphql(query, {
  options: (props) => ({ variables: { id: props.params.id }})
})(SongDetail)
