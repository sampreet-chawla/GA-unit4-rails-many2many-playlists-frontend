import React, {useState, useEffect} from "react";
import './App.css';

function App() {

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const makeApiCall = async () => {
      try {
        const res = await fetch('https://playlists-rails-m2m-api.herokuapp.com/playlists');
        const data = await res.json();
        console.log("Playlist data: ", data);
        setPlaylists(data);
      } catch(err) {
        console.log("Error fetching playlists: ", err.message);
      }

    }
    makeApiCall();
  }, []);

  const loadPlaylist = () => {
    console.log("Inside loadPlaylist: ", playlists);
    if(playlists && playlists.length > 0) {
      return playlists.map((playlist, index) => {
        return (<div className="playlist" key={index}>
          <h3>Title: {playlist.id}) {playlist.title} </h3>
          <h5>Songs: {( playlist.songs && playlist.songs.length > 0) 
            ? playlist.songs.map(song => song.id +". " + song.title + ", ")
            : "NA" }
          </h5>          
        </div>);
      });
    } else {
      return (<h3>No playlist available.</h3>);
    }
  };

  return (
    <div className="App">
      <h1>Playlists</h1>
      <h5>Rails Many-to-Many Relationships Demo</h5>
      {loadPlaylist() }
    </div>
  );
}

export default App;
