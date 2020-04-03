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
       let response = await fetch ('http://localhost:3000/posts', {
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
            <h1>{this.state.playlists.title}</h1>
            <h3>{this.state.playlists.num_songs}</h3>
            <h3>{this.state.playlists.duration}</h3>
            <h4>{this.state.playlists.user_name}</h4>
        </div>
    )
  }
}

// =============================
// EXPORT
// =============================
export default PlaylistCard
