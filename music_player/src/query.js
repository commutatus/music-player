import gql from 'graphql-tag'

let TrackQuery = `
  id
  song {
    id
    mediumQuality {
      url
      id
    }
  title  
  artists {
    edges {
      node {
        firstName
        lastName
        bio
        profilePicture{
          filename
          url
        }
      }
    }
  }
}`
 

export const nextTrackQuery = gql`
query nextTrackQuery($clientTime: ISO8601DateTime!, $currentStreamId: Int){
  nextTrack(currentStreamId: $currentStreamId, clientTime: $clientTime){
    ${TrackQuery}
  }
}
`

export const previousTrackQuery = gql`
query previousTrackQuery($currentStreamId: Int!){
  previousTrack(currentStreamId: $currentStreamId){
    ${TrackQuery}
  }
}
`
  