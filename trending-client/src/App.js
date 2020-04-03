import React, {Component} from 'react';
import './index.css';
import NewPlaylist from './components/NewPlaylist.js'
import ShowPlaylist from './components/ShowPlaylist.js'
let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000/'
} else {
  baseURL = 'your heroku bakend url here'
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlists: []
    }
    this.getPlaylists = this.getPlaylists.bind(this)
    this.handleAddPlaylist = this.handleAddPlaylist.bind(this)
    this.deletePlaylist = this.deletePlaylist.bind(this)
    this.getPlaylist = this.getPlaylist.bind(this)
  }

  componentDidMount(){
    this.getPlaylists()
}

  async getPlaylists (){
    try {
      let response = await fetch(`http://localhost:3000/`)
      let data = await response.json()
      this.setState({playlists: data})
    }catch(e){
      // what happens when you get an error
      console.error(e)
    }
  }

  handleAddPlaylist(playlist) {
    const copyPlaylists = [playlist, ...this.state.playlist]
    this.setState({
      playlists: copyPlaylists
    })
  }

  async deletePlaylist (id){
  console.log(`Delete request made.`)
  try {
  let response = await fetch(`http://localhost:3000/playlists/${id}`, {
     method: 'DELETE'
     })
     let data = await response.json()
     const foundPlaylist = this.state.Playlists.findIndex(playlist => playlist._id === id)
     const copyPlaylists = [...this.state.playlists]
     copyPlaylists.splice(foundPlaylist, 1)
     this.setState({playlist: copyPlaylists})
  } catch(e){
    console.error(e)
  }
}

  getPlaylist(playlist) {
   this.setState({playlist: playlist})

  }
  render () {
    return (
      <div className="container">
      <div className="position-sticky show">
        { this.state.playlist
          ? <ShowPlaylist playlist={this.state.playlist}/>
          : null
        }
      </div>
        <div>
          <h1>Trending!</h1>
        </div>
        <NewPlaylist
          handleAddPlaylist={this.handleAddPlaylist}
        />
        <br />
        {this.state.playlists.map(playlist => {
          return (
        <div
          key={playlist._id}
          className="column">
          <div className="row">
            <div className="card col" >
              <div className="card-body">
                <h5 className="">{playlist.title}</h5>
                <h6 className="">{playlist.num_songs}</h6>
                <p className="card-text">{playlist.user}</p>
                <a onClick={()=>{ this.deletePlaylist(playlist._id)}} href="#" className="">X</a>
              </div>
            </div>
          </div>
        </div>
      )
    })}
      </div>
    )
  }

}
export default App
