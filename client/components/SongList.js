import React, { Component, PropTypes, } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import query from '../queries/getSongs'
import gql from 'graphql-tag'

const propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    songs: PropTypes.array,
  }).isRequired,
};

class SongList extends Component {

  onSongDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch())
  }

  renderSongs(songs) {
    return songs.map(({ id, title }) => (
      <li key={id} className='collection-item'>
        <Link to={`/songs/${id}`}>{title}</Link>
        <i
          className='material-icons'
          onClick={() => this.onSongDelete(id)}
          >
          delete
        </i>
      </li>
    )
  )}

  render() {
    const { loading, songs } = this.props.data
    if (loading) {
      return <div>Loading</div>
    }
    return (
      <div>
        <ul className='collection'>
          {this.renderSongs(songs)}
        </ul>
        <Link
          to='/songs/new'
          className='btn-floating btn-larg red right'
          >
          <i className='material-icons'>add</i>
        </Link>
      </div>
    );
  }

}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`

export default graphql(mutation)(
  graphql(query)(SongList)
)

SongList.propTypes = propTypes;
