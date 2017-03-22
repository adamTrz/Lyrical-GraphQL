import gql from 'graphql-tag'

export default gql`
  mutation addLyric($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id lyrics {
        id content likes
      }
    }
  }
`
/*
  since when creating ApolloClient instance we have use 'Normalization with dataIdFromObject', when we run above mutation, we dont have refetch songs details. ApolloClient will automatically lets know react that data updated.
  But beware - records that we return from above mutation must be same as records returned from 'getSong' query!! 
*/
