// =============================
// DEPENDENCIES
// =============================
// packages
import React from 'react'

// =============================
// COMPONENT CLASS
// =============================
class PlaylistCard extends React.Component {
    state = {
       playlists: []
   }

   fetchPosts = async () => {
       let response = await fetch('http://localhost:3000/playlists')
       let data = await response.json()
       console.log(data)
       this.setState({playlists:data})
   }

   handleCreate = async (createData) => {
       let response = await fetch ('http://localhost:3000/playlists', {
           body: JSON.stringify(createData),
           method: 'POST',
           headers: {
               'Accept': 'application/json, text/plain, */*',
               'Content-Type': 'application/json'
           }
       })
       let data = await response.json()
       this.setState(prevState => {
           return{playlists: [...prevState.playlists, data]}
       })
   }

  render () {
    return (
        <div className="">
        {this.props.playlists}.map
            <h1>{this.state.playlists.title}</h1>
            <h3>{this.state.playlists.num_songs}</h3>
            <h4>{this.state.playlists.user_name}</h4>
        </div>
    )
  }
  <style>
  h1 {
      text-align: left,
      font-size: 15px,
      font-weight: bold
      display: inline-block
  }
  h3 {
      display: block,
      text-align: left,
      font-size: 12px
  }
  h4 {
      text-align: right,
      font-size: 10px,
      display: inline-block
  }
  </style>
}

// =============================
// EXPORT
// =============================
export default PlaylistCard
