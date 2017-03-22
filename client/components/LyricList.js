import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import mutation from '../queries/likeLyric'

class LyricList extends Component {
  onLike(id) {
    this.props.mutate({ variables: { id } })
  }

  render() {
    return (
      <ul className='collection'>
        {this.props.lyrics.map(({id, content, likes}) => (
          <li key={id} className='collection-item'>
            {content}
            <div className='vote-box'>
              <i onClick={() => this.onLike(id)}
                className='material-icons'>
                thumb_up
              </i>
              {likes}
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default graphql(mutation)(LyricList)
